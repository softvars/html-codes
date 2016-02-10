define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Search = Backbone.Model.extend({
            urlRoot: "",
        });

        Entities.SearchCollection = Backbone.Collection.extend({
            url: "/search/",
            model: Entities.Search
        });

        var API = {
            filterEntities: function (filterCriterion) {
                var entities = new Entities.SearchCollection();
                var defer = $.Deferred();
                entities.fetch({
                    data: { query: filterCriterion },
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            }

        };

        Appersonam.reqres.setHandler("activity:entities:new", function () {
            return new Entities.SearchCollection();
        });

        Appersonam.reqres.setHandler("activity:entities:search", function (filterCriterion) {
            return API.filterEntities(filterCriterion);
        });
    });
    return;
});
