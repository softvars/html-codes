define(["app",
        "common/deals/list/list_view",
        "common/innerloading/view"
    ],
    function(Appersonam, DealsViews, InnerLoading) {
        Appersonam.module("DealsApp.List", function(List, Appersonam, Backbone, Marionette, $, _) {
            List.Controller = {
                sendDealsFeedback: function() {
                    var feedbackData = {
                        service: 'dealListClick',
                        idDeal: '',
                        itemCode: '',
                        queryString: '',
                        idObiettivo: '',
                    };
                    var dealFeedback = Appersonam.request('deals:feedback', feedbackData);
                    dealFeedback.save(null, {
                        withoutMethods: true,
                        showLoading: false,
                        success: function(result) {},
                        error: function(result) {}
                    });
                },
                list: function(menuAnimationDisabled) {
                    var self = this;
                    require(["entities/deal"], function() {
                        self.sendDealsFeedback();
                        var fetchingDealsList = Appersonam.request("deals:list");
                        var loadingListView = new InnerLoading.LoadingListView();
                        var layout = new DealsViews.LayoutView();
                        $.when(fetchingDealsList).done(function(dealsList) {
                            if (dealsList && dealsList.length > 0) {
                                var topPanel = new DealsViews.TopPanelView();
                                var listView = new DealsViews.ListView({
                                    collection: new Backbone.Collection()
                                });
                                loadingListView.close();
                                layout.listRegion.show(listView);
                                listView.collection.reset(dealsList.toJSON(), {
                                    silent: true
                                });
                                listView.on('show:deal', function(selectedDeal) {
                                    Appersonam.DealsApp.trigger('show:deal', selectedDeal);
                                });
                                if ($('#loading-content').is(':visible')) {
                                    if (!menuAnimationDisabled) {
                                        Appersonam.NavigationApp.trigger('corner:menu'); //chiude il menu laterale
                                    }
                                    setTimeout(function() {
                                        Appersonam.trigger('close:loading');
                                    }, 1000);
                                }
                                listView.fillHtml(0);
                            } else {
                                var none = new DealsViews.EmptyView();
                                layout.listRegion.show(none);
                                if (!menuAnimationDisabled) {
                                    Appersonam.NavigationApp.trigger('corner:menu'); //chiude il menu laterale
                                }
                                setTimeout(function() {
                                    Appersonam.trigger('close:loading');
                                }, 1000);
                            }
                        });
                        layout.on('corner:menu', function() {
                            Appersonam.NavigationApp.trigger('corner:menu');
                        });
                        layout.on('show', function() {
                            layout.listRegion.show(loadingListView);
                        });
                        Appersonam.DealsApp.trigger('show:main', layout, 1, menuAnimationDisabled);
                    });
                }
            }
        });
        return Appersonam.DealsApp.List.Controller;
    });
