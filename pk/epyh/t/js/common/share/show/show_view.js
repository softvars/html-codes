define(["app",
    'templates'
], function (Appersonam, JST) {
    Appersonam.module("Common.ShowShare.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.ShowView = Marionette.ItemView.extend({
            template: JST['assets/js/common/share/show/templates/share.html'],
            className: "share-layout",
            events: {
                'click .js-back': 'back',
                'click a.js-share': 'share'
            },
            back: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('back');
            },
            addBlur: function () {
                this.$el.addClass('blurred-element');
            },
            removeBlur: function () {
                this.$el.removeClass('blurred-element');
            },
            share: function (e) {
                e.preventDefault();
                this.trigger('share');
            }
        });
    }, Handlebars);
    return Appersonam.Common.ShowShare.View;
});