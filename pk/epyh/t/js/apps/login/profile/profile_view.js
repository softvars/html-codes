define(["app",
    "templates",
    "backbone.syphon",
    "moment"
], function(Appersonam, JST, syphon, moment) {
    Appersonam.module("Login.Profile.View", function(View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        moment.lang('it');

        View.First = Marionette.Layout.extend({
            template: JST['assets/js/apps/login/profile/templates/first.html'],
            className: 'login-first-step login',
            regions: {
                keyboardRegion: '#keyboard-region'
            },
            events: {
                'click a.js-submit': 'submitClicked',
                'click a.js-register': 'registerClicked',
                'click a.js-reset-password': 'resetClicked',
                'keydown #pin': 'pinChanged',
                'keydown input': 'keyDownInput',
                'change input': 'trimInput',
                'click a.js-switch-user': 'switchUser'
            },
            initialize: function() {
                //this.model.on('change', this.render, this);
            },
            trimInput: function(e) {
                var currentTarget = $(e.currentTarget);
                currentTarget.val(currentTarget.val().replace(/\s+/g, ''));
            },
            keyDownInput: function(e) {
                var keyCode = e.keyCode;
                if (keyCode === 13) {
                    $('input, textarea, select').blur();
                    e.preventDefault();
                    this.submitClicked(e);
                }
            },
            onRender: function() {
                console.log('first onrender');
                if (this.model.get('isPlusCustomer') === true) {
                    $('#main-menu').addClass('plus');
                    $('.logo').addClass('plus');
                    this.$el.find('.login').addClass('plus');
                }
            },
            onShow: function() {
                console.log('first onshow');
                if (this.model.get('checksum')) {
                    this.trigger('initialize:keyboard');
                    var windowHeight = this.$el.height();
                    var pinHeight = this.$el.find('.pin').outerHeight();
                    /*if (this.plusCustomer === true) {
                        $('.logo').addClass('plus');
                        $('#main-menu').addClass('plus');
                        $('.login-first-step>.login').addClass('plus');
                    }*/
                }
                else{
                    $('.login').removeClass('plus');
                }
            },
            switchUser: function(e) {
                e.preventDefault();
                Appersonam.trigger('logout');
                $('.plus').removeClass('plus');
            },
            setPin: function(value) {
                var hints = this.$el.find('.hints li');
                hints.removeClass("filled");
                hints.slice(0, value.length).addClass("filled");
                this.$el.find('[name="pin"]').val(value);
                if (value.length == 4) {
                    this.submitClicked();
                }
            },
            pinChanged: function(e) {
                var keyCode = e.keyCode;
                var value = $(e.currentTarget).val();
                if ((value + '').length > 7) {
                    e.preventDefault();
                    if (keyCode === 8) {
                        $(e.currentTarget).val(value.substring(0, (value + '').length - 1));
                    }
                }
            },
            toggleBlur: function() {
                this.$el.toggleClass('blurred-element');
            },
            submitClicked: function(e) {
                $('input, textarea, select').blur();
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                //ga('send', 'event', 'dologin', 'clicked');
                this.clearFormErrors();
                var data = Backbone.Syphon.serialize(this);
                if (data.datanascita) {
                    if (!(data.datanascita.indexOf('/') > -1 && data.datanascita.split('/')[2].length === 4)) {
                        var formatted = moment(data.datanascita, 'YYYY-MM-DD').format('DD/MM/YYYY');
                    } else {
                        formatted = data.datanascita;
                    }
                    var formatted = moment(data.datanascita, 'YYYY-MM-DD').format('DD/MM/YYYY');
                    data.datanascita = formatted;
                }
                data.fingerPrintToken = this.model.get('fingerPrintToken');
                this.trigger("form:submit", data);
            },
            registerClicked: function() {
                var url = 'http://www.hype.it/Hype/registrazione/index.jsp';
                //var ref = window.open(link, '_blank', 'location=yes');
                WebViewPlugin.openLink(null, null, JSON.stringify({
                    link: url
                }));
            },
            resetClicked: function() {
                var url = 'http://www.hype.it/main/ldn.1/?sm-application.OnlineInfoInternetCode=&testParam';
                //var ref = window.open(url, '_blank', 'location=yes');
                WebViewPlugin.openLink(null, null, JSON.stringify({
                    link: url
                }));
            },
            clearFormErrors: function() {
                var $form = this.$el.find("form");
                $form.find(".help-inline.error").each(function() {
                    $(this).remove();
                });
                //$form.find(".control-group.error").each(function () {
                //    $(this).removeClass("error");
                //});
            },
            onUseFingerPrint: function(fingerPrintToken) {
                this.model.set('fingerPrintToken', fingerPrintToken);
                this.model.set('pin', 'password');
                this.submitClicked();
            },
            onFormDataInvalid: function(errors) {
                var $view = this.$el;
                var markErrors = function(value, key) {
                    var $validatedInput = $view.find(".js-validate-element-" + key);
                    var $errorEl = $("<span>", {
                        class: "help-inline error",
                        text: value
                    });
                    $validatedInput.after($errorEl).addClass("error");
                };
                this.clearFormErrors();
                _.each(errors, markErrors);
            },
        });

        View.Second = Marionette.Layout.extend({
            template: JST['assets/js/apps/login/profile/templates/second.html'],
            className: 'login-second-step login',
            events: {
                'click .js-submit': 'submitClicked',
                'keydown input': 'keyDownInput',
                'change input': 'trimInput',
                'click .js-block-spinner': 'blockSpinner'
            },
            blockSpinner: function(e) {
                if (e) {
                    e.preventDefault();
                }
                this.autoRead = false;
                this.model.set({
                    isAndroid: false
                });
                this.render();
            },
            regions: {
                keyboardRegion: '#keyboard-region'
            },
            trimInput: function(e) {
                var currentTarget = $(e.currentTarget);
                currentTarget.val(currentTarget.val().replace(/\s+/g, ''));
            },
            readSms: function(data) {
                if (this.autoRead === true) {
                    this.$el.find('.js-password').val(data);
                    this.submitClicked();
                }
            },
            keyDownInput: function(e) {
                var keyCode = e.keyCode;
                if (keyCode === 13) {
                    e.preventDefault();
                    this.submitClicked(e);
                } else {
                    var value = $(e.currentTarget).val();
                    if (!((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106) || keyCode === 8)) {
                        e.preventDefault();
                    } else {
                        if ((value + '').length > 7) {
                            e.preventDefault();
                            if (keyCode === 8) {
                                $(e.currentTarget).val(value.substring(0, (value + '').length - 1));
                            }
                        }
                    }
                }
            },
            onShow: function(e) {
                var value = this.$el.find('.js-password').html();
                console.log('onshow view.second')
                this.trigger('keyboard:show', value);
            },
            initialize: function() {
                var that = this;
                if (this.model.get('isAndroid') === true) {
                    this.autoRead = true;
                    setTimeout(function() {
                        that.blockSpinner();
                    }, 300000);
                } else {
                    this.autoRead = false;
                }
                //this.model.on('change', this.render, this);
            },
            toggleBlur: function() {
                this.$el.toggleClass('blurred-element');
            },
            submitClicked: function(e) {
                $('input, textarea, select').blur();
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.clearFormErrors();
                var data = Backbone.Syphon.serialize(this);
                this.trigger("form:submit", data);
            },
            clearFormErrors: function() {
                var $form = this.$el.find("form");
                $form.find(".help-inline.error").each(function() {
                    $(this).remove();
                });
            },
            onFormDataInvalid: function(errors) {
                var $view = this.$el;
                var markErrors = function(value, key) {
                    var $validatedInput = $view.find(".js-validate-element-" + key);
                    var $errorEl = $("<span>", {
                        class: "help-inline error",
                        text: value
                    });
                    $validatedInput.after($errorEl).addClass("error");
                }
                this.clearFormErrors();
                _.each(errors, markErrors);
            }
        });
    }, Handlebars);

    return Appersonam.Login.Profile.View;
});
/*
if (!(data.datanascita.indexOf('/') > -1 && data.datanascita.split('/')[2].length === 4)) {
                        var formatted = moment(data.datanascita, 'YYYY-MM-DD').format('DD/MM/YYYY');
                    }
                    */
