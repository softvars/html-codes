define(["app",
    'templates'
], function (Appersonam, JST) {

    Appersonam.module("ActivitiesApp.List.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        View.Layout = Marionette.Layout.extend({
            template: JST['assets/js/apps/activities/navigation/list/templates/layout.html'],
            className: 'activities-panel',
            regions: {
                activitiesRegion: "#activities-navigation-region",
                stsRegion: "#safetospend-region",
                movementsAreaRegion: "#movements-area",
                goalsAreaRegion: "#goals-area",
                searchAreaRegion: "#search-area"
            },
            addCaching: function () {
                this.$el.find('.home-header').addClass('loading');
            },
            removeCaching: function () {
                var self = this;
                setTimeout(function () {
                    self.$el.find('.home-header').removeClass('loading');
                }, 200);
            },
            toggleCaching: function () {
                this.$el.find('.home-header').toggleClass('loading');

            },
            switchArea: function (name) {
                this.$el.find('.activities-wrapper').removeClass('show-movements').removeClass('show-goals').addClass('show-' + name);
            },
            showRegion: function (view, regionName) {
                var region = this.regionManager.get(regionName + 'AreaRegion');
                if (!region) { //se sto tornando da una view a tutto schermo la region 'childRegion' potrebbe non esistere
                    Appersonam.primaryContentRegion.show(this); //rifaccio lo show del menù di navigazione interna per ripristinare la region mancante
                    region = this.regionManager.get(regionName); //tutto questo potrebbe subire modifiche in quanto la navigazione forse avverrà tramite view affiancate, che non si sostituiscono una all'altra
                }
                region.show(view);
                this.$el.find('.activities-wrapper').removeClass('show-movements').removeClass('show-goals').addClass('show-' + regionName);
            },
            refreshRegion: function (view, regionName) {
                var region = this.regionManager.get(regionName + 'AreaRegion');
                if (region) {
                    region.show(view);
                }
            },
            events: {
                'click a.js-transfer-money': 'displayTransferMenu',
                //'touchstart .activities-container': 'onTouchStart',
                //'touchend .activities-container': 'onTouchEnd',
                //'touchmove .activities-container': 'onTouchMove'
            },
            displayTransferMenu: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (!$(e.currentTarget).hasClass('disabled')) {
                    $(e.currentTarget).addClass('disabled');//disabilito il pulsante per evitare che cliccando velocemente si rompa l'app
                    this.trigger('transfer:menu');
                }
            },
            enableTransfer: function () {
                this.$el.find('.js-transfer-money').removeClass('disabled');
            },
            disableTransfer: function () {
                this.$el.find('.js-transfer-money').addClass('disabled');
            },
            toggleBlur: function () {
                //this.$el.find('.activities-container').toggleClass('blurred-element');
                //this.$el.find('#activities-region').toggleClass('blurred-element');
                this.$el.parent().toggleClass('blurred-element');
            },
            lastY: 0,
            onTouchMove: function (e) {
                var currentY = e.originalEvent.targetTouches[0].clientY;
                var delta = currentY - this.lastY;

                console.log(delta);

                if (this.lastY) {
                    if (delta > 0) {
                        this.$el.find(".home-header").removeClass("minified");
                    } else {
                        this.$el.find(".home-header").addClass("minified");
                    }
                }

                this.lastY = currentY;

            },
            onTouchStart: function (e) {

                var currentY = e.originalEvent.changedTouches[0].clientY;
                this.lastY = currentY;
                console.log(currentY);
            },
            onTouchEnd: function (e) {
                //$(".activities-container").offset();
                //var currentY = e.originalEvent.changedTouches[0].clientY;
                //var delta = currentY - this.lastY;
                var delta = $(".activities-container > div").offset().top;
                console.log(delta);
                if (delta < 0) {
                    this.$el.find(".home-header").addClass("minified");
                } else {
                    this.$el.find(".home-header").removeClass("minified");
                }


            }
        });

        View.StsPanel = Marionette.ItemView.extend({
            template: JST['assets/js/apps/activities/navigation/list/templates/stsPanel.html'],
            className: "safe-to-spend-block",
            events: {
                'click .safe-to-spend': 'toggle',
                'click a.toggle-menu': 'cornerMenu'
            },

            toggleBlur: function () {
                this.$el.toggleClass('blurred-element');
            },
            toggle: function (e) {
                var self = this;
                var isMinified = $('.home-header').hasClass('minified');
                if ((e || (!e && this.stsExpanded === true)) && isMinified === false) {
                    if (e) {
                        e.preventDefault();
                    }
                    if ($('.home-header').hasClass('searching')) {
                        $('#search-area .search-area').bind("webkitTransitionEnd", function () {
                            self.toggleSafeToSpend();
                            $('#search-area .search-area').unbind("webkitTransitionEnd");
                        });
                        $('.home-header').removeClass('searching');
                    } else {
                        self.toggleSafeToSpend();
                    }
                }
            },
            toggleSafeToSpend: function () {
                var accRev = this.$el.find('.bank-account-review');
                accRev.toggleClass('rotate');

                var navigation = this.$el.parent().siblings('#activities-navigation-region');
                navigation.toggleClass('rotate');

                this.stsExpanded = !this.stsExpanded;

                var dropdown = this.$el.find('.dropdown');
                dropdown.toggleClass('rotate');
            },
            cornerMenu: function (e) {
                e.preventDefault();
                //e.stopPropagation(); questo inibiva il settimeout sull'evento click
                this.trigger('corner:menu');
            },
            initialize: function () {
                this.model.on('change', this.render, this);
                this.stsExpanded = false;
            },
            onClose: function () { }
        });

        var NoItemsView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/activities/navigation/list/templates/none.html'],
            tagName: "div",
            className: "alert"
        });

        View.ActivityItemView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/activities/navigation/list/templates/list_item.html'],
            tagName: "li",
            //className: 'firstTime',
            events: {
                "click": "navigate"
            },
            onShow: function () {
                var className = this.model.get('activityTrigger').split(':')[0];
                this.$el.addClass(className);
                this.$el.addClass(this.model.get('className')); //active o inactive
            },
            navigate: function (e) {
                e.preventDefault();
                e.stopPropagation();
                var trigger = this.model.get('activityTrigger').split(':')[0];
                var isActive = $(e.currentTarget).hasClass('active');
                var firstTime = $(e.currentTarget).hasClass('firstTime');
                this.trigger("navigate", this.model, isActive, firstTime);
                if (firstTime) {
                    $(e.currentTarget).removeClass('firstTime');
                }
            }
        });

        View.ActivityItemsView = Marionette.CompositeView.extend({
            template: JST['assets/js/apps/activities/navigation/list/templates/list.html'],
            emptyView: NoItemsView,
            itemView: View.ActivityItemView,
            itemViewContainer: "ul",
            className: "navigator",
            events: {
                'click a.js-toggle-search': 'toggleSearch',
            },
            initialize: function () {
                this.listenTo(this.collection, "reset", function () {
                    this.appendHtml = function (collectionView, itemView, index) {
                        collectionView.$el.append(itemView.el);
                    }
                });
                this.on('itemview:navigate', function (itemView, itemViewModel, isActive, firstTime) {
                    //$('.home-header').removeClass('minified');
                    if (isActive === true || firstTime === true) {
                        this.trigger('navigate', itemViewModel, isActive);
                    } else {
                        this.trigger('switchArea', itemViewModel.get('activityTrigger'));
                        this.setActive(itemViewModel.get('activityTrigger').replace(':list', ''));
                    }

                }, this);
            },
            setActive: function (className) {
                this.$el.find('li.active').removeClass('active').addClass('inactive');
                this.$el.find('.' + className).addClass('active').removeClass('inactive');
            },
            toggleSearch: function () {
                $(".home-header").addClass("searching");
                $('.search-container > input').focus();
            },
            //activateNavigation: function (allowNavigation) {
            //    this.allowNavigation = allowNavigation;
            //}
        });

        View.TransferMenu = Marionette.CompositeView.extend({
            template: JST['assets/js/apps/activities/navigation/list/templates/transfer_menu.html'],
            className: 'transfer-menu',
            events: {
                'click a.js-send-request': 'transferClicked',
                'click .js-close': 'closeClicked',
            },
            transferClicked: function (e) {
                e.preventDefault();
                e.stopPropagation();
                var action = $(e.currentTarget).data('action');
                this.trigger('payment', action);
            },
            closeClicked: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('close:overlay');
            }
        });

        View.SearchView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/activities/navigation/list/templates/search.html'],
            className: 'search-area',
            events: {
                'keyup input': 'onKeyUp',
                'input input': 'onKeyUp',
                'click .js-close-search': 'onCloseClick'
            },
            onKeyUp: function (e) {
                var self = this;
                clearTimeout(this.typingTimer);
                var keyCode = e.keyCode;
                var value = $(e.currentTarget).val();

                if (keyCode === 13) {
                    e.preventDefault();
                    $('input, textarea, select').blur();//perde focus su input
                    self.triggerSearch(value);
                }
                else {
                    this.typingTimer = setTimeout(function () {
                        if (value.length == 0 || value.length >= 3) {
                            self.triggerSearch(value);
                        }
                    }, 1100);
                }
            },

            triggerSearch: function (query) {
                this.trigger('search', query);
                $('.loading-contacts').show();
            },

            hashSearch: function (query) {
                this.$el.find('input').val(query.replace('#', ''));
                $('.js-toggle-search').click();
                this.triggerSearch(query.replace('#', ''));
            },
            clearSearch: function () {
                if ($(".home-header").hasClass("searching")) {
                    $(".home-header").removeClass("searching");

                    if (this.$el.find("input").val() !== "") {
                        this.$el.find("input").val("");
                        this.trigger('search', "");
                    }

                }
            },
            onCloseClick: function () {
                this.clearSearch();
                this.$el.find('.loading-contacts').hide();
                $('.search-container > input').blur();
            },

        });

    }, Handlebars);

    return Appersonam.ActivitiesApp.List.View;
});