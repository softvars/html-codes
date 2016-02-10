define(["app",
        'templates',
        "moment",
        "waypoints",
        'backbone.hammer'
    ],
    function(Appersonam, JST, moment, waypoints, hammer) {
        Appersonam.module("MovementsApp.List.View", function(View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

            View.Layout = Marionette.Layout.extend({
                template: JST['assets/js/apps/activities/movements/list/templates/layout.html'],
                events: {
                    'click .cross a': 'closeDeals',
                    'click a.go': 'goToDeals'
                },
                showDeals: function() {
                    this.$el.find('.js-deals').css('marginTop', '-62px');
                    this.$el.find('.js-deals').show();
                    this.$el.find('.js-deals').animate({
                        marginTop: '10px'
                    });
                    Appersonam.CommonVariables.canShowDeals = false; //i deals non vanno più suggeriti dopo aver chiuso il banner
                },
                goToDeals: function(e) {
                    e.preventDefault();
                    Appersonam.trigger('reset:loading');
                    Appersonam.trigger('show:loading');
                    setTimeout(function() {
                        Appersonam.trigger('deals:list', true);
                        Appersonam.NavigationApp.trigger('set:selected', 'show-deals', 3);
                    }, 800);
                },
                closeDeals: function(e) {
                    if (e) {
                        e.preventDefault();
                    }
                    var that = this;
                    $('.js-deals').animate({
                        marginTop: '-62px'
                    });
                    setTimeout(function() {
                        $('.js-deals').hide();
                    }, '1000');
                },
                regions: {
                    entitiesRegion: "#entities-region",
                    loadingListRegion: "#loading-movements-list-region"
                },
                toggleClassToElement: function(action, elementSelector, className) {
                    if (action === 'add') {
                        this.$el.find(elementSelector).addClass(className);
                    } else if (action === 'remove') {
                        this.$el.find(elementSelector).removeClass(className);
                    } else {
                        this.$el.find(elementSelector).toggleClass(className);
                    }
                },
                onShow: function() {
                    var that = this;
                    var hammertime = new Hammer('.js-deals', {});
                    hammertime.on('swipeleft', function(e) {
                        that.$el.find('.js-deals').addClass('exit-left');
                        that.closeDeals();
                    });
                    var hammertime = new Hammer('.js-deals', {});
                    hammertime.on('swiperight', function(e) {
                        that.$el.find('.js-deals').addClass('exit-right');
                        that.closeDeals();
                    });
                }
            });

            var pullToRefresh = false;

            View.Entity = Marionette.ItemView.extend({
                className: 'wayPointTarget',
                events: {
                    "click": "showClicked",
                    "click .tag": "hashtag",
                },
                hashtag: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var that = this;
                    var value = $(e.currentTarget).html();
                    $("#movements-area").animate({
                            scrollTop: 0
                        },
                        function() {
                            if ($('.home-header').hasClass('minified')) {
                                $('.home-header').bind("webkitTransitionEnd", function() {
                                    that.trigger('hash:search', value);
                                    $('.home-header').unbind("webkitTransitionEnd");
                                });
                            } else {
                                that.trigger('hash:search', value);
                            }
                        });
                    $("#movements-area").animate();
                },
                initialize: function() {
                    var id = this.model.get('id');
                    $(this.el).addClass('class-' + id);
                    var that = this;
                    this.model.on('change', function() {
                        that.render();
                    });
                },
                showClicked: function(e) {
                    e.preventDefault();
                    //e.stopPropagation();
                    this.trigger("movements:show", this.model);
                }
            });

            var NoEntitiesView = Marionette.ItemView.extend({
                template: JST['assets/js/apps/activities/movements/list/templates/none.html'],
                tagName: "div",
                className: "empty-list",
                initialize: function() {
                    console.log();
                },
                onShow: function() {
                    var number = 1 + Math.floor(Math.random() * 2);
                    this.$el.find('.message').hide();
                    this.$el.find('.message_' + number).show();
                }
            });

            View.Entities = Marionette.CompositeView.extend({
                tagName: "div",
                className: "movements-container",
                template: JST['assets/js/apps/activities/movements/list/templates/list.html'],
                itemView: View.Entity,
                itemViewContainer: ".mov-list",
                events: {
                    'click .js-incomes': 'toggleIncomes',
                    'click .js-outcomes': 'toggleOutcomes',
                    'touchstart .mov-list': 'hideKeyboard',
                },
                hammerEvents: {
                    'dragdown .mov-list': 'showMenu',
                    'dragup .mov-list': 'hideMenu',
                    //'release .mov-list' : 'releasePullToRefresh',
                },
                hammerOptions: {
                    tap: true,
                    drag: true,
                    drag_lock_to_axis: true,
                    drag_block_vertical: false,
                    release: true,
                    swipe: true,
                    touch: true,
                },
                hideKeyboard: function() {
                    $('input, textarea, select').blur();
                },
                toggleIncomes: function(e) {
                    e.preventDefault();
                    var button = $(e.currentTarget);
                    if (button.hasClass('selected')) {
                        button.removeClass('selected');
                        this.display = this.display.replace('income', '');
                    } else {
                        button.addClass('selected');
                        this.display = this.display + 'income';
                    }
                    this.$el.find('.mov-list').empty();
                    for (var i = 0; i < this.collection.length; i++) {
                        var item = this.collection.at(i);
                        this.addChildView(item, null, null);
                    }
                },
                toggleOutcomes: function(e) {
                    e.preventDefault();
                    var button = $(e.currentTarget);
                    if (button.hasClass('selected')) {
                        button.removeClass('selected');
                        this.display = this.display.replace('outcome', '');
                    } else {
                        button.addClass('selected');
                        this.display = this.display + 'outcome';
                    }
                    this.$el.find('.mov-list').empty();
                    for (var i = 0; i < this.collection.length; i++) {
                        var item = this.collection.at(i);
                        this.addChildView(item, null, null);
                    }
                },
                setEmptyView: function(view) {
                    this.options.emptyView = view;
                },
                buildItemView: function(item, ItemView) {
                    //if (this.collection.length > 1) {
                    if ($.isEmptyObject(item.toJSON())) {
                        //var tpl = 'assets/js/apps/activities/movements/list/templates/none.html';
                        if (!this.searchMode) {
                            var emptyView = this.options.emptyView;
                        } else {
                            var emptyView = NoEntitiesView;
                        }
                        var view = new emptyView({
                            placeholderType: 'movements'
                        });
                        return view;
                    } else {
                        var tpl = 'assets/js/apps/activities/movements/list/templates/normal_list_item.html';
                        if (!item.get('id')) {
                            item.set({
                                id: item.cid
                            }, {
                                silent: true
                            });
                        }
                        var causal = (item.get('causal'));
                        var subType = '';
                        if (item.get('subType')) {
                            subType = item.get('subType').toLowerCase();
                        }

                        if (item.get('subType') === 'p2p') {
                            tpl = 'assets/js/apps/activities/movements/list/templates/p2p_list_item.html';
                        }
                        var view = new ItemView({
                            model: item,
                            template: JST[tpl]
                        });
                        return view;
                    }
                },
                initialize: function() {
                    if (this.collection.length > 0) {
                        this.lastMovementDate = this.collection.last().get('date');
                    }
                    this.currentIndex = 0;
                    this.wayPointsIndex = 0;
                    this.waiting = false;
                    this.display = 'incomeoutcome';
                    //this.listenTo(this.collection, "reset", this.appendHtml(collectionView, itemView, index));
                },
                onRender: function() {
                    $('.loading-contacts').hide();
                    if (this.currentIndex > 0 && this.waiting === false) {
                        this.setWaypoint();
                    }
                    var self = this;
                    setTimeout(function() {
                        try {
                            self.firstElement = self.$el.find('.class-' + self.collection.first().get('id'));
                            if (self.firstElement.length > 0) {
                                self.firstElementInitialOffset = self.firstElement.offset().top;
                            }

                        } catch (ex) {
                            LogDB.log('errore onrender in lista movimenti => ' + ex.message);
                        }
                    }, 800);
                },

                setWaiting: function(value) {
                    this.waiting = value;
                    if (value === true) { //se sto facendo una ricerca disabilito il waypoints precedente
                        $.waypoints('destroy');
                    }
                },

                onShow: function() {
                    if (this.collection.length > 0 && this.currentIndex === 0 && this.waiting === false) { //il primo setviewpoints va fatto onshow
                        this.setWaypoint();
                    }
                    if (this.model.get('search') === true) {
                        this.$el.find('.resume-container').show();
                    } else {
                        this.$el.find('.resume-container').hide();
                    }
                    $('input, textarea, select').blur();

                    //ga('send', 'pageview', {
                    //    'page': '/movements',
                    //    'title': 'Movements List'
                    //});

                },
                setWaypoint: function() {
                    if (this.waiting === false) {
                        var self = this;
                        var length = this.collection.length;
                        if (length >= 20) {
                            var id = this.collection.at(this.wayPointsIndex).get('id');
                            console.log('setto waypoints sull oggetto: ' + this.collection.at(this.wayPointsIndex).get('causal') + ' con uniqueId ' + id);
                            this.wayPointsIndex += 16;
                            //if (self.waypointsArray.get(id) === undefined) {
                            //self.waypointsArray.add(new Backbone.Model({ id: id, done: true }));
                            $.waypoints('destroy');

                            $('.class-' + id).waypoint({
                                context: '.activities-container',
                                continuous: false,
                                triggerOnce: true, //autodistruzione
                                handler: function(direction) {
                                    //self.waypointsArray.remove(self.waypointsArray.get(id));
                                    if (direction === 'down') {
                                        self.next();
                                    }
                                }
                            });
                        }
                    }
                },
                hideMenu: function() {
                    if (!$('.home-header').hasClass('minified')) {
                        //console.log('hide');
                        if ($('#activities-navigation-region').hasClass('rotate')) {
                            Appersonam.ActivitiesApp.trigger('toggle:sts');
                            setTimeout(function() {
                                $('.home-header').addClass('minified');
                                $('#activities-navigation-region > .navigator').addClass('minified');
                            }, 500);
                        } else {
                            Appersonam.ActivitiesApp.trigger('toggle:sts');
                            $('.home-header').addClass('minified');
                            $('#activities-navigation-region > .navigator').addClass('minified');
                        }
                    }
                },
                showMenu: function(e) {
                    var self = this;
                    if ($('.home-header').hasClass('minified')) {
                        $('.home-header').removeClass('minified');
                        $('#activities-navigation-region > .navigator').removeClass('minified');
                    }
                    self.firstElement = self.$el.find('.class-' + self.collection.first().get('id'));
                    if (self.firstElement && self.firstElement.offset() !== null) {
                        if ((100 + self.firstElement.offset().top) > this.firstElementInitialOffset && this.waiting !== true) {
                            console.log('refresh!');
                            $('#activities-navigation-region li.movements > a').click();
                            this.waiting = true;
                        }
                    }
                    // si richiama la seconda funzione del dragdown
                    //this.dragdownPullToRefresh(e);
                },
                next: function() {
                    if (this.waiting === false) { //con questo flag impedisco che vengano effetuate più chiamate per volta
                        this.lastMovementDate = this.collection.last().get('date');
                        this.waiting = true;
                        this.currentIndex += 20;
                        this.trigger('next', this.currentIndex, this.lastMovementDate);
                    }
                },
                releasePullToRefresh: function(e) {
                    // si aggiorna la lista solo dopo un pull
                    if (pullToRefresh === true) {
                        pullToRefresh = false;

                        // si chiama il reload
                        this.trigger('refresh');

                        // rimuovi lo spazio
                        $(e.currentTarget).attr('style', '');
                        $('.resume-container').attr('style', 'display:block;');
                    }
                },
                dragdownPullToRefresh: function(e) {
                    var container = $(e.currentTarget);
                    if (container.scrollY > 5) {
                        // si disabilita nuovamente il pull to refresh
                        pullToRefresh = false;
                        return;
                    }

                    pullToRefresh = true;
                    e.preventDefault();


                    container.attr('style', 'transform: translate3d(0px, ' + e.gesture.deltaY + 'px, 0px); -webkit-transform: translate3d(0px, ' + e.gesture.deltaY + 'px, 0px) scale3d(1, 1, 1);');


                },
                appendHtml: function(collectionView, itemView, index) {
                    if (!itemView.model) {
                        this.$el.find(this.itemViewContainer).append(itemView.$el);
                    } else {
                        var formattedPrevDate = moment(this.currentDate).format('DD MMM YYYY');
                        var formattedNewDate = moment(itemView.model.get('date')).format('DD MMM YYYY');

                        if (this.display.indexOf(itemView.model.get('type')) > -1 || itemView.model.get('loading') === true) { // serve per lo show e hide del risultato ricerca
                            if (!this.currentDate || (formattedPrevDate !== formattedNewDate && this.collection.length > 0 && itemView.model.id !== 'loading')) {
                                this.currentDate = itemView.model.get('date');
                                var date = new moment(this.currentDate).calendar();
                                this.$el.find(this.itemViewContainer).append('<div class="main-list-item-date">' + date + '');
                            }
                            this.$el.find(this.itemViewContainer).append(itemView.$el);
                        }
                    }
                },
            });
        }, Handlebars);
        return Appersonam.MovementsApp.List.View;
    });
