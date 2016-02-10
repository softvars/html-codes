define(["app"],
function (Appersonam) {
    Appersonam.module("UserApp.Help.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.Show = Marionette.ItemView.extend({
            template: JST['assets/js/apps/user/help/templates/show.html'],
            events: {
                'click .back': 'backClicked',
                'click .js-mail': 'mailClicked',
                'click .js-phone': 'phoneClicked',
                'click .js-faq': 'faqClicked',
                'click .js-send-log': 'sendLogClicked'
            },
            phoneClicked: function (e) {
                e.preventDefault();
                this.trigger('phone');
            },
            faqClicked: function (e) {
                e.preventDefault();
                this.trigger('faq');
            },
            mailClicked: function (e) {
                e.preventDefault();
                this.trigger('mail');
            },
            sendLogClicked: function (e) {
                e.preventDefault();
                this.trigger('sendLog');
            },
            backClicked: function (e) {
                e.preventDefault();
                this.trigger("back");
            },
        });
    }, Handlebars);
    return Appersonam.UserApp.Help.View;
});
