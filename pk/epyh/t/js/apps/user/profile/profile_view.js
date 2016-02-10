define(['app', 'templates', 'backbone.syphon'], function (Appersonam, JST, moment) {
    Appersonam.module('UserApp.Profile.Views', function (Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        Views.Form = Marionette.Layout.extend({
            template: JST['assets/js/apps/user/profile/templates/profile.html'],
            regions: {
                imageProfileRegion: '#image-profile-region',
                imageShowRegion: '#image-show-region',
                emailAliasesRegion: '#email-aliases',
                phoneAliasesRegion: '#phone-aliases'
            },
            updateFields: function () { },
            events: {
                'click .back': 'back',
                'keydown #entity-nickname': 'keyDownInput',
                'click .js-changepin': 'changepin'
            },
            addBlur: function () {
                this.$el.addClass('blurred-element');
            },
            removeBlur: function () {
                this.$el.removeClass('blurred-element');
            },
            changepin: function (e) {
                e.preventDefault();
                Appersonam.UserApp.trigger('user:changepin');
            },
            keyDownInput: function (e) {
                var keyCode = e.keyCode;
                if (keyCode === 13) {
                    e.preventDefault();
                    this.back(e);
                }
            },
            initialize: function () {
                this.model.on('change', this.render, this);
            },
            onRender: function () {
                Backbone.Syphon.deserialize(this, this.model.toJSON());
            },
            back: function (e) {
                e.preventDefault();
                e.preventDefault();
                var nickname = this.$el.find('#entity-nickname').val();
                if (this.model.get('nickname') !== nickname) {
                    this.trigger('form:submit', nickname);
                } else {
                    this.trigger('back');
                }
            },
            onFormDataInvalid: function (errors) {
                var $view = this.$el;
                var clearFormErrors = function () {
                    var $form = $view.find('form');
                    $form.find('.help-inline.error').each(function () {
                        $(this).remove();
                    });
                    $form.find('.control-group.error').each(function () {
                        $(this).removeClass('error');
                    });
                };
                var markErrors = function (value, key) {
                    var $controlGroup = $view.find('#entity-' + key).parent();
                    var $errorEl = $('<span>', {
                        class: 'help-inline error',
                        text: value
                    });
                    $controlGroup.append($errorEl).addClass('error');
                };
                clearFormErrors();
                _.each(errors, markErrors);
            }
        });
        Views.AliasItemView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/user/profile/templates/alias_list_item.html'],
            // className: 'field',
            events: {
                'click .js-remove': 'removeClicked',
                'click .js-activate': 'activateClicked',
                'click .js-set-primary': 'setPrimaryClicked'
            },
            setPrimaryClicked: function (e) {
                e.preventDefault();
                this.trigger('set:primary');
            },
            onShow: function () {
                if (this.model.get('defaultAlias')) {
                    this.$el.addClass('default');
                }
                if (this.model.get('aliasType') == 'M') {
                    this.$el.addClass('mobile');
                } else if (this.model.get('aliasType') == 'E') {
                    this.$el.addClass('email');
                }
                if (this.options.showAdd) {
                    this.$el.find('.js-add').show();
                }
            },
            removeClicked: function (e) {
                e.preventDefault();
                this.trigger('removeClicked');
            },
            activateClicked: function (e) {
                e.preventDefault();
                this.trigger('activateClicked');
            }

        });
        Views.AliasListView = Marionette.CompositeView.extend({
            template: JST['assets/js/apps/user/profile/templates/alias_list.html'],
            className: 'alias-list-wrapper',
            itemView: Views.AliasItemView,
            itemViewContainer: '.alias-list',
            events: {
                'click .js-submit': 'submitClicked',
                'click .back': 'back',
                'keyup .js-new-alias': 'aliasKeyUpInput',
                'click .js-changepin': 'changepin',
                'click .js-add-alias': 'addClicked',
                'click .js-submit-alias': 'submitClicked',
                'keydown .js-new-alias': 'keyDownInput'
            },
            initialize: function () {
                this.on('itemview:addClicked', function (itemView) {
                    this.trigger('add', itemView.model.get('aliasType'));
                });
                this.on('itemview:addClicked', function (itemView) {
                    this.trigger('add', itemView.model.get('aliasType'));
                });
                this.on('itemview:set:primary', function (itemView) {
                    this.trigger('set:primary', itemView.model);
                });
                this.on('itemview:activateClicked', function (itemView) {
                    this.trigger('activate', itemView.model);
                });
                this.on('itemview:removeClicked', function (itemView) {
                    this.trigger('remove', itemView.model);
                });
                this.count = 0;
            },
            buildItemView: function (item, ItemView) {
                var showAdd = false;

                this.count += 1;
                var prevItem = this.collection.at(this.collection.indexOf(item) - 1);
                if (prevItem && prevItem.get('aliasType') !== item.get('aliasType')) {
                    this.count = 1;
                }

                // Is last item
                var nextItem = this.collection.at(this.collection.indexOf(item) + 1);
                if (nextItem && nextItem.get('aliasType') !== item.get('aliasType')) {
                    showAdd = true;
                }
                if (nextItem === null) {
                    showAdd = true;
                }

                if (this.count >= 5) {
                    showAdd = false;
                }

                var view = new ItemView({
                    model: item,
                    showAdd: showAdd
                });
                return view;
            },
            onRender: function () {
                console.log(JSON.stringify(this.model));
            },
            addClicked: function (e) {
                var $e = $(e.currentTarget);
                $e.addClass('hidden');
                $e.parent().next('.new-alias-wrapper').removeClass('hidden');
            },
            aliasKeyUpInput: function (e) {
                var $e = $(e.currentTarget);
                $e.parent().find("button").prop('disabled', !$e.val());
            },
            keyDownInput: function (e) {
                var keyCode = e.keyCode;
                if (keyCode === 13) {
                    e.preventDefault();
                    this.submitClicked(e);
                }
            },
            submitClicked: function (e) {
                e.preventDefault();
                var data = {
                    alias: this.$el.find('input').val(),
                    type: this.model.get('type')
                };
                data.alias = data.alias.replace(/\s+/g, '');
                this.clearFormErrors();
                this.trigger('submit', data);
            },
            clearFormErrors: function () {
                this.$el.find('.help-inline.error').each(function () {
                    $(this).remove();
                });
            },
            onFormDataInvalid: function (errors) {
                var $view = this.$el;
                var markErrors = function (value, key) {
                    var $validatedInput = $view.find('.js-validate-element-' + key);
                    var $errorEl = $('<span>', {
                        class: 'help-inline error',
                        text: value
                    });
                    $validatedInput.after($errorEl).addClass('error');
                };
                this.clearFormErrors();
                _.each(errors, markErrors);
            }
        });

        Views.ActivateAlias = Marionette.ItemView.extend({
            className: 'activate-alias',
            template: JST['assets/js/apps/user/profile/templates/activate_alias.html'],
            events: {
                'click .back': 'back',
                'click .js-submit': 'submitClicked',
                'keydown #entity-otp': 'keyDownInput',
            },
            keyDownInput: function (e) {
                var keyCode = e.keyCode;
                if (keyCode === 13) {
                    e.preventDefault();
                    this.submitClicked();
                }
            },
            back: function (e) {
                e.preventDefault();
                this.trigger('back');
            },
            submitClicked: function (e) {
                if (e) {
                    e.preventDefault();
                }
                var data = this.$el.find('input').val();
                this.clearFormErrors();
                this.trigger('submit', data);
            },
            clearFormErrors: function () {
                this.$el.find('.help-inline.error').each(function () {
                    $(this).remove();
                });
            },
            onFormDataInvalid: function (errors) {
                var $view = this.$el;
                var markErrors = function (value, key) {
                    var $validatedInput = $view.find('.js-validate-element-' + key);
                    var $errorEl = $('<span>', {
                        class: 'help-inline error',
                        text: value
                    });
                    $validatedInput.after($errorEl).addClass('error');
                };
                this.clearFormErrors();
                _.each(errors, markErrors);
            },
            onShow: function () {
                var self = this;
            }
        });

    }, Handlebars);
    return Appersonam.UserApp.Profile.Views;
});
