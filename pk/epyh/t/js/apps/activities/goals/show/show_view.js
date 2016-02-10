define(['app',
    'templates',
    'moment',
], function (Appersonam, JST, moment) {
    Appersonam.module('GoalsApp.Show.NormalView', function (NormalView, Appersonam, Backbone, Marionette, $, _, Handlebars) {

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

        NormalView.WrapperView = Marionette.Layout.extend({
            regions: {
                centerRegion: '#center-region',
                sideRegion: '#side-region'
            },
            softToggle: function () {
                $('.js-more').trigger('click');
            },
            toggleMore: function () {
                var that = this;
                if (this.$el.find('#center-region').hasClass('toggled')) {//se il menù è aperto
                    this.$el.find('#center-region').removeClass('toggled');//lo chiudo
                    setTimeout(function () {
                        that.$el.find('.goal-blocker').addClass('hidden');
                        Appersonam.CommonVariables.locked = false;
                        document.removeEventListener('backbutton', that.softToggle);
                    }, 600);
                }
                else {
                    $('.goal-blocker').removeClass('hidden');
                    this.$el.find('#center-region').toggleClass('toggled');//apro il menù
                    Appersonam.CommonVariables.locked = true;
                    document.addEventListener('backbutton', that.softToggle, false);
                }
            },
            className: 'goal-show-wrapper',
            template: JST['assets/js/apps/activities/goals/show/templates/wrapper.html']
        });
        NormalView.SidePanelView = Marionette.ItemView.extend({
            className: 'actions-panel',
            events: {
                'click .js-action': 'actionClicked'
            },
            actionClicked: function (e) {
                e.preventDefault();
                this.trigger($(e.currentTarget).data('action'));
            },
            template: JST['assets/js/apps/activities/goals/show/templates/actions_panel.html']
        });
        NormalView.ShowGoalView = Marionette.Layout.extend({
            template: JST['assets/js/apps/activities/goals/show/templates/show.html'],
            className: 'goal-show-panel',
            regions: {
                imageShowRegion: '#image-show-region',
                imageProfileRegion: '#image-profile-region',
                dropdownRegion: '#dropdown-region',
                dealsRegion: '#deals-region'
            },
            events: {
                'click a.js-delete': 'deleteClicked',
                'click a.js-archive': 'archiveClicked',
                'change .js-complete': 'completeClicked',
                'click a.js-edit': 'editClicked',
                'click .js-pause': 'pauseClicked',
                'click .js-play': 'playClicked',
                'click .js-more': 'more',
                'click .js-back': 'back',
                'click .goal-blocker': 'more',
                'click .js-movements': 'showMovements',
                'click .js-share': 'shareClicked'
            },
            showMovements: function (e) {
                e.preventDefault();
                this.trigger('show:movements');
            },
            more: function (e) {
                e.preventDefault();
                this.trigger('more');
            },
            imageUploaded: function () {
                this.$el.find('.no-image').removeClass('no-image');
            },
            initialize: function () {
                var self = this;
                this.model.on('change', function () {
                    self.render();
                });
                if (this.specificEvents) {
                    this.events = _.extend(this.events, this.specificEvents);
                }
            },
            showDeals: function () {
                this.$el.find('.js-deals').removeClass('hidden');
            },
            setProperty: function (key, value) {
                this.model.set(key, value, {
                    silent: true
                });
            },
            addBlur: function () {
                this.$el.addClass('blurred-element');
            },
            removeBlur: function () {
                this.$el.removeClass('blurred-element');
            },
            type: 'normal',
            onRender: function () {
                var missing = this.model.get('total') - this.model.get('currentAmount');
                this.$el.find('.js-missing').html('' + parseFloat(missing).toFixed(2) + '&euro;');

                var missing = this.model.get('total') - this.model.get('remaining');
                this.$el.find('.js-spent').html('' + parseFloat(missing).toFixed(2) + '&euro;');

                if (this.model.get('image') == null || this.model.get('image').length < 1) {
                    this.$el.find('#top-image').addClass('no-image');
                }
            },
            onShow: function () {
                if (this.model.get('paused') === true || this.model.get('suspended') === true) {
                    this.$el.find('#profile-region').addClass('paused');
                }
                this.$el.find('.display-associated-movements').hide();
            },
            showMovementsRegion: function () {
                this.$el.find('.display-associated-movements').show();
            },
            deleteClicked: function (e) {
                e.preventDefault();
                this.trigger('goal:delete', this.model);
            },
            shareClicked: function (e) {
                e.preventDefault();
                this.trigger('goal:share', this.model);
            },
            archiveClicked: function (e) {
                e.preventDefault();
                this.trigger('goal:archive', this.model);
            },
            completeClicked: function (e) {
                //e.preventDefault();
                var checkbox = document.getElementById('check');
                if (checkbox.checked) {
                    this.trigger('goal:complete', this.model);
                }
            },
            uncheckCompleteGoal: function () {
                $('#check').attr('checked', false);
            },
            editClicked: function (e) {
                e.preventDefault();
                this.trigger('goals:edit', this.model);
            },
            back: function (e) {
                e.preventDefault();
                this.trigger('back');
            },
            pauseClicked: function (e) {
                e.preventDefault();
                var that = this;
                $(e.currentTarget).addClass('spinner');
                this.$el.find('.hype-toggle').removeClass('play');
                setTimeout(function () {
                    that.trigger('goals:pause', that.model);
                }, 500);
            },
            stopSpinner: function (className) {
                if (!className) {
                    className = '';
                }
                this.$el.find('.hype-toggle').addClass(className).removeClass('spinner');
            },
            playClicked: function (e) {
                e.preventDefault();
                var that = this;
                if ($(e.currentTarget).hasClass('inactive') === false) {
                    this.$el.find('.hype-toggle').removeClass('pause');
                    $(e.currentTarget).addClass('spinner');
                    setTimeout(function () {
                        that.trigger('goals:play', that.model);
                    }, 500);
                }
            }
        });

        NormalView.ShowExpiredGoalView = NormalView.ShowGoalView.extend({
            template: JST['assets/js/apps/activities/goals/show/templates/expired_show.html']
        });

        NormalView.ShowCompletedGoalView = NormalView.ShowGoalView.extend({
            template: JST['assets/js/apps/activities/goals/show/templates/completed_show.html'],
            specificEvents: {
                'click .js-transfer-to-sts': 'transferToSts'
            },
            transferToSts: function (e) {
                e.preventDefault();
                this.trigger('transfer:sts', this.model);
            }
        });

        NormalView.ShowArchivedGoalView = NormalView.ShowGoalView.extend({
            template: JST['assets/js/apps/activities/goals/show/templates/archived_show.html'],
            specificEvents: {

            },
            transferToSts: function (e) {
                e.preventDefault();
            }
        });
        NormalView.MovementsItem = Marionette.ItemView.extend({
            template: JST['assets/js/apps/activities/goals/show/templates/movements_list_item.html'],
            className:'movement-for-goal-item',
            initialize: function () {
                console.log(this.model.toJSON());
            }
        });
        NormalView.Movements = Marionette.CompositeView.extend({
            template: JST['assets/js/apps/activities/goals/show/templates/movements_list.html'],
            itemView: NormalView.MovementsItem,
            itemViewContainer: '.mov-list',
            className: 'movements-for-goal',
            initialize: function () {
                console.log(this.collection.toJSON());
            },
            events:{
                'click .js-back':'back'
            },
            back: function (e) {
                e.preventDefault();
                this.trigger('back');
            },
        });
    }, Handlebars);
    return Appersonam.GoalsApp.Show.NormalView;
});