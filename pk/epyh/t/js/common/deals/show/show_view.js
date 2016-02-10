define(["app",
    'templates'
], function (Appersonam, JST) {
    Appersonam.module("Common.ShowDeal.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        View.DealCategoryView = Marionette.ItemView.extend({
            className: '',
            template: JST['assets/js/common/deals/show/templates/deal_category.html'],
        });

        View.ShowView = Marionette.CompositeView.extend({
            template: JST['assets/js/common/deals/show/templates/show.html'],
            className: "show-deal",
            itemViewContainer: '.deal-categories',
            itemView: View.DealCategoryView,
            imgPlaceHolder: 'assets/images/deal_transparent_placeholder.svg',
            initialize: function () {
                //if (!this.model.get('item').productImage) {
                //    this.model.attributes.item.productImage = this.imgPlaceHolder;
                //}
                var dirtyCategories = this.model.get('item').categories;
                var cleanCategories = new Array();
                if (dirtyCategories) {
                    var maxLength = dirtyCategories.length;
                    if (maxLength > 2) {
                        maxLength = 2;
                    }
                    for (var i = 0; i < maxLength; i++) {
                        var item = dirtyCategories[i];
                        if (item.tdCategoryName) {
                            cleanCategories.push({ name: item.tdCategoryName });
                        }
                        else {
                            cleanCategories.push({ name: item.name });
                        }
                    }
                    this.collection = new Backbone.Collection(cleanCategories);
                }
            },
            events: {
                "click .back": "back",
                "click .js-shop": "shop",
                "click .js-create-goal": "createGoal"
            },
            shop: function () {
                var url = this.model.get('item').productUrl;
                this.trigger('openDeal');
                //var ref = window.open(link, '_blank', 'location=yes');
                WebViewPlugin.openLink(null, null, JSON.stringify({ link: url }));
            },
            back: function (e) {
                e.preventDefault();
                this.trigger('back');
                this.model.clear({ silent: true });
            },
            /*setDefaultImage: function (target) {
                target.attr('src', this.imgPlaceHolder);
            },
            onShow: function () {
                var that = this;
                if (!this.model.get('item').productImage) {
                    this.$el.find('.deal-img > img').attr('src', this.imgPlaceHolder);
                }
                this.$el.find('.deal-img > img').on('error', function (e) {
                    that.setDefaultImage($(e.currentTarget));
                });
                this.$el.find('.deal-logo > img').on('error', function (e) {
                    $(e.currentTarget).addClass('hidden');
                });
            }*/
        });
    }, Handlebars);
    return Appersonam.Common.ShowDeal.View;
});