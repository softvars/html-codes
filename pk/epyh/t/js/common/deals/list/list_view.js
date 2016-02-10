define(["app",
    'entities/file',
    'templates'
], function(Appersonam, Files, JST) {
    Appersonam.module("Common.DealsList.View", function(View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.LayoutView = Marionette.Layout.extend({
            template: JST['assets/js/common/deals/list/templates/layout.html'],
            className: "deals-list-layout",
            regions: {
                topPanelRegion: "#top-panel-region",
                listRegion: "#list-region"
            },
            events: {
                'click a.toggle-menu': 'menu'
            },
            menu: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('corner:menu');
            }
        });

        View.TopPanelView = Marionette.ItemView.extend({
            className: 'top-deals-panel',
            template: JST['assets/js/common/deals/list/templates/top_panel.html'],
        });

        View.DealCategoryView = Marionette.ItemView.extend({
            className: 'deal-category',
            template: JST['assets/js/common/deals/list/templates/deal_category.html'],
        });

        View.ChildView = Marionette.CompositeView.extend({
            template: JST['assets/js/common/deals/list/templates/list_item.html'],
            className: "deals-item hidden",
            itemViewContainer: '.deal-categories',
            itemView: View.DealCategoryView,
            imgPlaceHolder: 'assets/images/deal_placeholder.svg',
            initialize: function() {
                //var imageEntity = Appersonam.re
                var dirtyCategories = this.model.get('item').categories;
                if (dirtyCategories) {
                    var cleanCategories = new Array();
                    var maxLength = dirtyCategories.length;
                    if (maxLength > 2) {
                        maxLength = 2;
                    }
                    for (var i = 0; i < maxLength; i++) {
                        var item = dirtyCategories[i];
                        if (item.tdCategoryName) {
                            cleanCategories.push({
                                name: item.tdCategoryName
                            });
                        } else {
                            cleanCategories.push({
                                name: item.name
                            });
                        }
                    }
                    this.collection = new Backbone.Collection(cleanCategories);
                }
            },
            events: {
                "click": "clicked"
            },
            imagesLoadedCount: 0,
            imagesCount: 2,
            imagesLoaded: function(content, type) {
                var that = this;
                if (content) {
                    this.$el.find('.deal-' + type + ' > img').attr('src', 'data:image/png;base64,' + content);
                } else {
                    if (type === 'logo') {
                        this.$el.find('.deal-' + type).addClass('hidden');
                    } else {
                        this.$el.find('.deal-' + type + ' > img').attr('src', this.imgPlaceHolder);
                    }
                }
                setTimeout(function() {
                    that.imagesLoadedCount++;
                    if (that.imagesLoadedCount === that.imagesCount) {
                        that.trigger('image:loaded');
                    }
                }, 50);
            },
            //TEST
            loadImage: function(imageUrl, type) {
                var that = this;
                var getImageObject = this.model.get('imageObject').clone();
                getImageObject.save({
                    url: imageUrl
                        //url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Busterkeaton.jpg/220px-Busterkeaton.jpg'
                }, {
                    requestMode: 'BACKBONE',
                    showLoading: false,
                    success: function(resultData) {
                        that.imagesLoaded(resultData.get('data'), type);
                    },
                    error: function() {
                        that.imagesLoaded('', type);
                    }
                });
            },
            onShow: function() {
                var that = this;
                var productImageUrl = this.model.get('item').productImage;
                var logoImageUrl = this.model.get('item').programLogoUrl;
                if (!productImageUrl) {
                    that.imagesLoaded(null, 'img');
                } else {
                    that.loadImage(productImageUrl, 'img');
                }
                if (!this.model.get('item').programLogoUrl) {
                    that.imagesLoaded(null, 'logo');
                } else {
                    that.loadImage(logoImageUrl, 'logo');
                }
            },
            clicked: function(e) {
                e.preventDefault();
                //e.stopPropagation();
                var newModel = new Backbone.Model(this.model.toJSON());
                newModel.set({
                    base64Img: (this.$el.find('.deal-img > img').attr('src'))
                });
                newModel.set({
                    base64Logo: (this.$el.find('.deal-logo > img').attr('src'))
                });
                this.trigger("clicked", newModel);
            }
        });

        View.EmptyView = Marionette.ItemView.extend({
            template: JST['assets/js/common/deals/list/templates/none.html'],
            className: "no-deals",
        });

        View.ListView = Marionette.CompositeView.extend({
            template: JST['assets/js/common/deals/list/templates/list.html'],
            className: "",
            emptyView: View.EmptyView,
            itemViewContainer: ".deals-list",
            itemView: View.ChildView,
            initialize: function() {
                this.listenTo(this.collection, "reset", function() {
                    this.render();
                });
                this.on("itemview:clicked", function(childView, model) {
                    this.trigger("show:deal", model);
                });
                this.on("itemview:image:loaded", function(childView) {
                    this.childImageLoaded(childView);
                });
                this.baseMargin = $(window).width() * (2.5 / 100);
            },
            events: {
                'click a.top-char': 'goTop'
            },
            goTop: function(e) {
                this.$el.find(".deals-list-container").animate({
                    scrollTop: 0
                }, "slow");
            },
            loadedChildren: 0,
            leftElementMargin: 0,
            rightElementMargin: 0,
            fillHtml: function(i) {
                //if (this.collection.length > 0) {
                try {
                    //this.$el.find('.search-result-title').text('Risultati trovati:');
                    var self = this;
                    //for (var i = 0; i < this.collection.length; i++) {
                    try {
                        var item = this.collection.at(i);

                        self.addChildView(item, null, null);
                    } catch (ex) {
                        LogDB.log('errore p2p addChildView => ' + ex.message);
                    }
                    //}
                } catch (ex) {
                    LogDB.log('errore p2p fillHtml => ' + ex.message);
                }
                //}
            },
            childImageLoaded: function(itemView) {
                var index = this.collection.indexOf(itemView.model);
                var margin = 0;
                if (index % 2 === 0) {
                    itemView.$el.css('margin-top', this.baseMargin + this.leftElementMargin);
                    itemView.$el.removeClass('hidden');
                    this.leftElementMargin += this.baseMargin + itemView.$el.height();
                    this.$el.find('.deals-list').css('height', this.leftElementMargin + 10);
                } else {
                    itemView.$el.css('margin-top', this.baseMargin + this.rightElementMargin);
                    itemView.$el.removeClass('hidden');
                    this.rightElementMargin += this.baseMargin + itemView.$el.height();
                    if (this.rightElementMargin > this.leftElementMargin) {
                        this.$el.find('.deals-list').css('height', this.rightElementMargin + 10);
                    }
                }
                this.loadedChildren++;
                if (this.loadedChildren < this.collection.length) {
                    this.fillHtml(this.loadedChildren);
                }
            }
        });
    }, Handlebars);
    return Appersonam.Common.DealsList.View;
});
