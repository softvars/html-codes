define(["app",
    'templates'
],
    function (Appersonam, JST, moment) {
        Appersonam.module("CardApp.RechargeMenu.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
            View.Menu = Marionette.Layout.extend({
                template: JST['assets/js/apps/card/recharge/menu/templates/show.html'],
                className: 'card-recharge-menu',
                events: {
                    'click .js-recharge-via-transfer': 'viaTransferClicked',
                    'click .js-recharge-via-card': 'viaCardClicked',
                    'click .js-toggle-menu': 'toggleMenuClicked'
                },
                viaTransferClicked: function (e) {
                    e.preventDefault();
                    this.trigger('item:selected', 'transfer');
                },
                viaCardClicked: function (e) {
                    e.preventDefault();
                    var isDisabled = $(e.currentTarget).hasClass('disabled');
                    if (Appersonam.CommonVariables['CardRechargeActive'] === true && isDisabled !== true) {
                        this.trigger('item:selected', 'card');
                    }
                },
                toggleMenuClicked: function (e) {
                    e.preventDefault();
                    this.trigger('corner:menu');
                },
                onShow: function () {
                    if (Appersonam.CommonVariables['CardRechargeActive'] !== true) {
                        this.$el.find('.js-recharge-via-card').addClass("disabled");
                    }
                },
            });
        }, Handlebars);

        return Appersonam.CardApp.RechargeMenu.View;
    });