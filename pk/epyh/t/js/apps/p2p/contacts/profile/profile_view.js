define(["app", 'templates', "backbone.syphon", "iban"],
       function (Appersonam, JST, moment, pickadate, pickerDate, pickerLng) {
           Appersonam.module("P2pApp.Contacts.Profile.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
               View.Form = Marionette.Layout.extend({
                   template: JST['assets/js/apps/p2p/contacts/profile/templates/profile.html'],
                   className: 'transfer-form',
                   regions: {
                       formRegion: "#form-region",
                       commandRegion: "#command-region",
                       emailsRegion: '.emails',
                       phonesRegion: '.phones'
                   },
                   className: 'contact-profile-panel',
                   events: {
                       "click .js-submit": "submitClicked",
                       "click .js-back": "back",
                       "click .js-delete": "deleteClicked",
                       'click a.addEmail': 'addEmail',
                       'click a.addPhone': 'addPhone',
                       'keydown input': 'keyDownInput',
                       'click a.js-toggle-menu': 'toggleMenuClicked'
                   },
                   keyDownInput: function (e) {
                       var keyCode = e.keyCode;
                       if (keyCode === 13) {
                           e.preventDefault();
                           this.submitClicked(e);
                       }
                   },
                   toggleMenuClicked: function (e) {
                       e.preventDefault();
                       this.trigger('corner:menu');
                   },
                   deleteClicked: function (event) {
                       event.preventDefault();
                       this.trigger('delete:contact', this.model);
                   },
                   append: function (className, view, index) {
                       this.$el.find('.' + className).append('<section id="' + className + '_' + index + '"></section>');
                       this.addRegion(className + '_' + index, '#' + className + '_' + index);
                       var region = this.regionManager.get(className + '_' + index);
                       region.show(view);
                   },
                   emails: new Array(),
                   phones: new Array(),
                   addEmail: function (e) {
                       e.preventDefault();
                       emails.push('');
                       this.trigger('email:add', 'email', (emails.length - 1), 'text', '', 'inserisci email');
                   },
                   addPhone: function (e) {
                       e.preventDefault();
                       phones.push('');
                       this.trigger('phone:add', 'phone', (phones.length - 1), 'number', '', 'inserisci numero di telefono');
                   },
                   setValue: function (value, target, index) {
                       if (target === 'email') {
                           emails[index] = value;
                       }
                       else {
                           phones[index] = value;
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
                       this.trigger('back');
                   },
                   onShow: function () {
                       var self = this;
                       Backbone.Syphon.deserialize(this, this.model.toJSON());
                       if (this.model.get('id')) {
                           var alias = ('' + this.model.get('iban') + this.model.get('phoneNumber') + this.model.get('email')).replace(/null/g, '');
                           this.$el.find('#entity-destination').val(alias);
                       }
                       if (this.options.mode === 'request') {
                           this.$el.find('.contact-title').html('Richiedi ad un nuovo contatto');
                           this.$el.find('.actions .description.send-description').hide();
                           this.$el.find('.actions .description.request-description').show();
                       }
                       else {
                           this.$el.find('.actions .description.request-description').hide();
                           this.$el.find('.actions .description.send-description').show();
                       }
                   },
                   submitClicked: function (e) {
                       e.preventDefault();
                       this.submitForm('form:submit');
                   },
                   submitClicked: function (e) {
                       e.preventDefault();
                       var event = 'form:submit';
                       if (!this.model.id) {
                           var savePeer = this.$el.find('.js-una-tantum')[0].checked;
                           if (savePeer === false) {
                               var event = 'una:tantum';
                           }
                       }
                       this.$el.find(".help-inline.error").each(function () {
                           $(this).remove();
                       });
                       var data = Backbone.Syphon.serialize(this);
                       data.nickname = data.firstName + ' ' + data.lastName;

                       data.destination = data.destination.replace(/\s+/g, '');
                       data.phoneNumber = data.email = data.iban = null;
                       var isMail = /^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(data.destination);
                       var isIban = IBAN.isValid(data.destination);
                       var isPhone = /^([00|\+]+\d{2})?3\d{9}$/.test(data.destination);
                       if (isIban) {
                           data.iban = data.destination;
                       }
                       else if (isPhone) {
                           if (data.destination.indexOf('0039') === 0) {
                               data.destination.replace('0039', '+39');
                           }
                           else if (data.destination.indexOf('+39') !== 0) {
                               data.destination = '+39' + data.destination;
                           }
                           data.phoneNumber = data.destination;
                       }
                       else if (isMail) {
                           data.email = data.destination;
                       }
                       //delete data.destination;
                       var self = this;
                       this.trigger(event, data);


                       //var emailString = '', phoneString = '';
                       //for (var i = 0; i < emails.length; i++) {
                       //    if (emails[i] !== '') {
                       //        emailString += emails[i];
                       //        if (i + 1 < emails.length) {
                       //            emailString += ',';
                       //        }
                       //    }
                       //}
                       //for (var i = 0; i < phones.length; i++) {
                       //    if (phones[i] !== '') {
                       //        phoneString += phones[i];
                       //        if (i + 1 < phones.length) {
                       //            phoneString += ',';
                       //        }
                       //    }
                       //}
                       //data.email = emailString;
                       //data.phoneNumber = phoneString;
                       //delete data.undefined_submit;
                   },
                   clearFormErrors: function () {
                       var $form = this.$el.find("form");
                       $form.find(".help-inline.error").each(function () {
                           $(this).remove();
                       });
                       this.$el.find('.destination-error').html('');
                   },
                   onFormDataInvalid: function (errors) {
                       var $view = this.$el;
                       var markErrors = function (value, key) {
                           var $validatedInput = $view.find('[name="' + key + '"]');
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
           return Appersonam.P2pApp.Contacts.Profile.View;
       });
