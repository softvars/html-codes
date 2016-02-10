define(["app",
    'templates'
    //'backbone.hammer'
], function(Appersonam, JST /*, hammer*/ ) {

    Appersonam.module("NavigationApp.List.View", function(View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        View.UserDataView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/navigation/android/list/templates/userdata.html'],
            className: "menu-user-profile",
            onRender: function() {

            }
        });

        View.MenuItemsView = Marionette.Layout.extend({
            template: JST['assets/js/apps/navigation/android/list/templates/list.html'],
            className: "main-menu-wrapper android hidden-menu",
            events: {
                'click a.toggle-menu': 'toggleMenu',
                'click a.navigate.inactive': 'navigate',
                'click a.navigate.active': 'onCornerMenu',
                'click .js-plus': 'plusClicked'
            },
            regions: {
                userDataRegion: '#userdata-region',
                navigationRegion: "#menu-navigation-region"
            },
            menuOptions: {
                paneHeight: 0,
                paneCount: 0,
                currentPane: 0,
                acceleration: 1
            },
            plusClicked: function(e) {
                if (!!Appersonam.CommonVariables) {
                    WebViewPlugin.openLink(null, null, JSON.stringify({
                        link: 'https://www.hype.it' + Appersonam.CommonVariables['myself'].plusUrl
                    }));
                }
            },
            initialize: function() {
                this.highlighted = 'movements';
                this.model.on('change', this.render, this);
            },
            prevent: function(event) {
                event.preventDefault();
                event.stopPropagation();
            },
            onSetMenu: function(data) {
                this.model.set(data, {
                    silent: true
                });
                this.render();
                this.onShow();
            },
            onSetSelected: function(target) {
                this.$el.find('.navigate').removeClass('active').addClass('inactive');
                this.$el.find('.' + target).removeClass('inactive').addClass('active');
            },
            onRender:function(){
                console.log();
            },
            onResetMenuItems: function(target) {
                this.$el.find('.navigate').removeClass('active').addClass('inactive');
            },
            onShow: function() {
                this.showPlus();
                this.initMenu();
                $('#action-blocker').on('click', function() {
                    Appersonam.NavigationApp.trigger('corner:menu');
                });
            },
            /* Menu carusel */
            wrapper: null,
            container: null,
            panes: null,
            initMenu: function() {
                this.wrapper = this.$el;
                this.container = this.$el.find(".main-menu-container");
                this.panes = this.container.find(".section");

                $('.main-menu').addClass("toggled");
                $('#main-menu').addClass('toggled');

                this.menuOptions.paneCount = this.panes.length;
                this.menuOptions.paneHeight = this.wrapper.height();

                //this.container.height(this.menuOptions.paneHeight * this.menuOptions.paneCount);
                //this.panes.height(this.wrapper.height());
            },
            /* Toggle */
            onToggleMenu: function() {
                $('.main-content').toggleClass('hide-content-android');
            },
            onCornerMenu: function() {
                $('input, textarea, select').blur();

                var menu = this.$el;
                menu.toggleClass('hidden-menu');
                if (menu.hasClass('hidden-menu')) {
                    /* Nascondo il menù */
                    this.onCornerMenuOut();
                } else {
                    /* Mostro il menù */
                    this.onCornerMenuIn();
                }
            },
            /*
            mostra menù
            */
            onCornerMenuIn: function() {
                $('#main-content').addClass('toggled-android');
                $('#action-blocker').addClass('active toggled-android');
                $('#main-menu').removeClass('toggled');
                $('.hype-logo').removeClass('moveout');
                $('.navigate').addClass('inactive');
                $('.active').removeClass('inactive');
            },
            onRender:function(){
                this.$el.find('#' + this.highlighted).addClass('active');
            },
            showPlus:function  () {
                if (!!this.model.get('isPlusCustomer')) {
                    $('#main-menu').addClass('plus');
                } else {
                    $('#main-menu').removeClass('plus');
                }   
            },
            /*
            nasconde menù
            */
            onCornerMenuOut: function() {
                $('#main-content').removeClass('toggled-android');
                $('#action-blocker').removeClass('active toggled-android');
                $('#main-menu').addClass('toggled');
                $('.hype-logo').addClass('moveout');
            },
            /* Navigation */
            navigate: function(event) {
                event.preventDefault();
                //event.stopPropagation();
                this.highlighted = $(event.currentTarget).attr('id');
                this.$el.find('.navigate').removeClass('active').removeClass('inactive');
                var navigationTrigger = $(event.currentTarget).data('navigationtrigger');
                var innerTrigger = $(event.currentTarget).data('innertrigger');
                var data = {
                    navigationTrigger: navigationTrigger,
                    innerTrigger: innerTrigger
                };
                $(event.currentTarget).addClass('active').removeClass('inactive');
                this.trigger('navigate', data);
            },
        });
    }, Handlebars);
    return Appersonam.NavigationApp.List.View;
});
