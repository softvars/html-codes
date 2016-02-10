define(["app",
    'templates'
], function(Appersonam, JST) {
    Appersonam.module("MovementsApp.VenuelList.View", function(View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.Layout = Marionette.Layout.extend({
            template: JST['assets/js/apps/activities/movements/venue_list/templates/layout.html'],
            className: "select-merchant",
            regions: {
                topRegion: "#search-region",
                listRegion: "#list-region"
            }
        });

        View.TopPanel = Marionette.ItemView.extend({
            template: JST['assets/js/apps/activities/movements/venue_list/templates/top_panel.html'],
            className: "merchant-list",
            events: {
                "keyup .js-filter-criterion": "keyup",
                "keydown .js-filter-criterion": "keydown",
                "click .back": "back"
            },
            typingTimer: '',
            back: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('back');
            },
            onShow: function() {
                this.trigger("venues:filter", '');
                this.$el.find('.loading-contacts').show();
            },
            keydown: function (e) {
                var keyCode = e.keyCode;
                if (keyCode === 13) {
                    e.preventDefault();
                }
                else {
                    clearTimeout(this.typingTimer);
                }
            },
            keyup: function(e) {
                clearTimeout(this.typingTimer);
                var self = this;
                var currentTarget = $(e.currentTarget);
                var value = currentTarget.val();
                this.typingTimer = setTimeout(function() {
                    if (value.length >= 3 || value.length < 1) {
                        self.trigger("venues:filter", currentTarget.val());
                        self.$el.find('.loading-contacts').show();
                    }
                }, 700);
            },
            hideLoading: function () {
                this.$el.find('.loading-contacts').hide();
            },
            /*addVenue: function (e) {
                e.preventDefault();
                this.model.clear();
                var name = this.$(".js-filter-criterion").val();
                this.model.set({ name: name });
                this.trigger("venue:create", this.model);
            },*/
        });

        View.Entity = Marionette.ItemView.extend({
            tagName: "li",
            className: "merchant",
            //initialize: function () {
            //    var terms = this.model.get('terms');
            //    var placeName = terms[0].value;
            //    var placeAddress = '';
            //    for (var i = 1; i < terms.length; i++) {
            //        if (terms[i]) {
            //            placeAddress += terms[i].value + ' ';
            //        }
            //    };
            //    this.model.set('placeName', placeName);
            //    this.model.set('placeAddress', placeAddress);
            //},
            template: JST['assets/js/apps/activities/movements/venue_list/templates/list_item.html'],
            events: {
                "click": "selected",
            },

            selected: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger("venue:selected", this.model);
            },
        });

        var NoEntitiesView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/activities/movements/venue_list/templates/none.html'],
            tagName: "li",
            className: "alert"
        });

        View.Entities = Marionette.CompositeView.extend({
            template: JST['assets/js/apps/activities/movements/venue_list/templates/list.html'],
            emptyView: NoEntitiesView,
            itemView: View.Entity,
            itemViewContainer: "ul",

            initialize: function() {
                this.listenTo(this.collection, "reset", function() {
                    this.appendHtml = function(collectionView, itemView, index) {
                        collectionView.$el.find('ul').append(itemView.el);
                    }
                });
            }
        });
    }, Handlebars);
    return Appersonam.MovementsApp.VenuelList.View;
});