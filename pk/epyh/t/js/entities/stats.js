define(["app",
 "moment", ], function (Appersonam, moment) {
     Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {

         Entities.Stats = Backbone.Model.extend({
             url: 'rest/business/dailydiagrams',
         });

         Entities.PieChartData = Backbone.Model.extend({
             url: "rest/business/chartData",
         });

         Entities.PieChartDataItems = Backbone.Collection.extend({
             urlRoot: "rest/business/chartData",
             model: Entities.PieChartData
         });

         var API = {
             getStatsEntity: function (startDate, endDate) {
                var entity = new Entities.Stats();
                var defer = $.Deferred();
                entity.fetch({
                    data: { startDate: startDate, endDate: endDate },
                    serviceDestination: 'NEW',
                    success: function (resultData) {
                        defer.resolve(resultData);
                    },
                    error: function (resultData) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                return defer.promise();
             },
             getPieChart: function (startDate, endDate, type) {
                 var entity = new Entities.PieChartData();
                 var defer = $.Deferred();
                 entity.fetch({
                     data: { startDate: startDate, endDate: endDate, type: type },
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
         Appersonam.reqres.setHandler("pie:entity", function (date, type) {
             var startDate = moment(date).date(1).format('MM/DD/YYYY');
             var endDate = moment(date).add('months', 1).date(1).subtract('days', 1).format('MM/DD/YYYY');
             return API.getPieChart(startDate, endDate, type);
         });
         Appersonam.reqres.setHandler("stats:entity", function (startDate, endDate) {
             if (startDate === null || startDate === undefined) {
                 startDate = moment(new Date()).date(1).format('MM/DD/YYYY');
             }
             if (endDate === null || endDate === undefined) {
                 endDate = moment(new Date()).add('months', 1).date(1).subtract('days', 1).format('MM/DD/YYYY');
             }
             return API.getStatsEntity(startDate, endDate);
         });
     });
     return;
 });
