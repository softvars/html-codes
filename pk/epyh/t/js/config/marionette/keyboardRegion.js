define(["marionette"], function (Marionette) {
    Marionette.Region.KeyboardRegion = Backbone.Marionette.Region.extend({
        el: "#keyboard-region",

        show: function (view) {
            this.ensureEl();
            view.render();

            this.close(function () {
                if (this.currentView && this.currentView !== view) {
                    return;
                }
                this.currentView = view;
                this.open(view, function () {
                    if (view.onShow) {
                        view.onShow();
                    }
                    view.trigger("show");

                    if (this.onShow) {
                        this.onShow(view);
                    }
                    this.trigger("view:show", view);
                });
            });
        },

        close: function (cb) {
            var view = this.currentView;
            delete this.currentView;

            if (!view) {
                if (cb) {
                    cb.call(this);
                }
                return;
            }
            var that = this;
            this.$el.removeClass("slideIn");
            this.$el.bind("webkitTransitionEnd", function () {
                if (view.close) {
                    view.close();
                }
                that.trigger("view:closed", view);
                that.$el.unbind("webkitTransitionEnd");

                if (cb) {
                    cb.call(that);
                }
            });
        },

        open: function (view, callback) {
            var that = this;
            this.$el.html(view.$el);
            this.$el.addClass("slideIn");
            this.$el.bind("webkitTransitionEnd", function () {
                callback.call(that);
                that.$el.unbind("webkitTransitionEnd");
            });
        }
    });
    return Marionette.Region.KeyboardRegion;
});