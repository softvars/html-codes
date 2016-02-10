define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Category = Backbone.Model.extend({
            stem: '',
            suffix: 'rest/category',
            urlRoot: function () {
                return stem + '/' + suffix;
            },
            defaults: {

            }
        });

        Entities.CategoryCollection = Backbone.Collection.extend({
            url: "rest/categories",
            model: Entities.Category,
            comparator: "name"
        });

        var API = {
            getCategoryEntities: function () {
                var defer = $.Deferred();
                var entities = Appersonam.request("global:get:categories");
                if (!entities || entities.length < 2) {//vuoto oppure ho salvato un errore
                    entities = new Entities.CategoryCollection();
                    entities.fetch({
                        serviceDestination: 'NEW',
                        data: {},
                        success: function (data) {
                            if (data.length < 5) {
                                // errore fetch categorie
                                defer.resolve(new Backbone.Collection());
                            }
                            else {
                                Appersonam.request("global:initialize:categories", data);
                                defer.resolve(data);
                            }
                        },
                        error: function (data) {
                            defer.resolve(new Backbone.Collection());
                        }
                    });
                    var promise = defer.promise();
                    return promise;
                }
                else {
                    var promise = defer.promise();
                    defer.resolve(new Backbone.Collection(entities));
                    return promise;
                }
            },

            getCategoryEntity: function (entityId) {
                var entity = new Entities.Category();
                var defer = $.Deferred();
                entity.fetch({
                    data: { id: entityId },
                    success: function (resultData) {
                        defer.resolve(resultData);
                    },
                    error: function (resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return defer.promise();
            }
        };

        Appersonam.reqres.setHandler("category:entities", function () {
            return API.getCategoryEntities();
        });

        Appersonam.reqres.setHandler("category:entity", function () {
            return API.getCategoryEntity();
        });
    });
    return;

});
