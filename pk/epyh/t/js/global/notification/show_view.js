define(["app",
    'templates'
], function (Appersonam, JST) {
    Appersonam.module("Common.InnerNotification.View", function (View, Appersonam, Backbone, Marionette, $, _) {
        View.Show = Marionette.ItemView.extend({
            template: JST['assets/js/global/notification/templates/show.html'],
            className: 'flipInX',
            id: 'in-app-notify-content',
            events: {
                'click': 'hideNotification'
            },
            onRender: function () {
                var that = this;
                setTimeout(function () {
                    that.hideNotification();
                }, 6000);
            },
            hideNotification: function (e) {
                if (e) {
                    e.preventDefault();
                }
                var that = this;
                this.$el.bind("webkitAnimationEnd", function () {
                    that.$el.empty();
                    that.close();
                    that.$el.unbind("webkitAnimationEnd");
                });
                this.$el.removeClass('flipInX').addClass('flipOutX');
            }
        });
        Appersonam.on('show:notification', function (message) {
            var notificationView = new View.Show({
                model: new Backbone.Model({ message: message })
            });
            Appersonam.InnerNotificationRegion.show(notificationView);
        });
    });
    return Appersonam.Common.InnerNotification.View;
});