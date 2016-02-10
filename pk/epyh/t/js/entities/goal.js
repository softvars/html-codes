define(["app",
    "moment",
    "entities/deal"
], function (Appersonam, moment) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Goal = Backbone.Model.extend({
            urlRoot: "rest/goal/",
            defaults: {
                startDate: new Date().getTime(),
                endDate: new moment(new Date().setHours(0, 0, 0, 0)).add('days', 7).valueOf(),
                currentAmount: 0,
                total: 0,
                deals: new Entities.Deals()
            },
            validate: function (attrs, options) {
                var errors = {}
                if (!attrs.title) {
                    errors.title = "Inserire un titolo";
                }
                if (!attrs.endDate) {
                    errors.endDate = "Inserire una data di termine";
                } else {
                    var today = new Date();
                    if ((today.getTime() > attrs.endDate) && (!attrs.id > 0)) {
                        errors.endDate = "Inserire una data di termine futura";
                    }
                }
                if (attrs.total === '0' || attrs.total < 0) {
                    errors.total = "Inserire un importo maggiore di zero";
                } else {
                    if (isNaN(attrs.total) || attrs.total === '-0' || attrs.total === '') {
                        errors.total = "Inserire un importo valido";
                    }
                }
                if (attrs.currentAmount < 0) {
                    errors.current = "Inserire un importo maggiore di zero";
                } else {
                    if (isNaN(attrs.currentAmount) || attrs.currentAmount === '-0') {
                        errors.current = "Inserire un importo valido";
                    } else if (parseFloat(attrs.total) < parseFloat(attrs.currentAmount) && attrs.completed !== true) {
                        errors.current = "Questo importo non può superare il totale";
                    }
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.SearchGoal = Backbone.Model.extend({
            urlRoot: "rest/search"
        });

        Entities.GoalReport = Backbone.Model.extend({
            url: 'rest/goalsreport',
        });

        Entities.GoalCollection = Backbone.Collection.extend({
            url: "rest/goals",
            model: Entities.Goal
        });

        Entities.NormalError = Backbone.Model.extend({
            urlRoot: "rest/business/error",
        });

        Entities.ServerError = Backbone.Model.extend({
            urlRoot: "rest/business/servererror",
        });

        var API = {
            getGoalReport: function (showLoading) {
                var entities = new Entities.GoalReport();
                if (showLoading !== true) {
                    showLoading = false;
                }
                var defer = $.Deferred();
                entities.fetch({
                    showLoading: showLoading,
                    serviceDestination: 'NEW',
                    success: function (data) {
                        //MOCK DEALS
                        //data = new Backbone.Model({ "total": 100, "dailyRate": 0, "expiredGoals": [{ "id": 7081, "title": "MTB", "type": null, "currentAmount": 26, "total": 100, "dailyRate": 74.00, "startDate": 1437688799000, "endDate": 1438214400000, "causal": null, "image": null, "memo": null, "paused": false, "completed": false, "expired": true, "percentage": 0.26, "archived": false, "category": { "id": 1, "name": "Abbigliamento e Accessori" }, "remaining": 0, "remainingPercentage": 0.0, "suspended": false, "deals": [{ "item": { "name": "Battesimo Gran Turismo", "longDescription": "Questo buono vale per 1 persona e comprende:<br />  Open Bar: bevande gratis dentro il box<br />  Briefing teorico sulle tecniche di pilotaggio<br />  2 giri affianco di un pilota professionista che guider&agrave; a secondo la tua scelta la Ferrari F430 (490 CV, cambio da F1), la Lamborghini Gallardo (500 CV, 315 km/h)", "shortDescription": null, "productImage": "http://www.regali24.it/smartedit/images/giftsprev/battesimo-gran-turismo.jpg", "feedId": 18472, "productUrl": "http://pdt.tradedoubler.com/click?a(2522453)p(214925)product(51883ccde4b02ff335a502dd)ttid(3)url(http%3A%2F%2Fwww.regali24.it%2Fregalo-uomo%2Fgran-turismo-milano%2F%3Fpap%3Dtradedoubler-64931ae42fd744f9802caaa9fb3f0e3f)", "productId": "51883ccde4b02ff335a502dd", "modifiedDate": 1367882957596, "creationDate": 1367882957596, "price": 79.0, "currency": "EUR", "brand": null, "model": null, "availability": null, "programLogoUrl": "http://hst.tradedoubler.com/file/214925/logo_regali_24_200x70.jpg" }, "creationDate": 1438253950514, "score": 0.33987036804936954 }, { "item": { "name": "Fotoalbum di famiglia", "longDescription": "Questa esperienza vale per una famiglia e comprende:<br />  - Prosecco o succo di benvenuto<br />  - Un servizio fotografico di 1,5 ore<br />  - Noleggio studio e fotografo professionista<br />  - Tutti gli immagini su cd<br />  - 1 foto nel formato DIN A4", "shortDescription": null, "productImage": "http://www.regali24.it/smartedit/images/giftsprev/fotoalbum-di-famiglia.jpg", "feedId": 18472, "productUrl": "http://pdt.tradedoubler.com/click?a(2522453)p(214925)product(51883ccde4b02ff335a50230)ttid(3)url(http%3A%2F%2Fwww.regali24.it%2Fregali-originali%2Fstudio-fotografico-roma%2F%3Fpap%3Dtradedoubler-64931ae42fd744f9802caaa9fb3f0e3f)", "productId": "51883ccde4b02ff335a50230", "modifiedDate": 1367882957590, "creationDate": 1367882957590, "price": 129.0, "currency": "EUR", "brand": null, "model": null, "availability": null, "programLogoUrl": "http://hst.tradedoubler.com/file/214925/logo_regali_24_200x70.jpg" }, "creationDate": 1438253950993, "score": 0.6577519586387629 }, { "item": { "name": "Escursione in motoslitta", "longDescription": "Quest'esperienza vale per 2 persone e comprende:<br />  <br />  * Noleggio di 1 motoslitta e per 2 persone<br />  * Escursione in motoslitta di 45 min.<br />  * Benzina e noleggio casco incl.<br />  * Guida esperta<br />  * Assicurazione per conducente e passeggero", "shortDescription": null, "productImage": "http://www.regali24.it/smartedit/images/giftsprev/escursioni-in-motoslitta.jpg", "feedId": 18472, "productUrl": "http://pdt.tradedoubler.com/click?a(2522453)p(214925)product(51883ccde4b02ff335a50223)ttid(3)url(http%3A%2F%2Fwww.regali24.it%2Fregalo-ragazzo%2Fescursioni-in-motoslitta%2F%3Fpap%3Dtradedoubler-64931ae42fd744f9802caaa9fb3f0e3f)", "productId": "51883ccde4b02ff335a50223", "modifiedDate": 1367882957588, "creationDate": 1367882957588, "price": 39.0, "currency": "EUR", "brand": null, "model": null, "availability": null, "programLogoUrl": "http://hst.tradedoubler.com/file/214925/logo_regali_24_200x70.jpg" }, "creationDate": 1438253951326, "score": 0.6870473275028173 }, { "item": { "name": "Massaggio aromatico", "longDescription": "- Massaggio di 30 min. <br />  &nbsp; massaggio mediteraneo, drenante e rivitalizzante,  con oli essenziali di basilico, arancio, limone,<br />  &nbsp; mandarino e bergamotto<br />  - Asciugamano, accappatoio e ciabatte messi a disposizione", "shortDescription": null, "productImage": "http://www.regali24.it/smartedit/images/giftsprev/benessere-massaggio-aromatico.jpg", "feedId": 18472, "productUrl": "http://pdt.tradedoubler.com/click?a(2522453)p(214925)product(51883ccde4b02ff335a50251)ttid(3)url(http%3A%2F%2Fwww.regali24.it%2Fbenessere%2Fmassaggio-firenze%2F%3Fpap%3Dtradedoubler-64931ae42fd744f9802caaa9fb3f0e3f)", "productId": "51883ccde4b02ff335a50251", "modifiedDate": 1367882957591, "creationDate": 1367882957591, "price": 59.0, "currency": "EUR", "brand": null, "model": null, "availability": null, "programLogoUrl": "http://hst.tradedoubler.com/file/214925/logo_regali_24_200x70.jpg" }, "creationDate": 1438253951687, "score": 0.3316663702303255 }, { "item": { "name": "Canyoning", "longDescription": "Questo buono vale per 1 persona e comprende:<br />  <br />  * Introduzione al canyoning<br />  * Abbigliamento per il canyoning a noleggio come neoprene, casco, corda etc.<br />  * Discesa canyoning di ca. 3-4 ore<br />  * Guida certificata", "shortDescription": null, "productImage": "http://www.regali24.it/smartedit/images/giftsprev/idee-regalo-canyoning.jpg", "feedId": 18472, "productUrl": "http://pdt.tradedoubler.com/click?a(2522453)p(214925)product(51883ccde4b02ff335a5046e)ttid(3)url(http%3A%2F%2Fwww.regali24.it%2Fregalo-ragazzo%2Fcanyoning-tirolo%2F%3Fpap%3Dtradedoubler-64931ae42fd744f9802caaa9fb3f0e3f)", "productId": "51883ccde4b02ff335a5046e", "modifiedDate": 1367882957611, "creationDate": 1367882957611, "price": 64.0, "currency": "EUR", "brand": null, "model": null, "availability": null, "programLogoUrl": "http://hst.tradedoubler.com/file/214925/logo_regali_24_200x70.jpg" }, "creationDate": 1438253952001, "score": 0.1660201379902737 }] }], "ongoingGoals": [], "completedGoals": [], "pausedGoals": [], "archivedGoals": [] });
                        setTimeout(function () { //poiché la lista degli obbiettivi è molto rapida a caricarsi, evito 
                            //che si sovrapponga con quelli cachati, dato che si aggiornano quais contemporaneamente
                            defer.resolve(data);
                        }, 600);
                    },
                    error: function (data) {
                        defer.resolve(new Backbone.Model({
                            completedGoals: [],
                            pausedGoals: [],
                            expiredGoals: [],
                            ongoingGoals: []
                        }));
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getNormalError: function () {
                var entities = new Entities.NormalError();
                var defer = $.Deferred();
                entities.fetch({
                    serviceDestination: 'NEW',
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (res1, res2, res3) {
                        data;
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getServerError: function () {
                var entities = new Entities.ServerError();
                var defer = $.Deferred();
                entities.fetch({
                    serviceDestination: 'NEW',
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (res1, res2, res3) {
                        data;
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getGoalEntities: function () {
                var entities = new Entities.GoalCollection();
                var defer = $.Deferred();
                entities.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getGoalEntity: function (entityId) {
                var entity = new Entities.Goal();
                var defer = $.Deferred();
                entity.fetch({
                    data: {
                        id: entityId
                    },
                    success: function (resultData) {
                        defer.resolve(resultData);
                    },
                    error: function (resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return defer.promise();
            },
            searchGoalEntities: function (query) {
                var defer = $.Deferred();
                var entities = new Entities.SearchGoal();
                entities.fetch({
                    data: {
                        searchType: "goals",
                        query: query
                    },
                    showLoading: false,
                    success: function (data) {
                        var collection = new Entities.SearchGoal(data.get("goalsReportBean"));
                        defer.resolve(collection);
                    },
                    error: function (data) {
                        defer.resolve(new Backbone.Model({
                            completedGoals: [],
                            pausedGoals: [],
                            expiredGoals: [],
                            ongoingGoals: []
                        }));
                    }
                });
                var promise = defer.promise();
                return promise;
            },
        };

        Appersonam.reqres.setHandler("goal:entities", function () {
            return API.getGoalEntities();
        });

        Appersonam.reqres.setHandler("goal:search:report", function (query) {
            return API.searchGoalEntities(query);
        });

        Appersonam.reqres.setHandler("goal:report", function (collection, showLoading) {
            if (collection) {
                var defer = $.Deferred();
                var promise = defer.promise();
                setTimeout(function () {
                    defer.resolve(collection);
                }, 20);
                return promise;
            } else {
                return API.getGoalReport(showLoading);
            }
        });

        Appersonam.reqres.setHandler("goal:entity", function (id) {
            return API.getGoalEntity(id);
        });

        Appersonam.reqres.setHandler("goal:entity:new", function (data) {
            var goal = new Entities.Goal(data);
            return goal;
        });
    });
    return;
});