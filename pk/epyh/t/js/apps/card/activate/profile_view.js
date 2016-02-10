define(["app",
    'templates',
    "backbone.syphon"],
    function (Appersonam, JST, moment) {
        Appersonam.module("CardApp.Activate.Views", function (Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {
            Views.ProfileView = Marionette.Layout.extend({
                template: JST['assets/js/apps/card/activate/templates/profile.html'],
                events: {
                    'click a.js-back': 'back',
                    'input #entity-cvv': 'cvvInput',
                    //'keyup input': 'keyUpInput',
                    'click a.js-submit': 'submitClicked'
                },
                cvvInput: function (e) {
                    var keyCode = e.keyCode;
					
					var valueL = this.$el.find("#entity-cvv").val();
					if (valueL.length >= 4) {
					    this.$el.find("#entity-cvv").val(valueL.slice(0, 3));
					}
					else if (valueL.length === 0) {
					    this.$el.find("#entity-cvv").val('');
					}
					
					
                    if (keyCode !== 13) {
                        var input = $(e.currentTarget);
                        var value = input.val() + '';
                        if (value.length == 3) {
                            this.$el.find("#activate-button").removeClass("inactive");
                        } else {
                            this.$el.find("#activate-button").addClass("inactive");
                        }
                    }
                    else {
                        e.preventDefault();
                        this.submitClicked(e);
                    }
                },
                addBlur: function () {
                    this.$el.addClass('blurred-element');
                },
                removeBlur: function () {
                    this.$el.removeClass('blurred-element');
                },
                back: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger("back");
                },
                submitClicked: function (e) {
                    this.clearFormErrors();
                    e.preventDefault();
                    var data = Backbone.Syphon.serialize(this);
                    var $view = this.$el;
                    if (!data.cvv || data.cvv === '') {
                        var $controlGroup = $view.find("#entity-cvv").parent();
                        var $errorEl = $("<span>", { class: "help-inline error", text: 'Inserire un CVV' });
                        $controlGroup.append($errorEl);
                    }
                    else if (data.cvv.length != 3 || isNaN(data.cvv)) {
                        var $controlGroup = $view.find("#entity-cvv").parent();
                        var $errorEl = $("<span>", { class: "help-inline error", text: 'Inserire un CVV valido' });
                        $controlGroup.append($errorEl);
                    }
                    else {
                        this.trigger("form:submit", data);
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
                //onFormDataInvalid: function (errors) {
                //    var $view = this.$el;
                //    var markErrors = function (value, key) {
                //        var $controlGroup = $view.find("#entity-" + key).parent();
                //        var $errorEl = $("<span>", { class: "help-inline error", text: value });
                //        $controlGroup.append($errorEl);
                //    }
                //    this.clearFormErrors();
                //    _.each(errors, markErrors);
                //},
                initialize: function () {
                    this.model.on('change', this.render, this);
                },
                className: 'card-activate'
            });
        }, Handlebars);
        return Appersonam.CardApp.Activate.Views;
    });
