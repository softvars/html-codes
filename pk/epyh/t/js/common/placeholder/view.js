define(["app",
    'templates'
], function (Appersonam, JST) {
    Appersonam.module("Common.Placeholder.View", function (View, Appersonam, Backbone, Marionette, $, _) {
        View.PlaceholderWidget = Marionette.ItemView.extend({
            initialize: function () {
                console.log(this.options.placeholderType);
                this.template = JST['assets/js/common/placeholder/templates/' + this.options.placeholderType + '_placeholder.html'];
            },
            className: "placeholder"
        });
    });
    return Appersonam.Common.Placeholder.View;
});