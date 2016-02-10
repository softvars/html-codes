define(["app",
        'templates'
    ],

    function(Appersonam, JST, moment) {
        Appersonam.module("CardApp.Show.Views", function(Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {
            Views.CardView = Marionette.Layout.extend({
                template: JST['assets/js/apps/card/show/templates/show.html'],
                className: 'card-view',
                events: {
                    'click .js-request': 'requestClicked',
                    'click .js-activate': 'activateClicked',
                    'click .js-plus': 'plusClicked',
                    'click .js-toggle-menu': 'cornerMenu',
                    'click .turn-card': 'toggleCard',
                    'click .js-locked': 'preventAction',
                    'click .js-switch': 'switchClicked'
                },
                preventAction: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                },
                onUpdateSwitches: function(data) {
                    var anyActive = false;
                    var isOnlyVirtual = false;

                    for (var k in data) {
                        this.$el.find('.hype-toggle.' + k).removeClass('pause').removeClass('play').removeClass('spinner').addClass(data[k] ? 'play' : 'pause');
                        var $minSwitchWrapper = this.$el.find('#min-switches-wrapper .' + k + ':not(.hype-toggle)');

                        //important: don't remove the :visible pseudo-selector otherwise the isOnlyVirtual control won't pass
                        var $minSwitchPadlock = $minSwitchWrapper.find('.icon-locked:visible,.icon-unlocked:visible');
                        var $minSwitchSubText = $minSwitchWrapper.find('.locked-text');

                        if ($minSwitchPadlock.length > 0) {
                            $minSwitchPadlock.removeClass('icon-locked').removeClass('icon-unlocked').addClass(data[k] ? 'icon-unlocked' : 'icon-locked');
                            $minSwitchSubText.removeClass('locked').removeClass('unlocked').addClass(data[k] ? 'unlocked' : 'locked');
                        } else {
                            isOnlyVirtual = true;
                        }
                        anyActive = anyActive || data[k];
                    }

                    if (isOnlyVirtual) {
                        anyActive = data.operativitaECOMMERCE;
                    }

                    this.$el.find('.operativitaATM.operativitaPOS.operativitaECOMMERCE').removeClass('pause').removeClass('play').removeClass('spinner').addClass(anyActive ? 'play' : 'pause');
                    this.$el.find('.caption .play,.caption .pause').removeClass('hidden');
                    this.$el.find('.caption .' + (anyActive ? 'pause' : 'play')).addClass('hidden');
                },
                operativitiesMap: {
                    'atm': 'operativitaATM',
                    'web': 'operativitaECOMMERCE',
                    'pos': 'operativitaPOS'
                },
                switchClicked: function(e) {
                    e.preventDefault();
                    if (this.$el.find('.spinner').length < 1) {
                        e.stopPropagation();
                        var oldData = this.model.toJSON();
                        var currentTarget = $(e.currentTarget);
                        var valueToSet = !(currentTarget.hasClass('play')); //se ha la classe deactivate, significa che voglio DISATTIVARE, quindi devo impostare a false

                        if (currentTarget.hasClass('play')) {
                            currentTarget.removeClass('play').addClass('pause');
                        } else if (currentTarget.hasClass('pause')) {
                            currentTarget.removeClass('pause').addClass('play');
                        }
                        currentTarget.addClass('spinner');
                        var switchTarget = currentTarget.data('target');
                        if (switchTarget === 'all') {
                            var cardStatus = this.model.get('cardStatus');
                            if (cardStatus === '5' || cardStatus === '4') { //se la carta è fisica, attivo e disattivo tutti e tre
                                this.model.set({
                                    operativitaATM: valueToSet,
                                    operativitaECOMMERCE: valueToSet,
                                    operativitaPOS: valueToSet
                                }, {
                                    silent: true
                                });
                            } else { //altrimenti, se la carta è virtuale, attivo e disattivo solo il web
                                this.model.set({
                                    operativitaECOMMERCE: valueToSet
                                }, {
                                    silent: true
                                });
                            }
                        } else {
                            var propertyToSet = this.operativitiesMap[switchTarget];
                            this.model.set(propertyToSet, valueToSet, {
                                silent: true
                            });
                        }
                        this.trigger('card:operativity', this.model, oldData);
                    }
                },
                onClose: function() {
                    console.log('onclose');
                },
                initialize: function() {
                    var level = parseFloat(this.model.get('level'));
                    if (this.model.get('pan')) {
                        var initialPan = this.model.get('pan').substring(0, 4);
                        this.model.set({
                            initialPan: initialPan
                        });
                    }
                    var yearLimit = Number(this.model.get('levelYear'));
                    var isPlus = false;
                    if (yearLimit > 10000) {
                        isPlus = true;
                    }
                    this.model.set('isPlus', isPlus);

                    //var prova = this.model.get('isPlus');
                    var anyFunctionalities = (this.model.get('operativitaPOS') === true || this.model.get('operativitaECOMMERCE') === true || this.model.get('operativitaATM') === true);
                    this.model.set({
                        anyFunctionalities: anyFunctionalities
                    }, {
                        silent: true
                    });

                    var percentage = (100 * (level / yearLimit)).toFixed(0);
                    this.model.set({
                        percentage: percentage
                    });
                    this.model.on('change', function() {
                        this.render();
                    }, this);
                },
                onShow: function() {
                    try {
                        
                    } catch (e) {

                    }
                },
                onRender: function() {
                    var status = this.model.get("cardStatus");
                    var container = this.$el.find("#card-action-container");
                    var $switchesWrapper = this.$el.find("#card-toggles-wrapper");
                    container.removeClass();

                    if (status === '') {
                        container.addClass("show-request");
                    } else if (parseInt(status) <= 3 && parseInt(status) >= 0) {
                        container.addClass("show-activate");
                    } else if (status === '5' || status === '4') {
                        container.addClass("show-active");
                        $switchesWrapper.addClass("show-active");
                    } else if (status === '6' || status === '7') {
                        container.addClass("show-locked");
                    }
                },
                activateClicked: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('card:activate:card', this.model);

                },
                plusClicked: function(e) {
                    if (!!Appersonam.CommonVariables) {
                        WebViewPlugin.openLink(null, null, JSON.stringify({
                            link: 'https://www.hype.it' + Appersonam.CommonVariables['myself'].plusUrl
                        }));
                    }
                },
                toggleCard: function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    this.$el.find('.virtual-card').toggleClass('rotate');
                },
                cornerMenu: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.$el.find('.spinner').length < 1) {
                        this.trigger('corner:menu', this.model);
                    }
                },
                requestClicked: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('card:request', this.model);
                },
                addBlur: function() {
                    this.$el.addClass('blurred-element');
                },
                removeBlur: function() {
                    this.$el.removeClass('blurred-element');
                },
                back: function(e) {
                    e.preventDefault();
                    this.trigger('back');
                }
            });
        }, Handlebars);

        return Appersonam.CardApp.Show.Views;
    });
