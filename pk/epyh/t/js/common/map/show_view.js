define(["app",
    'templates',
    'mapbox', ], function (Appersonam, JST) {
        Appersonam.module("Common.Map.View", function (View, Appersonam, Backbone, Marionette, $, _) {
            View.ShowView = Marionette.ItemView.extend({
                template: JST['assets/js/common/map/templates/show.html'],

                initialize: function () {
                },
                onShow: function () {
                    var latitude = parseFloat(this.model.get('latitude'));
                    var longitude = parseFloat(this.model.get('longitude'));
                    var name = this.model.get('name');
                    setTimeout(function () {
                        var map = L.mapbox.map('mappa', 'bemindinteractive.i6ca8ci8').setView([latitude, longitude], 14);
                        L.mapbox.featureLayer({
                            // this feature is in the GeoJSON format: see geojson.org
                            // for the full specification
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                // coordinates here are in longitude, latitude order because
                                // x, y is the standard for GeoJSON and many formats
                                coordinates: [
                                  longitude,
                                  latitude
                                ]
                            },
                            //"properties": {
                            //    "title": "Small astronaut",
                            //    "icon": {
                            //        "iconUrl": "/mapbox.js/assets/images/astronaut1.png",
                            //        "iconSize": [50, 50], // size of the icon
                            //        "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                            //        "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                            //        "className": "dot"
                            //    }
                            //},
                            properties: {
                                title: name,
                                // one can customize markers by adding simplestyle properties
                                // https://www.mapbox.com/foundations/an-open-platform/#simplestyle
                                //'marker-size': 'large',
                                //'marker-color': '#BE9A6B',
                                //'marker-symbol': 'star'

                                //per i custom marker vedi qui https://www.mapbox.com/mapbox.js/example/v1.0.0/custom-marker/
                                icon: {
                                    iconUrl: "/assets/images/pin.svg",
                                    "iconSize": [50, 50], // size of the icon
                                    "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                                    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                                    className: "asdasdasdasd"
                                }
                            }
                        }).addTo(map);

                    }, 50);

                },
                //onShow: function () {
                //    var lat = this.model.get('latitude');
                //    var lng = this.model.get('longitude');
                //    try{
                //        var latLng = new google.maps.LatLng(lat, lng);
                //        var options = {
                //            zoom: 16,
                //            disableDefaultUI: true,
                //            center: latLng,
                //            mapTypeId: google.maps.MapTypeId.ROADMAP
                //        };
                //        var map = new google.maps.Map(document.getElementById("map"), options);

                //        var marker = new google.maps.Marker({
                //            position: latLng,
                //            map: map
                //        });}
                //    catch (ex) {
                //    }
                //},
            });
        });
        return Appersonam.Common.Map.View;
    });
