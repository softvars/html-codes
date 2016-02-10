define(["app",
    'templates',
    "moment",
    "pickadate",
    "pickerDate",
    "pickerLng",
    "backbone.syphon"],
       function (Appersonam, JST, moment, pickadate, pickerDate, pickerLng) {
           Appersonam.module("PaymentsApp.BillProfile.Views", function (Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {

               Views.Form = Marionette.Layout.extend({
                   template: JST['assets/js/apps/payments/bills/templates/profile.html'],
                   regions: {
                       keyboardRegion: "#keyboard-region",
                       commandRegion: "#command-region",
                       resultRegion: "#result-region",
                   },
                   events: {
                       "click a.js-confirm": "submitClicked",
                       'click #importo': 'showKeyboard',
                       'click #discriminatore': 'showCombo',
                       'keyup .js-prevent': 'preventKey',
                       'focus .js-prevent': 'preventFocus',
                       'focusout .mark': 'updateInput',
                       'click .mark': 'clickIn',
                       //'keyup .mark': 'updateInput'
                   },
                   clickIn: function (e) {
                       var currentTarget = $(e.currentTarget);
                       var key = currentTarget.attr('id');
                       if (this.$el.find('#input-' + key).val() === '') {
                           currentTarget.text('');
                           currentTarget.focusin();
                       }
                   },
                   showCombo: function (e) {
                       e.preventDefault();
                       e.stopPropagation();
                       this.trigger('combo:show');
                   },
                   setValue: function (key, value, text) {//per il combo box
                       var currentTarget = this.$el.find('#' + key);
                       currentTarget.text(text);
                       this.$el.find('#input-' + key).val(value);
                       this.$el.find('#' + key).text('' + value);
                   },
                   updateInput: function (e) {
                       var currentTarget = $(e.currentTarget);
                       var target = currentTarget.attr('id');
                       var value = currentTarget.text();
                       this.setValue(target, value);
                   },
                   setValue: function (key, value) {
                       var currentTarget = this.$el.find('#' + key);
                       if (value.replace(/\s+/g, '') === '') {
                           value = currentTarget.data('placeholder');
                           currentTarget.text(value);
                           this.$el.find('#input-' + key).val('');
                       }
                       else {
                           currentTarget.text(value);
                           this.$el.find('#input-' + key).val(value);
                       }
                   },
                   initialize: function () {
                       var today = new moment(new Date()).format('DD/MM/YYYY');
                       this.model.set({ data: today });//inizializzo il model ad oggi
                   },
                   onShow: function () {
                       var self = this;
                       var today = new moment(new Date()).format('DD/MM/YYYY');
                       this.$el.find('.data').text(today);
                       var picker = this.$el.find('.data').pickadate({
                           onSet: function (context) {
                               var date = new moment(new Date(context.select)).format('DD/MM/YYYY');
                               self.setValue('data', date);
                           }
                       });
                       Backbone.Syphon.deserialize(this, this.model.toJSON());
                   },
                   addBlur: function () {
                       this.$el.addClass('blurred-element');
                   },
                   removeBlur: function () {
                       this.$el.removeClass('blurred-element');
                   },
                   //tastiera
                   preventFocus: function (e) {
                       e.preventDefault();
                   },
                   preventKey: function (e) {
                       e.preventDefault();
                       var value = $(e.currentTarget).text();
                       $(e.currentTarget).text('0');
                   },
                   showKeyboard: function (e) {
                       this.keyboardTarget = $(e.currentTarget).attr('id');
                       var value = this.$el.find('#input-' + this.keyboardTarget).val().replace(/^0+(?!$)/, '');
                       this.trigger('keyboard:show', value, this.keyboardTarget);
                   },


                   submitClicked: function (e) {
                       e.preventDefault();
                       e.stopPropagation();
                       this.keyboardRegion.close();
                       var data = Backbone.Syphon.serialize(this);
                       this.model.set(data);
                       this.$el.find("#result-region").html('');
                       this.model.unset('ErrorMessage');
                       this.model.unset('undefined_submit');
                       this.trigger("form:submit", this.model);
                   },
                   wrongPassword: function () {
                       this.$el.find("#result-region").html('Password Inserita Non Valida');
                   },
                   success: function () {
                       this.$el.find("#result-region").html('OK!');
                   },

                   showErrors: function (errors) {
                       var $view = this.$el;
                       var clearFormErrors = function () {
                           var $form = $view.find("form");
                           $form.find(".help-inline.error").each(function () {
                               $(this).remove();
                           });
                           $form.find(".control-group.error").each(function () {
                               $(this).removeClass("error");
                           });
                       }
                       var markErrors = function (value) {
                           var $controlGroup = $view.find("#" + value.field).parent();
                           var $errorEl = $("<span>", { class: "help-inline error", text: value.errorMessage.split(' (')[0] });
                           $controlGroup.append($errorEl).addClass("error");
                       }
                       clearFormErrors();
                       _.each(errors, markErrors);
                   }
               });
           }, Handlebars);
           return Appersonam.PaymentsApp.BillProfile.Views;
       });
