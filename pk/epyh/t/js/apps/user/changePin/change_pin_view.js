define(["app",
    'templates',
    "backbone.syphon",
    "moment"
], function (Appersonam, JST, syphon) {
    Appersonam.module("UserApp.ChangePin.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        View.Form = Marionette.Layout.extend({
            template: JST['assets/js/apps/user/changePin/templates/profile.html'],
            className: 'change-pin',
            events: {
                'click a.js-submit': 'submitClicked',
                'click a.js-cancel': 'cancelClicked',
                'keydown #pin': 'pinChanged',
                'keydown input': 'keyDownInput',
                'change input': 'trimInput',
                'click a.js-switch-user': 'switchUser'
            },
            initialize: function () {
                //this.model.on('change', this.render, this);
            },
            trimInput: function (e) {
                var currentTarget = $(e.currentTarget);
                currentTarget.val(currentTarget.val().replace(/\s+/g, ''));
            },

            focusInput: function (e) {
                var name = $(e.currentTarget).attr('name');
                this.current = name;
                var value = $(e.currentTarget).val();
                this.trigger('keyboard', value);
            },
            keyDownInput: function (e) {
                var keyCode = e.keyCode;
                var value = $(e.currentTarget).val();
                if (keyCode === 13) {
                    e.preventDefault();
                    this.submitClicked(e);
                }
                else {
                    if ((value + '').length > 7) {
                        e.preventDefault();
                        if (keyCode === 8) {
                            $(e.currentTarget).val(value.substring(0, (value + '').length - 1));
                        }
                    }
                }
            },
            addBlur: function () {
                this.$el.removeClass('scrollable').addClass('blurred-element');
            },
            removeBlur: function () {
                this.$el.addClass('scrollable').removeClass('blurred-element');
            },
            onRender: function () {
                console.log('first onrender');
            },
            onShow: function () {
                console.log('first onshow');
                if (this.model.get('checksum')) {
                    this.trigger('initialize:keyboard');
                    var windowHeight = this.$el.height();
                    var pinHeight = this.$el.find('.pin').outerHeight();
                    this.$el.find('.logo-container').height(windowHeight - pinHeight)
                    this.$el.find('.logo-container').addClass('absolute');
                    this.$el.find('form').addClass('full');
                }
            },
            switchUser: function (e) {
                e.preventDefault();
                Appersonam.trigger('logout');
            },
            toggleBlur: function () {
                this.$el.toggleClass('blurred-element');
            },
            cancelClicked: function (e) {
                e.preventDefault();
                this.trigger('cancel');
            },
            submitClicked: function (e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.clearFormErrors();
                var data = Backbone.Syphon.serialize(this);
                if (data.datanascita) {
                    if (!(data.datanascita.indexOf('/') > -1 && data.datanascita.split('/')[2].length === 4)) {
                        var formatted = moment(data.datanascita, 'YYYY-MM-DD').format('DD/MM/YYYY');
                    }
                    else {
                        formatted = data.datanascita;
                    }
                    var formatted = moment(data.datanascita, 'YYYY-MM-DD').format('DD/MM/YYYY');
                    data.datanascita = formatted;
                }
                this.trigger("form:submit", data);
            },
            clearFormErrors: function () {
                var $form = this.$el.find("form");
                $form.find(".help-inline.error").each(function () {
                    $(this).remove();
                });
                //$form.find(".control-group.error").each(function () {
                //    $(this).removeClass("error");
                //});
            },
            onFormDataInvalid: function (errors) {
                var $view = this.$el;
                var markErrors = function (value, key) {
                    var $validatedInput = $view.find(".js-validate-element-" + key);
                    var $errorEl = $("<span>", {
                        class: "help-inline error",
                        text: value
                    });
                    $validatedInput.after($errorEl).addClass("error");
                }
                this.clearFormErrors();
                _.each(errors, markErrors);
            },
        });
    }, Handlebars);

    return Appersonam.UserApp.ChangePin.View;
});
/*
if (!(data.datanascita.indexOf('/') > -1 && data.datanascita.split('/')[2].length === 4)) {
                        var formatted = moment(data.datanascita, 'YYYY-MM-DD').format('DD/MM/YYYY');
                    }
                    */