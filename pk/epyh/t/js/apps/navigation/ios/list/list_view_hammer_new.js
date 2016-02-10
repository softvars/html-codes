define(["app",
    'templates',
    'hammer'
], function(Appersonam, JST, Hammer) {

    Appersonam.module("NavigationApp.List.View", function(View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        View.MenuItemsView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/navigation/ios/list/templates/list.html'],
            className: "main-menu-wrapper ios hidden-menu",
            itemView: View.MenuItemView,
            events: {
                'click a.toggle-menu': 'toggleMenu',
                'click a.navigate.inactive': 'navigate',
                'click a.navigate.active': 'onCornerMenu',
            },
            menuOptions: {
                paneHeight: 0,
                paneCount: 0,
                currentPane: 0,
                acceleration: 1
            },
            initialize: function() {

            },
            prevent: function(event) {
                event.preventDefault();
                event.stopPropagation();
            },
            onShow: function() {
                this.initMenu();

                $('#action-blocker').bind('click', function() {
                    Appersonam.NavigationApp.trigger('corner:menu');
                });
            },
            /* Menu carusel */
            wrapper: null,
            container: null,
            panes: null,
            currentIndex: 0,
            initMenu: function() {
                this.wrapper = this.$el;
                this.container = this.$el.find(".main-menu-container");
                this.panes = this.container.find(".section");

                $('.main-menu').addClass("toggled");

                this.menuOptions.paneCount = this.panes.length;
                this.menuOptions.paneHeight = this.wrapper.height();

                //this.container.height(this.menuOptions.paneHeight * this.menuOptions.paneCount);
                this.panes.height(this.wrapper.height());
                this.hammerManager = new Hammer.Manager(this.container.get(0));
                this.hammerManager.add(new Hammer.Pan({
                    direction: Hammer.DIRECTION_ALL,
                    threshold: 0
                }));
                this.hammerManager.on("panstart panmove panend pancancel", Hammer.bindFn(this.handlePan, this));
                this.showPane(this.currentIndex);
            },
            handlePan: function(event) {
                console.log(event);
                var delta = event.deltaY;
                var percent = (100 / this.container.height()) * delta;
                var animate = false;

                if (event.type == 'panend' || event.type == 'pancancel') {
                    if (Math.abs(percent) > 20 && event.type == 'panend') {
                        if (percent < 0) {
                            this.currentIndex += 1;
                        } else {
                            this.currentIndex += -1;
                        }
                    }
                    percent = 0;
                    animate = true;
                }
                this.showPane(this.currentIndex, percent, animate);

            },
            showPane: function(showIndex, percent, animate) {
                console.log(percent);

                showIndex = Math.max(0, Math.min(showIndex, this.panes.length - 1));
                //this.menuOptions.currentPane = index;
                percent = percent || 0;
                var container = this.$el.find(".main-menu-container");
                var activeSection = container.find(".section.active");
                var nextSection = activeSection.next();

                container.removeClass("animate");
                nextSection.find(".menu-title").removeClass("animate");
                activeSection.find(".menu-title").removeClass("animate");

                this.panes.removeClass("active");
                $(this.panes.get(showIndex)).addClass("active");

                if (animate) {
                    container.addClass("animate");
                    nextSection.find(".menu-title").addClass("animate");
                    activeSection.find(".menu-title").addClass("animate");
                }

                var paneIndex, pos, translate;
                for (paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
                    pos = (this.wrapper.height() / 100) * (((paneIndex - showIndex) * 100) + percent);
                    this.panes[paneIndex].style.webkitTransform = 'translate3d(0,' + pos + 'px, 0)';
                }

                /* Active section next title */
                var globalPosition = (container.height() * showIndex) + (container.height() * (percent / 100));
                var panelPosition = Math.abs(percent / 100);

                if (percent != 0) {
                    var totalTransationValue = 250;
                    var activeTranslate = -totalTransationValue * panelPosition;
                    var nextTranslate = -totalTransationValue * (1 - panelPosition);

                    activeSection.find(".menu-title").css("transform", "translate3d(0," + activeTranslate + "px,0)");
                    nextSection.find(".menu-title").css("transform", "translate3d(0," + nextTranslate + "px,0)");
                } else {
                    activeSection.find(".menu-title").removeAttr('style');
                    nextSection.find(".menu-title").removeAttr('style');
                }
                this.currentIndex = showIndex;
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
            onToggleMenuPan: function(percent, animate) {
                /* Active section next title */
                var translate = 70 * (percent / 100);
                var rotation = 45 * (percent / 100);

                $('#main-content').removeClass("animate");
                if (animate) {
                    $('#main-content').addClass("animate");
                }
                $('#main-content').css("transform", 'translateX(' + translate + '%) rotateY(' + rotation + 'deg)');
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
            },
        });
    }, Handlebars);
    return Appersonam.NavigationApp.List.View;
});