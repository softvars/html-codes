define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {

        var appKey = "AIzaSyBrtSy1I0XpU3UGSv7mTdT_TJPk-FovA3Y";
        var sensor = false;
        var radius = "2000";
        var lat = 45.563397;
        var lng = 8.057712;

        Entities.Venue = Backbone.Model.extend({
            urlRoot: "https://maps.googleapis.com/maps/api/place/add/json?sensor=" + sensor + "&key=" + appKey,
            defaults: {

            },
            save: function (attributes, options) {
                options.requestMode = 'BACKBONE';
                self.set({ id: null, location: { lat: lat, lng: lng }, accuracy: 500, language: 'it-IT', types: ['establishment'] });
                Backbone.Model.prototype.save.call(self, attributes, options);
            },
        });

        Entities.VenueCollectionObject = Backbone.Model.extend({
            urlRoot: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            defaults: {
                results: ''
            },
            //model: Entities.Venue,
            //comparator: "name"
        });

        Entities.VenuePosition = Backbone.Model.extend({
            urlRoot: "https://maps.googleapis.com/maps/api/place/textsearch/json",
        });
        Entities.VenueCollection = Backbone.Collection.extend({
            url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            model: Entities.Venue,
            //comparator: "name"
        });

        var API = {
            getVenueEntities: function (filterCriterion) {
                var entities = new Entities.VenueCollectionObject();
                var defer = $.Deferred();
                navigator.geolocation.getCurrentPosition(function (position) { 
                    entities.fetch({
                        requestMode: 'BACKBONE',
                        data: { location: position.coords.latitude + ',' + position.coords.longitude, keyword: filterCriterion, radius: radius, sensor: sensor, key: appKey },
                        success: function (data) {
                            defer.resolve(data.get('results'));
                        },
                        error: function (data) {
                            defer.resolve(new Backbone.Model());
                        }
                    });
                }, function (posErr) { 
                    alert('Attiva la geolocalizzazione e riprova');
                    //TODO: informo utente e imposto loc di default
                }, {}/*options*/);
                var promise = defer.promise();
                return promise;
            },
            getVenuePosition: function (name) {
                var entities = new Entities.VenuePosition();
                var defer = $.Deferred();
                entities.fetch({
                    requestMode: 'BACKBONE',
                    data: { location: lat + ',' + lng, query: name, type: 'establishment', radius: 0, sensor: sensor, key: appKey },
                    success: function (data) {
                        defer.resolve(data.get('results')[0]);
                    },
                    error: function (data) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                var promise = defer.promise();
                return promise;
            }
        };

        Appersonam.reqres.setHandler("venue:entities", function (filterCriterion) {
            return API.getVenueEntities(filterCriterion);
        });
        Appersonam.reqres.setHandler("venue:entity:new", function () {
            return new Entities.Venue();
        });
        Appersonam.reqres.setHandler("venue:entities:new", function () {
            return new Entities.VenueCollection();
        });
        Appersonam.reqres.setHandler("venue:entity:getbyname", function (name) {
            return API.getVenuePosition(name);
        });
    });
    return;

});
