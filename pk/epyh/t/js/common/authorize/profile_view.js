define(["app",
 'templates',
    "backbone.syphon"], function (Appersonam, JST) {
        Appersonam.module("Common.Authorize.Profile.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
            View.Pin = Marionette.Layout.extend({
                id: "auth-dialog",
                regions: {
                    keyboardRegion: "#keyboard-region"
                },
                template: JST['assets/js/common/authorize/templates/profile.html'],
                events: {
                    "click a.js-submit": "submitClicked",
                    "click a.js-input": "showKeyboard",
                    'keydown .js-input': 'keyDownInput',
                    'click a.js-cancel': 'cancel'
                },
                onClose: function () {
                    this.lockButton = false;
                },
                onSetLockButton: function (value) {
                    this.lockButton = value;
                },
                initialize: function () {
                    this.lockButton = false;//lockbutton true impedisce che il click scateni l'evento di conferma
                },
                onShow: function () {
                },
                cancel: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('close');
                },
                className: 'modal-dialog',
                showKeyboard: function (event) {
                    this.trigger('keyboard:close');
                    var value = $(event.currentTarget).val();
                    var target = $(event.currentTarget).attr('data-target');
                    this.trigger('keyboard:show', value, target);
                },
                setValue: function (number, target) {
                    this.$el.find('#js-' + target).val(number);
                    this.$el.find('[name="' + target + '"]').val(number);
                },
                keyDownInput: function (e) {
                    var keyCode = e.keyCode;
                    if (keyCode === 13) {
                        this.submitClicked(e);
                    }
                },
                submitClicked: function (e) {
                    if (this.lockButton !== true) {
                        this.lockButton = true;
                        console.log('conferma invio credenziali');
                        e.preventDefault();
                        e.stopPropagation();
                        var pwdError = false;
                        var pinError = false;
                        var text = '';
                        this.$el.find(".help-inline.error").each(function () {
                            $(this).remove();
                        });
                        var data = Backbone.Syphon.serialize(this);
                        if (this.model.get('pin') === true) {
                            if (data.pin.length < 1) {
                                pinError = true;
                                text = 'Password obbligatoria';
                            }
                            else if (data.pin.length > 8) {
                                pinError = true;
                                text = 'Inserire una password valida';
                            }
                            if (pinError === true) {
                                var $validatedInput = this.$el.find("#js-pin");
                                var $errorEl = $("<span>", { class: "help-inline error", text: text, style: 'color:red;' });
                                $validatedInput.after($errorEl).addClass("error");
                            }
                        }
                        if (this.model.get('password') === true) {
                            if (data.pwd.length < 1) {
                                pwdError = true;
                                text = 'Password obbligatoria';
                            }
                            /*else if (data.pwd.length !== 9) { //sms otp non è più un alfanumerico di 9 caratteri. Al momento non ho specifiche, quindi tolgo il controllo
                                pwdError = true;
                                text = 'Inserire una password valida';
                            }*/
                            if (pwdError === true) {
                                var $validatedInput = this.$el.find("#js-pwd");
                                var $errorEl = $("<span>", { class: "help-inline error", text: text });
                                $validatedInput.after($errorEl).addClass("error");
                            }

                        }
                        if (pwdError === false && pinError === false) {
                            this.trigger("form:submit", data);
                        }
                    }
                },
            });
        }, Handlebars);
        return Appersonam.Common.Authorize.Profile.View;
    });