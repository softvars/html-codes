define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Activity = Backbone.Model.extend({
            defaults: {
                name: '',
                link: '',
                trigger: ''
            }
        });

        Entities.ActivityCollection = Backbone.Collection.extend({
            model: Entities.Activity,
            comparator: "name"
        });

        var API = {
            getActivityEntities: function () {
                var entities = new Entities.ActivityCollection([
                  { name: "Dati Utente", link: "#user/profile", trigger: "user:profile" },
                  { name: "Statistiche", link: "#user/stats", trigger: "user:stats" },
                  { name: "Coordinate", link: "#user/coordinates", trigger: "user:coordinates" },
                  { name: "Imposta Notifichaaaae", link: "#user/notifications", trigger: "user:notifications" }
                ]);
                return entities;
            },

        };

        Appersonam.reqres.setHandler("user:actions", function () {
            return API.getActivityEntities();
        });

    });
    return;

});
