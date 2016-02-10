define(["app",
        "common/deals/show/show_view",
        "common/innerloading/view",
        "apps/activities/goals/profile/profile_view"
    ],
    function(Appersonam, DealsViews, InnerLoading, goalProfileViews) {
        Appersonam.module("DealsApp.Show", function(Show, Appersonam, Backbone, Marionette, $, _) {
            Show.Controller = {
                sendDealFeedback:function(service, idDeal, itemCode, queryString, idObiettivo){
                    var feedbackData = {
                        service: service,
                        idDeal: idDeal,
                        itemCode: itemCode,
                        queryString: queryString,
                        idObiettivo: idObiettivo,
                    };
                    var dealFeedback = Appersonam.request('deals:feedback', feedbackData);
                    dealFeedback.save(null, {
                        withoutMethods: true,
                        showLoading: false,
                        success: function(result) {},
                        error: function(result) {}
                    });
                },
                show: function(deal) {
                    var that = this;
                    this.sendDealFeedback('dealClick', deal.get('id'), deal.get('item').productId, '', '');
                    var showView = new DealsViews.ShowView({
                        model: deal
                    });
                    showView.on('back', function() {
                        Appersonam.DealsApp.trigger("nav:back", '', 1);
                    });
                    showView.on('openDeal', function() { 
                        that.sendDealFeedback('dealLinkClick', deal.get('id'), deal.get('item').productId, '', '');
                    });
                    showView.on('new:goal', this.createGoal);
                    Appersonam.DealsApp.trigger('show:main', showView, 2);
                },
                createGoal: function(model) {
                    Appersonam.DealsApp.trigger('new:goal', model.toJSON());
                }
            }
        });
        return Appersonam.DealsApp.Show.Controller;
    });
