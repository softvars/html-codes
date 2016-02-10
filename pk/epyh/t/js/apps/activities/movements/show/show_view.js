define(["app",
    "moment",
    'templates',
    "common/image/profile/profile_view"
], function (Appersonam, moment, JST, Image) {
    Appersonam.module("MovementsApp.Show.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        View.BaseEntity = Marionette.Layout.extend({
            imageUploaded: function () {
                this.$el.find('.no-image').removeClass('no-image');
            },
            className: 'show-movement',
            regions: {
                profileRegion: "#profile-region",
                actionRegion: "#action-region",
                imageProfileRegion: '#image-profile-region',
                imageShowRegion: '#image-show-region',
                dropdwonRegion: "#dropdown-region",
                mapRegion: '#map-region'
            },
            events: {
                "click a.js-edit": "editClicked",
                "click a.js-spend-from-goal": "spendFromGoal",
                "click p.js-set-venue": "setVenue",
                "click a.js-edit": "editClicked",
                'click .back': 'back',
                'click .tag': 'search',
                // Hashtag
                'click .memo': 'startEdit',
                'click .memo .tag': 'startEdit',
                'focusout .memo': 'stopEdit',
                'click .js-save-memo': 'stopEdit',
                "focusin textarea": "placeCarAtEnd"
            },
            placeCarAtEnd: function (e) {
                var textArea = $(e.currentTarget)
                var tmpStr = textArea.val();
                textArea.val('');
                textArea.val(tmpStr);
            },
            back: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.options.editable === true) {
                    if (this.$el.find('#hashtag-editor').length > 0) {
                        this.$el.find('#hashtag-editor').html(this.model.get('memo'));
                        this.stopEdit();
                    }
                }
                if (this.options.editable !== true) {
                    this.trigger('back', null);
                } else {
                    this.trigger('back', this.model.toJSON());
                }
            },
            hideInitials: function () {
                this.$el.find('.initials').hide();
            },
            toggleBlur: function () {
                $('.show-movement').parent().toggleClass('blurred-element');
            },
            addBlur: function () {
                $('.show-movement').parent().addClass('blurred-element');
            },
            removeBlur: function () {
                $('.show-movement').parent().removeClass('blurred-element');
            },
            search: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (!this.editHashtagOn) {
                    var value = $(e.currentTarget).text();
                    this.trigger('hashtag:search', value.replace(' #', ''));
                }
            },
            startEdit: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.$el.find('#hashtag-display').hide();
                this.$el.find('#hashtag-editor').show();
                this.$el.find('#hashtag-editor').focus();
            },
            setProperty: function (key, value) {
                this.model.set(key, value, {
                    silent: true
                });
            },
            stopEdit: function (e) {
                var inputArea = this.$el.find('#hashtag-display');
                var placeholder = this.$el.find('#hashtag-display > .hashtag-placeholder');
                var memoValue = this.$el.find('#hashtag-editor').val();
                if (memoValue && memoValue.length > 0) {
                    var replacedInput = memoValue.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='tag'>$2</span>");
                    placeholder.hide();
                    inputArea.html(replacedInput);
                    inputArea.append(placeholder);
                }
                else {
                    inputArea.html(placeholder);
                    placeholder.show();

                }
                this.$el.find('#hashtag-editor').hide();
                this.$el.find('#hashtag-display').show();
                this.model.set({ memo: memoValue }, { silent: true });
                this.$el.find('.js-save-memo').hide();
            },
            stripTextAreaTags: function () {
                var inputArea = this.$el.find('#hashtags');
                var hashTagText = ' ' + inputArea.html();
                hashTagText = hashTagText.replace(/(<([^>]+)>)/ig, '');
                inputArea.html(hashTagText);
            },
            cancelTransfer: function (e) {
                e.preventDefault();
                this.trigger('cancel:transfer');
            },
            initialize: function () {
                var self = this;
                if (this.specificEvents) {
                    this.events = _.extend(this.events, this.specificEvents);
                }
                this.model.on('change', function () {
                    self.render();
                });
            },
            placeCaretAtEnd: function (el) {
                el.focus();
                if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                    var range = document.createRange();
                    range.selectNodeContents(el);
                    range.collapse(false);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (typeof document.body.createTextRange != "undefined") {
                    var textRange = document.body.createTextRange();
                    textRange.moveToElementText(el);
                    textRange.collapse(false);
                    textRange.select();
                }
            },
            editClicked: function (e) {
                e.stopPropagation();
                e.preventDefault();
                this.trigger("movements:edit", this.model);
            },
            spendFromGoal: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.options.editable === true) {
                    this.trigger("movements:spend-from-goal", this.model);
                }
            },
            setVenue: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.options.editable === true) {
                    this.trigger("movements:set-venue", this.model);
                }
            }
        });

        View.NormalEntity = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/show.html'],
            type: function () { },
            onRender: function () {
                console.log('');
                if (this.options.editable !== true) {
                    this.$el.find('.memo-container').hide();
                    this.$el.find('.select-goal').hide();
                }
                else {
                    if (this.$el.find('#hashtag-editor').length > 0) {
                        this.$el.find('#hashtag-editor').html(this.model.get('memo'));
                        this.stopEdit();
                    }
                }
            }
            //events: View.BaseEntity.baseEvents
        });
        View.Gas = View.NormalEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/show_gas.html']
        });
        View.Card = View.NormalEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/show_card.html']
        });
        View.Atm = View.NormalEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/show_atm.html']
        });
        View.Recharge = View.NormalEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/show_recharge.html']
        });
        View.CardRecharge = View.NormalEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/show_recharge_card.html']
        });
        View.Pap = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/show_pap.html'],
            type: function () { }
            //events: View.BaseEntity.baseEvents
        });

        View.IncomingRequest = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/p2p_incoming_request.html'],
            type: function () { },
            specificEvents: {
                'click .js-grant-money': 'grantMoney',
                'click .js-deny-money': 'denyMoney'
            },
            grantMoney: function (e) {
                e.preventDefault();
                this.trigger('p2p:request', true, this.model.get('mateFirstName'), this.model.get('mateLastName'), this.model.get('id'), this.model.get('amount'));
            },
            denyMoney: function (e) {
                e.preventDefault();
                this.trigger('p2p:request', false, this.model.get('mateFirstName'), this.model.get('mateLastName'), this.model.get('id'), 0, this.model.get('causal'));
            },
            //events: _.extend(this.events, this.specificEvents),
        });

        View.OutgoingRequest = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/p2p_outgoing_request.html'],
            type: function () { },
            //events: View.BaseEntity.baseEvents
        });
        View.RejectedRequestIn = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/p2p_rejected_request_in.html'],
            type: function () { },
            //events: View.BaseEntity.baseEvents
        });
        View.RejectedRequestOut = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/p2p_rejected_request_out.html'],
            type: function () { },
            //events: View.BaseEntity.baseEvents
        });
        View.ClosedP2p = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/p2p_accounted.html'],
            type: function () { },
            onRender: function () {
                console.log('');
            },
            specificEvents: {
                'click .js-reply': 'reply'
            },
            reply: function(e){
                e.preventDefault();
                if($(e.currentTarget).data('type') === 'request'){
                    this.trigger('reply', 'request');
                }
                else{
                    this.trigger('reply', 'payment');
                }
            },
            //events: View.BaseEntity.baseEvents
        });
        View.PendingIncomingPayment = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/p2p_incoming_intent.html'],
            type: function () { },
            specificEvents: {}
        });
        View.PendingOutgoingPayment = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/p2p_outgoing_intent.html'],
            type: function () { },
            specificEvents: {
                'click .js-cancel-intent': 'cancelIntent'
            },
            cancelIntent: function (e) {
                e.preventDefault();
                this.trigger('cancel:intent', this.model.get('id'));
            }
        });
        View.Transfer = View.BaseEntity.extend({
            template: JST['assets/js/apps/activities/movements/show/templates/transfer.html'],
            type: function () { },
            specificEvents: {
                'click .js-cancel-transfer': 'cancelTransfer'
            },
            cancelTransfer: function (e) {
                e.preventDefault();
                this.trigger('cancel:transfer');
            }
        });
    }, Handlebars);
    return Appersonam.MovementsApp.Show.View;
});