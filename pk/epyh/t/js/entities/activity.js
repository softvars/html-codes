define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Activity = Backbone.Model.extend({
            defaults: {
                name: '',
                link: '',
                activityTrigger: ''
            }
        });

        Entities.ActivityCollection = Backbone.Collection.extend({
            model: Entities.Activity,
            comparator: "name"
        });

        var API = {
            getActivityEntities: function (innerTrigger) {
                if (innerTrigger === 'movements:list') {
                    var entities = new Entities.ActivityCollection([
                      { name: "Movimenti", link: "#activities/movements", activityTrigger: "movements:list", className: 'active' },
                      { name: "Obiettivi", link: "#activities/goals", activityTrigger: "goals:list", className: ' firstTime  inactive' },
                      //{ name: "Ricerca", link: "#activities/search", activityTrigger: "activities:search" }
                    ]);
                }
                else {
                    var entities = new Entities.ActivityCollection([
                      { name: "Movimenti", link: "#activities/movements", activityTrigger: "movements:list", className: ' firstTime  inactive' },
                      { name: "Obiettivi", link: "#activities/goals", activityTrigger: "goals:list", className: ' active' },
                      //{ name: "Ricerca", link: "#activities/search", activityTrigger: "activities:search" }
                    ]);
                }
                return entities;
            },

        };

        Appersonam.reqres.setHandler("activity:entities", function (innerTrigger) {
            return API.getActivityEntities(innerTrigger);
        });

    });
    return;

});
