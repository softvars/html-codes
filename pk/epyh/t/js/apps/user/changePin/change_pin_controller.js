define(["app",
    "apps/user/changePin/change_pin_view",
    "common/confirm/profile_view",
], function(Appersonam, View, Confirm) {
    Appersonam.module("UserApp.ChangePin", function(ChangePin, Appersonam, Backbone, Marionette, $, _) {
        ChangePin.Controller = {
            profile: function() {
                var self = this;
                require(["entities/login"], function() {
                    var changePinEntity = Appersonam.request("user:changepin");
                    self.profileView = new View.Form({
                        model: changePinEntity
                    });
                    self.profileView.on('cancel', function(data) {
                        Appersonam.UserApp.trigger('close:overlay', '-change-pin');
                        self.profileView = undefined;
                    });
                    self.profileView.on('form:submit', function(data) {
                        var isValid = changePinEntity.save(data, {
                            serviceDestination: 'NEW',
                            noData: true,
                            withoutMethods: true,
                            success: function(result) {
                                var ErrorMessage = result.get('ErrorMessage');
                                if (ErrorMessage) {
                                    self.showResult(false, "I dati inseriti non sono corretti");
                                } else {
                                    Appersonam.request('tracking:log:event', 'pin_changed');
                                    self.showResult(true);
                                }
                            },
                            error: function() {
                                self.showResult(true);
                            },
                        });
                        if (isValid !== true) {
                            Appersonam.trigger('close:loading');
                            this.triggerMethod("form:data:invalid", changePinEntity.validationError);
                        }
                    });
                    Appersonam.UserApp.trigger('show:overlay', self.profileView, '-change-pin');
                });
            },
            showResult: function(success, message) {
                var self = this;
                if (success === true) {
                    var confirmModel = new Backbone.Model({
                        header: 'Operazione riuscita',
                        title: 'La tua password è stata reimpostata',
                        button: 'OK',
                        className: 'receipt-dialog',
                        closeButton: 'none'
                    });
                } else {
                    var confirmModel = new Backbone.Model({
                        title: 'Si è verificato un errore',
                        description: message,
                        className: 'confirmation-dialog-danger',
                    });
                }
                confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    self.profileView.removeBlur();
                    Appersonam.UserApp.trigger('close:overlay', 'pin-changed');
                });
                confirmPanel.on("confirm", function() {
                    Appersonam.UserApp.trigger('close:overlay', '-change-pin');
                    Appersonam.UserApp.trigger('close:overlay', 'pin-changed');
                    self.profileView = undefined;
                });
                self.profileView.addBlur();
                Appersonam.UserApp.trigger('show:overlay', confirmPanel, 'pin-changed');
            },

        }
    });
    return Appersonam.UserApp.ChangePin.Controller;
});
