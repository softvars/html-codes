define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Navigation = Backbone.Model.extend({
            defaults: {
                name: '',
                link: '',
                navigationTrigger: ''
            }
        });

        Entities.NavigationCollection = Backbone.Collection.extend({
            model: Entities.Navigation,
            comparator: "name"
        });

        var API = {
            getNavigationEntities: function () {
                var entities = new Entities.NavigationCollection([
                  { name: "Movimenti", link: "#activities/movements", navigationTrigger: "activities", innerTrigger: "movements:list" },
                  { name: "Obiettivi", link: "#activities/goals", navigationTrigger: "activities", innerTrigger: "goals:list" },
                  { name: "Ricarica", link: "#payments/recharge", navigationTrigger: "payments", innerTrigger: "payments:mobile" },
                  { name: "Bollette", link: "#payments/bills", navigationTrigger: "payments", innerTrigger: "payments:bill" },
                  { name: "Menu Utente", link: "#user", navigationTrigger: "user:home" },
                  { name: "Invia Denaro", link: "#p2p/payment", navigationTrigger: "p2p:payment" },
                  { name: "Richiedi Denaro", link: "#p2p/request", navigationTrigger: "p2p:request" }
                ]);
                return entities;
            },
        };

        Appersonam.reqres.setHandler("navigation:entities", function () {
            return API.getNavigationEntities();
        });
    });
    return;
});
