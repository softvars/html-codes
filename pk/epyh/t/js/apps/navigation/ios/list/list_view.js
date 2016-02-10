define(["app",
    'templates',
    'backbone.hammer'
], function(Appersonam, JST, hammer) {

    Appersonam.module("NavigationApp.List.View", function(View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.UserDataView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/navigation/android/list/templates/userdata.html'],
            className: "menu-user-profile",
            onRender: function() {

            }
        });

        View.MenuItemsView = Marionette.Layout.extend({
            template: JST['assets/js/apps/navigation/ios/list/templates/list.html'],
            className: "main-menu-wrapper ios hidden-menu",
            events: {
                'tap a.toggle-menu': 'toggleMenu',
                'tap a.navigate.inactive': 'navigate',
                'tap a.navigate.active': 'onCornerMenu',
                'tap p.menu-title': 'menuTitleClicked',
                'tap .js-plus': 'plusClicked'
            },
            plusClicked: function(e) {
                if (!!Appersonam.CommonVariables) {
                    WebViewPlugin.openLink(null, null, JSON.stringify({
                        link: 'https://www.hype.it' + Appersonam.CommonVariables['myself'].plusUrl
                    }));
                }
            },
            menuTitleClicked: function(e) {
                e.preventDefault();
                var currentMenu = this.$el.find('.section.active').first();
                var currentIndex = currentMenu.attr('data-group');
                var destinationIndex = parseInt($(e.currentTarget).parent().parent().attr('data-group'));
                if (currentIndex < destinationIndex) {
                    this.gotoPrevPane();
                } else if (currentIndex > destinationIndex) {
                    this.gotoNextPane();
                }
            },
            onSetMenu: function(data) {
                //non posso usare il render della view perché spariscono le voci del menù
                //this.model.set(data, { silent: false }); 
                var currentlySelected = this.$el.find('.navigate.active');
                /*this.model.set({
                    deals: data.deals,
                    wallet: data.wallet
                }, {
                    silent: true
                });*/
                this.model.set(data, {
                    silent: true
                });
                this.render();
                this.onShow();
                this.trigger('show');
                this.$el.find('.active').removeClass('active').addClass('inactive');
                if ($(currentlySelected).data('innertrigger') === 'goals:list') {
                    this.$el.find('.goals').addClass('active').removeClass('inactive');
                } else {
                    this.$el.find('.movements').addClass('active').removeClass('inactive');
                }
                //if (data.deals) {
                //    this.$el.find('.js-deals').removeClass('hidden');
                //}
            },
            regions: {
                userDataRegion: '#userdata-region',
                navigationRegion: "#menu-navigation-region"
            },
            hammerEvents: {
                'dragup': 'handleVerticalDrag',
                'dragdown': 'handleVerticalDrag',
                'dragleft': 'handleHorizontalDrag',
                'dragright': 'handleHorizontalDrag',
                'swipedown': 'handleSwipeDown',
                'swipeup': 'handleSwipeUp',
                'release': 'handleRelease',
                //'tap': 'handleTap',
                /* Main Content */
                'swipeleft': 'handleSwipeLeft',
            },
            hammerOptions: {
                tap: true,
                drag: true,
                drag_lock_to_axis: true,
                drag_block_vertical: true,
                release: true,
                swipe: true,
                touch: true,
            },
            menuOptions: {
                paneHeight: 0,
                paneCount: 0,
                currentPane: 0,
                acceleration: 1
            },
            initialize: function() {
                this.highlighted = 'movements';
                this.model.on('change', this.render, this);
            },
            prevent: function(event) {
                event.preventDefault();
                event.stopPropagation();
            },
            onResetMenuItems: function(target) {
                this.$el.find('.navigate').removeClass('active').addClass('inactive');
            },
            onRender: function() {
                this.$el.find('#' + this.highlighted).addClass('active');
            },
            showPlus: function() {
                if (!!this.model.get('isPlusCustomer')) {
                    $('#main-menu').addClass('plus'); //utente plus
                } else {
                    $('#main-menu').removeClass('plus'); //utente base o yoox
                }
            },
            onShow: function() {
                this.showPlus();
                this.initMenu();
                $('#action-blocker').unbind();
                $('#action-blocker').bind('click', function() {
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

                this.menuOptions.paneCount = this.panes.length;
                this.menuOptions.paneHeight = this.wrapper.height();

                this.container.height(this.menuOptions.paneHeight * this.menuOptions.paneCount);
                this.panes.height(this.wrapper.height());
            },
            handleVerticalDrag: function(event) {
                event.preventDefault();
                event.gesture.preventDefault();

                var deltaY = event.gesture.deltaY * this.menuOptions.acceleration;
                var paneOffset = -(100 / this.menuOptions.paneCount) * this.menuOptions.currentPane;
                var dragOffset = ((100 / this.menuOptions.paneHeight) * deltaY) / this.menuOptions.paneCount;

                // slow down at the first and last pane
                if ((this.menuOptions.currentPane == 0 && event.gesture.direction == "down") ||
                    (this.menuOptions.currentPane == this.menuOptions.paneCount - 1 && event.gesture.direction == "up")) {
                    dragOffset *= .4;
                }

                this.setContainerOffset(dragOffset + paneOffset, false, event.gesture.direction);
            },
            handleHorizontalDrag: function(event) {
                event.preventDefault();
                event.gesture.preventDefault();

                var deltaY = event.gesture.deltaY * this.menuOptions.acceleration;
                var paneOffset = -(100 / this.menuOptions.paneCount) * this.menuOptions.currentPane;
                var dragOffset = ((100 / this.menuOptions.paneHeight) * deltaY) / this.menuOptions.paneCount;

                // slow down at the first and last pane
                if ((this.menuOptions.currentPane == 0 && event.gesture.direction == "down") ||
                    (this.menuOptions.currentPane == this.menuOptions.paneCount - 1 && event.gesture.direction == "up")) {
                    dragOffset *= .4;
                }

                this.setContainerOffset(dragOffset + paneOffset, false, event.gesture.direction);
            },
            handleSwipeUp: function(event) {
                event.preventDefault();
                event.gesture.preventDefault();
                event.gesture.stopDetect();
                this.gotoPrevPane();
            },
            handleSwipeDown: function(event) {
                event.preventDefault();
                event.gesture.preventDefault();
                event.gesture.stopDetect();
                this.gotoNextPane();
            },
            handleRelease: function(event) {
                event.preventDefault();
                event.gesture.preventDefault();
                var deltaY = event.gesture.deltaY * this.menuOptions.acceleration;

                if (Math.abs(deltaY) > this.menuOptions.paneHeight / 2) {
                    if (event.gesture.direction == 'up') {
                        this.gotoPrevPane();
                    } else {
                        this.gotoNextPane();
                    }
                } else {
                    this.showPane(this.menuOptions.currentPane, true);
                }
            },
            setContainerOffset: function(percent, animate, direction) {
                var container = this.$el.find(".main-menu-container");
                var activeSection = container.find(".section.active");
                var nextSection = activeSection.next();

                container.removeClass("animate");
                nextSection.find(".menu-title").removeClass("animate");
                activeSection.find(".menu-title").removeClass("animate");

                if (animate) {
                    container.addClass("animate");
                    nextSection.find(".menu-title").addClass("animate");
                    activeSection.find(".menu-title").addClass("animate");
                }
                container.css("transform", "translate3d(0," + percent + "%,0)");

                /* Active section next title */
                var globalPosition = (container.height() * (percent / 100)).toFixed(2);
                var panelPosition = (Math.abs((globalPosition / this.wrapper.height()) % 1)).toFixed(2);

                if (direction == "down") {
                    panelPosition = 1 - panelPosition;
                }

                var activeTranslate, activeScale, nextTranslate, nextScale;
                var totalTransationValue = 250;

                activeTranslate = -totalTransationValue * (panelPosition);
                activeScale = 1 - (0.4 * panelPosition);
                activeSection.find(".menu-title").css("transform", "translate3d(0," + activeTranslate + "px,0)");
                //activeSection.find(".menu-title").css("transform", "translate3d(0," + activeTranslate + "px,0) scale3d(" + activeScale + "," + activeScale + ",1)");

                nextTranslate = -totalTransationValue * (1 - panelPosition);
                nextScale = 0.6 + (0.4 * panelPosition);
                nextSection.find(".menu-title").css("transform", "translate3d(0," + nextTranslate + "px,0)");
                //nextSection.find(".menu-title").css("transform", "translate3d(0," + nextTranslate + "px,0) scale3d(" + nextScale + "," + nextScale + ",1)");

            },
            gotoNextPane: function() {
                return this.showPane(this.menuOptions.currentPane - 1, true);
            },
            gotoPrevPane: function() {
                return this.showPane(this.menuOptions.currentPane + 1, true);
            },
            showPane: function(index, animate) {
                index = Math.max(0, Math.min(index, this.menuOptions.paneCount - 1));
                this.menuOptions.currentPane = index;

                this.panes.removeClass("active");
                $(this.panes.get(index)).addClass("active");

                var offset = -((100 / this.menuOptions.paneCount) * this.menuOptions.currentPane);
                this.setContainerOffset(offset, animate);

                this.$el.attr("class", this.$el.attr("class").replace(/\bcurrentPanel.*?\b/g, ''));
                this.$el.addClass("currentPanel" + this.menuOptions.currentPane);
            },
            /* Toggle */
            onToggleMenu: function() {
                $('.main-content').toggleClass('hide-content');
            },
            onSetSelected: function(target, index) {
                this.$el.find('.navigate').removeClass('active').addClass('inactive');
                $('.' + target).removeClass('inactive').addClass('active');
                if (index) {
                    return this.showPane(index, true);
                }
            },
            /*
            mostra menù
            */
            onCornerMenuIn: function() {
                $('#main-content').addClass('toggled');
                $('#action-blocker').addClass('active toggled');
                $('#main-menu').removeClass('toggled');
                $('.hype-logo').removeClass('moveout');
                $('.navigate').addClass('inactive');
                $('.active').removeClass('inactive');
            },
            /*
            nasconde menù
            */
            onCornerMenuOut: function() {
                $('#main-content').removeClass('toggled');
                $('#action-blocker').removeClass('active toggled');
                $('#main-menu').addClass('toggled');
                $('.hype-logo').addClass('moveout');
            },
            onCornerMenu: function() {
                var menu = this.$el;
                $('input, textarea, select').blur();

                menu.toggleClass('hidden-menu');
                if (menu.hasClass('hidden-menu')) {
                    /* Menu nascosto */
                    this.onCornerMenuOut();
                } else {
                    /* Menu visibile */
                    this.onCornerMenuIn();
                }
            },
            handleSwipeLeft: function(event) {
                console.log(event);
                event.gesture.stopDetect();
                this.onCornerMenu();
            },
            /* Navigation */
            navigate: function(event) {
                event.preventDefault();
                //event.stopPropagation();
                this.$el.find('.navigate').removeClass('active').removeClass('inactive');
                var navigationTrigger = $(event.currentTarget).data('navigationtrigger');
                var innerTrigger = $(event.currentTarget).data('innertrigger');
                var data = {
                    navigationTrigger: navigationTrigger,
                    innerTrigger: innerTrigger
                };
                $(event.currentTarget).addClass('active').removeClass('inactive');
                this.trigger('navigate', data);
                this.highlighted = $(event.currentTarget).attr('id');
            },
        });
    }, Handlebars);
    return Appersonam.NavigationApp.List.View;
});
