define(["app",
    "moment",
    "entities/file"
], function (Appersonam, moment) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Deal = Backbone.Model.extend({
            defaults: {
                imageObject: new Entities.GetDealFile(),
            }
        });
        Entities.DealFeeback = Backbone.Model.extend({
            url: "rest/feedbacksink/"
        });
        Entities.Deals = Backbone.Collection.extend({
            url: "rest/deals/",
            model: Entities.Deal,
        });
        var API = {
            getDeals: function () {
                var entities = new Entities.Deals();
                var defer = $.Deferred();
                entities.fetch({
                    showLoading: false,
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.resolve(new Entities.Deals([]));
                        //defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            }
        };

        Appersonam.reqres.setHandler('deals:feedback', function(data){
            return new Entities.DealFeeback(data);
        });
        Appersonam.reqres.setHandler("deals:list", function () {
            return API.getDeals();
        });
        Appersonam.reqres.setHandler("empty:deals:list", function () {
            return new Entities.Deals();
        });
    });
    return;
});