define(["app",
    "apps/card/show/show_view",
    "common/confirm/profile_view"
], function(Appersonam, View, Confirm) {
    Appersonam.module("CardApp.Show", function(Show, Appersonam, Backbone, Marionette, $, _) {
        Show.Controller = {
            show: function() {
                var self = this;
                require(["entities/card"], function() {
                    var fetchingEntity = Appersonam.request("card:entity");
                    $.when(fetchingEntity).done(function(entity) {
                        if (!entity.get('level')) {
                            entity.set('level', 0);
                        }
                        self.showView = new View.CardView({
                            model: entity
                        });
                        self.showView.on('card:activate:card', function(model) {
                            Appersonam.CardApp.trigger('card:activate', model);
                        });
                        self.showView.on('card:operativity', function(model, oldData) {

                            var newData = model.toJSON();
                            delete newData.percentage;
                            delete newData.anyFunctionalities;

                            /**
                             * rimuovo il parametro isPlus perchè il servizio
                             * non è pronto a riceverlo e se passato da errore
                             *
                             * lo rimuovo dall' oggetto derivato dal model per
                             * non alterare il rendering delle interazioni della vista
                             */
                            delete newData.isPlus;


                            var operativityEntity = Appersonam.request("card:operativity:entity", newData);

                            /*{"status":"OK","message":null,"pan":"5170530100022010","cvv":"195","expirationDate":1569794400000,"requestDate":1405548000000,"level":"250.02","levelYear":"2500","renewDate":1437084000000,"customer":"HYPE","graphic":"MASTERCARD EMONEY","operativitaATM":true,"operativitaPOS":true,"operativitaECOMMERCE":true,"physical":false,"active":false,"cardStatus":"5"}*/
                            var errorCallBack = function(errorResult) {
                                /**
                                 * Callback definito esternamente per poter essere richiamato
                                 * sia dall' errorCallback canonico che dal successCallback nel caso ci sia un messaggio di errore interno
                                 */
                                //self.showView.triggerMethod('update:switches', {
                                //    operativitaECOMMERCE: oldData.operativitaECOMMERCE,
                                //    operativitaPOS: oldData.operativitaPOS,
                                //    operativitaATM: oldData.operativitaATM
                                //});

                                model.set('operativitaECOMMERCE', oldData.operativitaECOMMERCE);
                                model.set('operativitaPOS', oldData.operativitaPOS);
                                model.set('operativitaATM', oldData.operativitaATM);

                                self.showResult(false, 'Riprovare pi&ugrave; tardi o contattare l&#39 assistenza', 'Si &egrave verificato un errore');

                            };

                            var successCallback = function(result) {
                                if (!!result.get('ErrorMessage')) {
                                    errorCallBack(result);
                                } else {

                                    //log di avvenuta transazione
                                    Appersonam.request('tracking:log:event', 'car_switch', {
                                        'ecommerceActive': result.get('operativitaECOMMERCE'),
                                        'posActive': result.get('operativitaPOS'),
                                        'atmActive': result.get('operativitaATM')
                                    });

                                    self.showView.triggerMethod('update:switches', {
                                        operativitaECOMMERCE: result.get('operativitaECOMMERCE'),
                                        operativitaPOS: result.get('operativitaPOS'),
                                        operativitaATM: result.get('operativitaATM')
                                    });
                                }
                            };

                            operativityEntity.save(null, {
                                withoutMethods: true,
                                showLoading: false,
                                success: successCallback,
                                error: errorCallBack
                            });
                        });
                        self.showView.on('card:request', function(model) {

                            var confirmModel = new Backbone.Model({
                                title: 'Vuoi richiedere la carta fisica?',
                                description: 'La carta verr&agrave; spedita presso l&#39; indirizzo da te indicato in fase di registrazione',
                                className: 'confirmation-dialog-safe',
                                header: 'RICHIESTA CARTA FISICA ',
                                button: 'CONFERMA',
                                deny: 'ANNULLA'
                            });
                            confirmPanel = new Confirm.Profile({
                                model: confirmModel
                            });
                            confirmPanel.on("cancel", function() {
                                self.showView.removeBlur();
                                Appersonam.CardApp.trigger('close:overlay', '_cardmessage');
                            });
                            confirmPanel.on("confirm", function() {
                                self.showView.removeBlur();

                                var requestCard = Appersonam.request("card:request");
                                requestCard.save(null, {
                                    withoutMethods: true,
                                    noData: true,
                                    success: function(result) {
                                        var message = result.get('status');
                                        if (message && message.toLowerCase() === 'ok') {
                                            Appersonam.request('tracking:log:event', 'card_request_completed');
                                            model.set({
                                                cardStatus: '0',
                                                expirationDate: result.get('expirationDate'),
                                                cvv: result.get('cvv'),
                                                pan: result.get('pan')
                                            }, {
                                                silent: false
                                            });
                                            self.showResult(true, '', 'physical');
                                        } else {
                                            self.showResult(false, 'La richiesta della carta non è andata a buon fine.', '');
                                        }
                                    },
                                    error: function(result) {
                                        //self.showResult(true, 'La richiesta della carta non è andata a buon fine.', '');
                                    }
                                });

                            });
                            self.showView.addBlur();
                            Appersonam.CardApp.trigger('show:overlay', confirmPanel, '_cardmessage');


                        });
                        self.showView.on('corner:menu', function() {
                            Appersonam.NavigationApp.trigger('corner:menu');
                        });
                        Appersonam.CardApp.trigger('show:main', self.showView, 1);
                    });
                });
            },
            showRequestResult: function(success, message, status) {
                var self = this;
                var confirmModel;
                if (success === true) {
                    self.showView.model.set(status, true);
                    confirmModel = new Backbone.Model({
                        title: 'Richiesta inoltrata',
                        description: "Riceverai la tua carta al più presto",
                        button: 'OK',
                        className: 'information-dialog',
                        closeButton: 'none'
                    });
                } else {
                    confirmModel = new Backbone.Model({
                        title: 'Si è verificato un errore',
                        description: message,
                        className: 'confirmation-dialog-danger'
                    });
                }
                confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    self.showView.removeBlur();
                    Appersonam.CardApp.trigger('close:overlay', '_cardmessage');
                });
                confirmPanel.on("confirm", function() {
                    self.showView.removeBlur();
                    Appersonam.CardApp.trigger('close:overlay', '_cardmessage');
                });
                self.showView.addBlur();
                Appersonam.CardApp.trigger('show:overlay', confirmPanel, '_cardmessage');
            },
            showResult: function(success, description, title, header) {
                var self = this;
                var confirmModel;
                if (success === true) {
                    confirmModel = new Backbone.Model({
                        title: title,
                        description: description,
                        button: 'OK',
                        header: header,
                        className: 'information-dialog',
                        closeButton: 'none'
                    });
                } else {
                    confirmModel = new Backbone.Model({
                        title: title,
                        description: description,
                        className: 'confirmation-dialog-danger'
                    });
                }
                confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    self.showView.removeBlur();
                    Appersonam.CardApp.trigger('close:overlay', '_cardmessage');
                });
                confirmPanel.on("confirm", function() {
                    self.showView.removeBlur();
                    Appersonam.CardApp.trigger('close:overlay', '_cardmessage');
                });
                self.showView.addBlur();
                Appersonam.CardApp.trigger('show:overlay', confirmPanel, '_cardmessage');
            }
        };
    });
    return Appersonam.CardApp.Show.Controller;
});
