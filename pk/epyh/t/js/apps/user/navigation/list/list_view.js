define(["app",
    'templates'
], function (Appersonam, JST) {

    Appersonam.module("UserApp.Navigation.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.Layout = Marionette.Layout.extend({
            template: JST['assets/js/apps/user/navigation/list/templates/layout.html'],
            regions: {
                actionsRegion: "#actions-region",
                resumeRegion: "#resume-region",
                imageProfileRegion: "#image-profile-region"
            },
            events: {
                'click a.toggle-menu': 'cornerMenu',
                'click a.js-sellabox': 'sellabox',
                'click a.js-logout': 'logout',
                'click #user-resume-image': 'imageClicked',
                'click .js-help': 'helpClicked'
            },
            addBlur: function () {
                this.$el.addClass('blurred-element');
            },
            removeBlur: function () {
                this.$el.removeClass('blurred-element');
            },
            imageClicked: function (e) {
                e.preventDefault();
                this.trigger('select:image');
            },
            helpClicked: function (e) {
                e.preventDefault();
                this.trigger('help');
            },
            cornerMenu: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('corner:menu');
            },
            logout: function (e) {
                e.preventDefault();
                e.stopPropagation();
                Appersonam.trigger('fast:logout');
            },
            sellabox: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('sellabox');
            },
            onShow: function () {
                if (Appersonam.CommonVariables['SellaboxActive'] !== true) {
                    this.$el.find('.js-sellabox').hide();
                    this.$el.find('.actions-list>div').last().addClass('full-user-item');
                }
                else {
                    this.$el.find('.js-sellabox').show();
                }
            }
        });

        View.ResumePanel = Marionette.ItemView.extend({
            template: JST['assets/js/apps/user/navigation/list/templates/resumePanel.html'],
            initialize: function () {
                this.model.on('change', function () {
                    this.trigger('model:changed', this.model)
                }, this);
            },
            events: {
                'click .js-plus': 'plusClicked'
            },
            plusClicked: function(e) {
                if (!!Appersonam.CommonVariables) {
                    WebViewPlugin.openLink(null, null, JSON.stringify({
                        link: 'https://www.hype.it' + Appersonam.CommonVariables['myself'].plusUrl
                    }));
                }
            },
            onRender: function () {
            },
        });

        View.UserActionsView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/user/navigation/list/templates/list.html'],
            className: "actions-list",
            events: {
                'click .navigate': 'navigate'
            },
            navigate: function (e) {
                e.preventDefault();
                var trigger = $(e.currentTarget).data('trigger');
                var event = $(e.currentTarget).data('event');
                this.trigger(event, trigger);
            }
        });
    }, Handlebars);
    return Appersonam.UserApp.Navigation.View;
});