define(["app",
    'templates'
], function (Appersonam, JST) {
    Appersonam.module("Common.Innerloading.View", function (View, Appersonam, Backbone, Marionette, $, _) {

        View.LoadingListView = Marionette.ItemView.extend({
            template: JST['assets/js/common/innerloading/templates/loading.html'],
            tagName: "div",
            className: "loading-list",
            onRender: function () {
                if (this.options.hide === true) {
                    this.$el.hide();
                }
            },
            visualize: function (callback) {
                this.$el.show();
                if (callback) {
                    setTimeout(function () {
                        callback();
                    }, 50);
                }
            },
            disappear: function (callback) {
                this.$el.hide();
                if (callback) {
                    setTimeout(function () {
                        callback();
                    }, 50);
                }
            }
        });

    });
    return Appersonam.Common.Innerloading.View;
});