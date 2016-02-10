define(["app",
    'templates'], function (Appersonam, JST) {
        Appersonam.module("Common.Image.Show.View", function (View, Appersonam, Backbone, Marionette, $, _) {
            View.ImageWidget = Marionette.ItemView.extend({
                template: JST['assets/js/common/image/show/templates/show.html'],
                className: 'image-background-style',
                initialize: function () {
                    this.model.on('change', this.render, this);
                },
                onRender: function () {
                    if (this.model.get('content')) {
                        $(this.model.get('target')).attr('style', 'background-image: url(data:image/png;base64,' + this.model.get('content') + ') !important; ')
                    }
                    else {
                        if (this.model.get('image') == null || this.model.get('image').length < 1) {
                            $(this.model.get('target')).addClass('no-image');
                        }
                    }
                    var that = this;
                    var content = this.model.get('content');
                    if (content === '' || content === undefined || content === null) {
                        $(that.model.get('target')).addClass('no-image');
                    }
                    else {
                        $(that.model.get('target')).removeClass('no-image');
                    }
                },
                onShow: function () {
                    if (this.model.get('loading') === true) {
                        $(this.model.get('target')).parent().addClass('loading');
                    }
                    else {
                        $(this.model.get('target')).parent().removeClass('loading');
                    }
                }
            });
        });
        return Appersonam.Common.Image.Show.View;
    });