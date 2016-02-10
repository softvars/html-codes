define(["app",
    'templates'
], function (Appersonam, JST) {
    Appersonam.module("Common.Confirm.View", function (View, Appersonam, Backbone, Marionette, $, _) {
        View.Profile = Marionette.ItemView.extend({
            template: JST['assets/js/common/confirm/templates/profile.html'],
            className: 'confirm-form',
            events: {
                'click .js-cancel': 'cancel',
                'click .js-confirm': 'confirm'
            },
            onRender: function () {
                if (this.model.get("button") == null) {
                    this.$el.find(".js-confirm").hide();
                }
                if (this.model.get("header") =='hidden') {
                    this.$el.find(".top-title").hide();
                }
                if (this.model.get("closeButton") == "none") {
                    this.$el.find(".bottom-box").hide();
                }
                if (this.model.get("deny")) {
                    this.$el.find(".deny-container").show();
                }
                else{
                    this.$el.find(".deny-container").hide();
                }
            },
            confirm: function (e) {
                e.preventDefault();
                this.trigger('confirm');
            },
            cancel: function (e) {
                e.preventDefault();
                this.trigger('cancel');
            }
        });
    });
    return Appersonam.Common.Confirm.View;
});