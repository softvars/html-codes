define(["app",
    "common/coordinates/coordinates_view"], function (Appersonam, View) {
        Appersonam.module(Appersonam.currentApp.moduleName + ".Coordinate", function (Coordinates, Appersonam, Backbone, Marionette, $, _) {
            Coordinates.Controller = {
                coordinates: function (userEntity, recharge) {
                    require(["entities/user"], function () {
                        var fetchingUserCoordinates = Appersonam.request("user:coordinates");
                        $.when(fetchingUserCoordinates).done(function (userCoordinates) {
                            //userCoordinates serve per nome e cognome
                            userCoordinates.set({ recharge: recharge });
                            var view;
                            view = new View.Form({
                                model: userCoordinates
                            });
                            view.on("back", function () {
                                Appersonam.currentApp.trigger("nav:back", 'user', 1);
                            });
                            view.on("send:mail", function (bankAccountEntity) {
                                var mailModel = new Backbone.Model({
                                    title: "Invia dati via email",
                                    description: "Inserisci la mail del destinatario",
                                    button: 'Conferma invio'
                                });
                                sendMailEntity = Appersonam.request("coordinates:mail:entity", bankAccountEntity, '', userEntity.firstName + ' ' + userEntity.lastName);
                                sendMailEntity.save(null, {
                                    success: function (data) {

                                    },
                                    error: function (data) {

                                    }
                                });
                            });
                            Appersonam.currentApp.trigger('show:main', view, 2);
                        });
                    });
                }
            };
        });
        return Appersonam.currentApp.Coordinate.Controller;
    });
