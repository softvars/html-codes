define(["app",
    "backbone.syphon"],
function (Appersonam) {
    Appersonam.module(Appersonam.currentApp.moduleName + ".Coordinates.Views", function (Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        Views.Form = Marionette.Layout.extend({
            template: JST['assets/js/common/coordinates/templates/profile.html'],
            regions: {
                formRegion: "#form-region",
                dropdwonRegion: "#dropdown-region",
                commandRegion: "#command-region"
            },
            toggleBlur: function () {
                this.$el.toggleClass('blurred-element');
            },
            updateFields: function () { },
            events: {
                "click .back": "back",
                'click .js-send-mail': 'sendMail'
            },
            sendMail: function (e) {
                e.preventDefault();
                var data = this.model.toJSON();
                delete data.recharge;
                this.trigger('send:mail', data);
            },
            onShow: function () {
                //Backbone.Syphon.deserialize(this, this.model.toJSON());
            },
            back: function (e) {
                e.preventDefault();
                this.trigger('back');
            }
        });

        Views.SendMail = Marionette.ItemView.extend({
            template: JST['assets/js/common/coordinates/templates/email.html'],
            className: 'send-mail modal-dialog',
            events: {
                'click .js-cancel': 'cancel',
                'click .js-confirm': 'confirm',
                'keydown #entity-email': 'keydown'
            },
            onRender: function () {
                if (this.model.get("button") == null) {
                    this.$el.find(".js-confirm").hide();
                }
            },
            keydown: function (e) {
                var keyCode = e.keyCode;
                if (keyCode === 13) {
                    e.preventDefault();
                    this.confirm(e);
                }
            },
            clearFormErrors: function () {
                var $form = this.$el.find("form");
                $form.find(".help-inline.error").each(function () {
                    $(this).remove();
                });
                $form.find(".control-group.error").each(function () {
                    $(this).removeClass("error");
                });
            },
            confirm: function (e) {
                e.preventDefault();
                this.clearFormErrors();
                //var data = Backbone.Syphon.serialize(this);
                this.trigger('confirm', data);
            },
            cancel: function (e) {
                e.preventDefault();
                this.trigger('cancel');
            },
            onFormDataInvalid: function (errors) {
                var $view = this.$el;
                var markErrors = function (value, key) {
                    var $controlGroup = $view.find("#entity-" + key).parent();
                    var $errorEl = $("<span>", { class: "help-inline error", text: value });
                    $controlGroup.append($errorEl);
                }
                this.clearFormErrors();
                _.each(errors, markErrors);
            }
        });
    }, Handlebars);
    return Appersonam.currentApp.Coordinates.Views;
});
