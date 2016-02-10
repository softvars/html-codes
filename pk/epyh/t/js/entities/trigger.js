define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {

        Entities.Triggers = Backbone.Model.extend({
            url: 'rest/business/trigger/',
        });

        Entities.TriggerMapEntity = Backbone.Model.extend({
            url: 'rest/business/usersettings/triggersschema',
        });

        Entities.Choice = Backbone.Model.extend({
            url: '',
        });

        Entities.Choices = Backbone.Collection.extend({
            model: Entities.Choice
        });

        var API = {
            getTriggerTree: function () {
                var entity = new Entities.TriggerMapEntity();
                var defer = $.Deferred();
                entity.fetch({
                    serviceDestination: 'NEW',
                    success: function (resultData) {
                        defer.resolve(resultData);
                    },
                    error: function (resultData) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                return defer.promise();
            }
        };

        Appersonam.reqres.setHandler("trigger:map:entity", function () {
            return API.getTriggerTree();
        });

        Appersonam.reqres.setHandler("trigger:entity", function (data) {
            return new Entities.Triggers(data);
        });

        Appersonam.reqres.setHandler("choice:entities", function (collection) {
            return new Entities.Choices(collection);
        });
    });
    return;
});