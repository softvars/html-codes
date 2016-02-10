define([
    'marionette',
    'backbone.hammer',
    'moment'
], function(Marionette, hammer, moment) {

    /* Configuration */
    moment.lang('it', {
        'calendar': {
            'lastDay': '[Ieri]',
            'sameDay': '[Oggi]',
            'nextDay': '[Domani]',
            'lastWeek': 'D MMMM YYYY',
            'nextWeek': 'D MMMM YYYY',
            'sameElse': 'D MMMM YYYY'
        }
    });

    Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
        return Handlebars.compile(rawTemplate);
    };

    /* App Initialization */
    var Appersonam = new Marionette.Application();
    Appersonam.navigate = function(route, options) {
        options = options || {};
        Backbone.history.navigate(route, options);
    };
    Appersonam.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };

    var LoadingRegion = Backbone.Marionette.Region.extend({
        el: "#loading-content",
        open: function(view) {
            this.$el.hide();
            this.$el.html(view.el);
            this.$el.fadeIn();
        },
        initialize: function() {
            this._close = this.close;
            this.close = function() {
                $('#loading-content').hide();
                this._close();
            };
        }
    });

    Appersonam.addRegions({
        mainMenuRegion: '#main-menu',
        mainContentRegion: '#main-content',
        primaryContentRegion: '#primary-content',
        loadingContentRegion: new LoadingRegion(),
        errorContentRegion: '#error-content',
        InnerNotificationRegion: '#inner-notification-region'
    });

    Appersonam.on("initialize:after", function() {
        if (Backbone.history) {
            require(["apps/user/user_app", "apps/activities/activities_app", "apps/payments/payments_app", "apps/p2p/p2p_app", "config/backbone/custom", "apps/card/card_app", "apps/login/login_app", "apps/deals/deals_app", "global/appTracking", "global/loading/view", "global/error/view", "global/notification/show_view", "entities/contact", "config/marionette/keyboardRegion"], function() {
                Backbone.history.start();
                Appersonam.request("global:initialize:device");
                var fetchingXds = Appersonam.request("global:get:xds");

                $.when(fetchingXds).done(function(xds) {
                    Appersonam.request("global:initialize:dateSupported");
                    Appersonam.CommonVariables = {
                        aliasesLimit: 2
                    };

                    var prepareEnvironment = function() {
                        console.log = function() {};

                        Appersonam.CommonVariables.locked = true; // blocca il tasto back
                        Appersonam.LoginApp.trigger('login', xds.ashe);
                    };

                    /* start-test-block */
                    prepareEnvironment = function() {
                        if (xds.gnt !== 'ngt') {
                            Appersonam.CommonVariables.locked = true; // blocca il tasto back
                            Appersonam.LoginApp.trigger('login', xds.ashe);
                        } else {
                            Appersonam.trigger('show:loading');
                            Appersonam.trigger('activities', 'movements:list', true);
                            Appersonam.CommonVariables.loggingOut = false;
                        }
                    };
                    /* end-test-block */

                    prepareEnvironment();

                    /*
                     $(document).on("click", "#backButton", function (e) {
                     Appersonam.trigger('back:button:clicked');
                     });
                     */


                    document.addEventListener("backbutton", function(e) {
                        e.preventDefault();
                        Appersonam.trigger('back:button:clicked');
                    });
                });
            });
        }
        $(document).on('touchstart', 'a', function(e) {
            $(e.currentTarget).addClass('tapped');
            if ($(e.currentTarget).hasClass("vibrate")) {
                navigator.vibrate(5);
            }
        });
        $(document).on('submit', 'form', function(e) {
            e.preventDefault();
        });
        //focusin e focusout servono ad evitare che mentre si scrive l'app vada in timeout e si blocchi lo schermo
        $(document).on('focusout', 'input', function( /*e*/ ) {
            Appersonam.CommonVariables.loggingOut = false; //se loggingout è true lo screenlock non funzionerà
        });

        $(document).on('focusin', 'input', function( /*e*/ ) {
            Appersonam.CommonVariables.loggingOut = true;
        });
        document.addEventListener("pause", function() {
            $('input, textarea, select').blur();
        }, false);

        $(document).on('focusout', 'textarea', function( /*e*/ ) {
            Appersonam.CommonVariables.loggingOut = false; //se loggingout è true lo screenlock non funzionerà
        });
        $(document).on('focusin', 'textarea', function( /*e*/ ) {
            Appersonam.CommonVariables.loggingOut = true;
        });
        $(document).on('touchend touchmove', 'a', function(e) {
            $(e.currentTarget).removeClass('tapped');
        });
    });

    Appersonam.startSubApp = function(appName, args) {
        LogDB.log('=> ' + appName);
        var currentApp = Appersonam.module(appName);
        if (Appersonam.currentApp === currentApp) {
            return;
        }

        if (Appersonam.currentApp) {
            Appersonam.currentApp.stop();
        }

        Appersonam.currentApp = currentApp;
        currentApp.start(args);
    };

    return Appersonam;
});