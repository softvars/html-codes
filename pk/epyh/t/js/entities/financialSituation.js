define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.FinancialSituation = Backbone.Model.extend({
            url: 'rest/business/financialSituationBPEL'
            //url: 'rest/business/financialSituationCachwe',
            //url: "financialSituation"
        });

        var API = {
            getFinancialSituationEntity: function (showLoading) {
                var entity = new Entities.FinancialSituation();
                var defer = $.Deferred();
                entity.fetch({
                    data: {},
                    showLoading: showLoading,
                    serviceDestination: 'NEW',
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

        Appersonam.reqres.setHandler("financialSituation:entity", function (showLoading) {
            if (showLoading !== false) {//se è null o undefined
                showLoading = true;
            }
            return API.getFinancialSituationEntity(showLoading);
        });
    });
    return;
});
