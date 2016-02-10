define(["app",
    "apps/card/activate/profile_view",
    "common/confirm/profile_view"], function (Appersonam, View, Confirm) {
        Appersonam.module("CardApp.Activate", function (Activate, Appersonam, Backbone, Marionette, $, _) {
            Activate.Controller = {
                profile: function (model) {
                    var self = this;
                    require(["entities/card"], function () {
                        var activateCardEntity = Appersonam.request("card:activate");
                        self.profileView = new View.ProfileView({
                            model: activateCardEntity
                        });
                        self.profileView.on('back', function () {
                            Appersonam.CardApp.trigger("nav:back", '', 1);
                        });
                        self.profileView.on('form:submit', function (data) {
                            var cvv = data.cvv;
                            activateCardEntity.fetch({
                                withoutMethods: true,
                                noData: true,
                                data: { cvv: cvv },
                                serviceDestination: 'NEW',
                                success: function (result) {
                                    var message = result.get('status');
                                    if (message && message.toLowerCase() === 'ok') {
                                        Appersonam.request('tracking:log:event', 'card_actvation_completed');
                                        model.set({ cardStatus: '4', pan: result.get('pan'), expirationDate: result.get('expirationDate'), cvv: '' + result.get('cvv') }, { silent: false });
                                        self.showResult(true, '', 'active');
                                    }
                                    else {
                                        self.showResult(false, "CVV non corretto", '');
                                    }
                                },
                                error: function (data) {
                                }
                            });
                        });
                        self.profileView.on('corner:menu', function () {
                            Appersonam.NavigationApp.trigger('corner:menu');
                        });
                        Appersonam.CardApp.trigger('show:main', self.profileView, 2);
                    });
                },
                showResult: function (success, message, status) {
                    var self = this;
                    if (success === true) {
                        self.profileView.model.set(status, true);
                        var confirmModel = new Backbone.Model({
                            header:'Operazione Completata',
                            title: 'La tua carta è stata attivata',
                            description: "",
                            button: 'OK',
                            className: 'information-dialog',
                            closeButton: 'none'
                        });
                    }
                    else {
                        var confirmModel = new Backbone.Model({
                            title: 'Si è verificato un errore',
                            description: message,
                            className: 'confirmation-dialog-danger',
                        });
                    }
                    confirmPanel = new Confirm.Profile({
                        model: confirmModel
                    });
                    confirmPanel.on("cancel", function () {
                        self.profileView.removeBlur();
                        Appersonam.CardApp.trigger('close:overlay');
                    });
                    confirmPanel.on("confirm", function () {
                        self.profileView.removeBlur();
                        Appersonam.CardApp.trigger('close:overlay');
                        Appersonam.CardApp.trigger("nav:back", '', 1);
                    });
                    self.profileView.addBlur();
                    Appersonam.CardApp.trigger('show:overlay', confirmPanel);
                }
            };
        });
        return Appersonam.CardApp.Activate.Controller;
    });
