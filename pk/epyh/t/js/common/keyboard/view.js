define(["app",
    'templates'
], function (Appersonam, JST) {
    Appersonam.module("Common.Keyboard.View", function (View, Appersonam, Backbone, Marionette, $, _) {
        View.KeyboardWidget = Marionette.ItemView.extend({
            className: "number-keyboard",
            template: JST['assets/js/common/keyboard/templates/keyboard.html'],
            events: {
                'click a.insert': 'insert',
                'click a.delete': 'backSpace',
                'click a.confirm': 'confirm'
            },
            initialize: function () {
                Appersonam.CommonVariables['locked'] = true; // blocca il tasto back
                this.value = this.options.value.replace(',', '.') || '';
                var that = this;
                //this.backButtonListener = document.getElementById('backButton');


                this.backButtonHandler = function () {
                    if (parseFloat(that.value) > 0) {
                        document.removeEventListener('backbutton', that.backButtonHandler);
                        //that.backButtonListener.removeEventListener('click', that.backButtonHandler);
                        that.confirm();
                    }
                };

                //this.backButtonListener.addEventListener("click", this.backButtonHandler, false);
                document.addEventListener('backbutton', this.backButtonHandler, false);
            },
            onShow: function () {
                if (this.options.pinMode) {
                    this.$el.find('.tr-ok').hide();
                    this.$el.find('.dot > a').hide();
                }
            },
            onClose: function () {
                document.removeEventListener('backbutton', this.backButtonHandler);
                //this.backButtonListener.removeEventListener('click', this.backButtonHandler);
                setTimeout(function () {//dopo che il panelmanager non ha scatenato il back perché lockato, lo sblocco
                    Appersonam.CommonVariables['locked'] = false; // sblocca il tasto back
                }, 100);
            },
            insert: function (e) {
                e.preventDefault();
                var input = $(e.currentTarget).data('input');
                var newValue = this.value + input;
                if (this.options.pinMode) {//tastiera per pin
                    this.value = ('' + newValue);
                    this.trigger('keyboard:value:changed', this.value);
                }
                else {//tastiera per inserire cifre
                    //  NON UN NUMERO                 DOPPIO ZERO                   //DUE CIFRE DECIMALI                //UNA SOLA VIRGOLA
                    if (!(isNaN('' + newValue) || newValue.indexOf('00') === 0 || ((newValue.length - newValue.indexOf('.') - 1) > 2 && newValue.indexOf('.') > -1) || newValue.match(/./g) > 0)) {
                        if (newValue.length === 2 && parseFloat(newValue) < 10 && input !== '.') {
                            newValue = newValue.replace(/^0+(?!$)/, '');
                        }
                        if (parseFloat(newValue) <= 99999.99) {
                            this.value = '' + newValue;
                        }
                        this.trigger('keyboard:value:changed', this.value);
                    }
                }
            },
            backSpace: function (e) {
                e.preventDefault();
                if (this.options.pinMode) {
                    this.value = this.value.substring(0, this.value.length - 1);
                }
                else if (this.value.length > 1) {
                    this.value = this.value.substring(0, this.value.length - 1);
                }
                else {
                    this.value = '0';
                }
                this.trigger('keyboard:value:changed', this.value);
            },
            confirm: function (e) {
                if (e) {
                    e.preventDefault();
                }
                this.trigger('keyboard:close');
            }
        });
    });
    return Appersonam.Common.Keyboard.View;
});