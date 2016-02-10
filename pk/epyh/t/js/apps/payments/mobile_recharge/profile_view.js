define(["app",
        'templates'
],
    function (Appersonam, JST) {
        Appersonam.module("PaymentsApp.RechargeProfile.Views", function (Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {
            Views.Resume = Marionette.ItemView.extend({
                className: "recharge-resume-page modal-dialog",
                template: JST['assets/js/apps/payments/mobile_recharge/templates/resume.html'],
                events: {
                    'click a.js-confirm': 'confirmClicked',
                    'click a.js-cancel': 'cancelClicked'
                },
                initialize: function () {
                    this.lockButton = false;//lockbutton true impedisce che il click scateni l'evento di conferma
                },
                onClose: function () {
                    this.lockButton = false;
                },
                onSetLockButton: function (value) {
                    this.lockButton = value;
                },
                onRender: function () {
                    console.log(this.model);
                },
                confirmClicked: function (e) {
                    e.preventDefault();
                    if (this.lockButton !== true) {
                        console.log('conferma ricarica');
                        this.lockButton = true;
                        this.trigger('confirm');
                    }
                },
                cancelClicked: function (e) {
                    e.preventDefault();
                    this.lockButton = false;
                    this.trigger('cancel');
                }
            });
            Views.Form = Marionette.Layout.extend({
                template: JST['assets/js/apps/payments/mobile_recharge/templates/profile.html'],

                regions: {
                    operatorsDropdownRegion: "#operators-dropdown-region",
                    cutsDropdownRegion: "#cuts-dropdown-region",
                    commandRegion: "#command-region",
                    pinRegion: "#pin-region",
                    resultRegion: "#result-region",
                },
                events: {
                    "click a.js-submit": "submitClicked",
                    'keydown #numcell': 'preventKey',
                    'click #operators': 'showOperators',
                    'click #cuts': 'showCuts',
                    'focus #numcell': 'preventFocus',
                    'click a.toggle-menu': 'cornerMenu'
                },
                cornerMenu: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('corner:menu');
                },
                showResult: function (success, message) {
                    if (success === true) {
                        var errorContainer = this.$el.find('.js-result');
                        errorContainer.show().text(message);
                    } else {
                        var errorContainer = this.$el.find('.js-result');
                        errorContainer.hide().text(message);
                        errorContainer.fadeIn().delay(500).fadeOut();
                    }
                },
                showOperators: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('operators:show');
                },
                showCuts: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('cuts:show');
                },
                addBlur: function () {
                    this.$el.addClass('blurred-element');
                },
                removeBlur: function () {
                    this.$el.removeClass('blurred-element');
                },
                setOperatorValue: function (model) { //per il combo box 
                    this.$el.find('#operators').text(model.get('operatorName'));
                    this.$el.find('[name="manager"]').val(model.get('operator'));
                    this.$el.find('#cuts').text(model.get('cuts')[0]);
                    this.$el.find('[name="amount"]').val(model.get('cuts')[0]);
                },
                setCutValue: function (model) { //per il combo box 
                    this.$el.find('#cuts').text(model.get('CutText'));
                    this.$el.find('[name="amount"]').val(model.get('CutValue'));
                },
                preventFocus: function (e) {
                    e.preventDefault();
                },
                preventKey: function (e) {
                    var keyCode = e.keyCode;
                    if (!((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106) || keyCode === 8)) {
                        e.preventDefault();
                    }
                    else if (keyCode === 13) {
                        e.preventDefault();
                        this.submitClicked(e);
                    }
                },
                submitClicked: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.clearFormErrors();
                    this.$el.find('.js-error').text('');
                    this.$el.find("#result-region").html('');
                    var data = Backbone.Syphon.serialize(this);
                    this.trigger("form:submit", data);
                },
                success: function () {
                    this.$el.find("#result-region").html('OK!');
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
                onFormDataInvalid: function (errors) {
                    var $view = this.$el;
                    var markErrors = function (value, key) {
                        var $controlGroup = $view.find("#" + key).parent();
                        var $errorEl = $("<span>", {
                            class: "help-inline error",
                            text: value
                        });
                        $controlGroup.append($errorEl).addClass("error");
                    }
                    this.clearFormErrors();
                    _.each(errors, markErrors);
                }
            });

        }, Handlebars);
        return Appersonam.PaymentsApp.RechargeProfile.Views;
    });