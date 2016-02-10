define(["app",
    'templates',
    "moment",
    'waypoints'
], function (Appersonam, JST, moment, waypoints) {
    Appersonam.module("P2pApp.Search.List.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        moment.lang('it');
        //var infScroll = Icroll;
        View.Layout = Marionette.Layout.extend({
            template: JST['assets/js/apps/p2p/search/list/templates/layout.html'],
            className: 'contacts-search-panel',
            events: {
                'click .corner-menu': 'cornerMenu',
                'click .js-show-all': 'showAll',
                'click .js-secondStep': 'secondStep',
                'click .js-show-hypers': 'showHypers',
                'click .js-new-contact': 'newContact',
                'click .js-share': 'share',
                'keyup .js-search': 'keyup',
                'input .js-search': 'keyup',
                'touchstart .contacts-list': 'hideKeyboard'
            },
            share: function (e) {
                e.preventDefault();
                this.trigger('share');
            },
            enableTabs: function () {
                this.$el.find('.navigation').removeClass('disabled');
            },
            toggleHypersHeaders: function (value) {
                if (value === true) {
                    this.$el.find('.favourites-panel-header').show();
                    this.$el.find('.hypers-panel-header').show();
                }
                else {
                    this.$el.find('.favourites-panel-header').hide();
                    this.$el.find('.hypers-panel-header').hide();
                }
            },

            showNext: function (length) {
                if (length === 1) {
                    this.$el.find('.js-secondStep .content').html('Richiedi denaro a <span>1</span> contatto');
                    this.$el.find('.js-secondStep').show();
                } else if (length > 1) {
                    this.$el.find('.js-secondStep .content').html('Richiedi denaro a <span>' + length + '</span> contatti');
                } else {
                    this.$el.find('.js-secondStep').hide();
                }
            },
            secondStep: function (e) {
                e.preventDefault();
                this.trigger('second:step');
            },
            hideKeyboard: function () {
                this.$el.find('.js-search').blur();
            },
            keyup: function (e) {
                var self = this;
                var keyCode = e.keyCode;
                clearTimeout(this.typingTimer);
                var value = this.$el.find('.js-search').val();
                if (keyCode === 13) {
                    e.preventDefault();
                    $('input, textarea, select').blur();//perde focus su input
                    self.trigger("search", value);
                }
                else {
                    this.typingTimer = setTimeout(function () {
                        if (value.length >= 3) {
                            self.trigger("search", value);
                        } else if (value.length < 1) {
                            self.trigger("search", "");
                        }
                    }, 700);
                }
            },
            newContact: function (e) {
                this.trigger('new:personal');
            },
            initialize: function () {
                this.model.on('change', this.render, this);
            },
            addBlur: function () {
                this.$el.addClass('blurred-element');
            },
            removeBlur: function () {
                this.$el.removeClass('blurred-element');
            },
            regions: {
                loadingRegion: '#loading-panel',
                allContactsRegion: '#all-contacts-panel',
                favouritesRegion: '#favourites-panel',
                hypersRegion: '#hypers-panel'
            },
            query: '',
            typingTimer: '',

            setActive: function (className) {
                this.$el.find('#bottom-panel .' + className).click();
            },

            /*clearContactsList: function () {//funziona solo con la ricerca interna
                var container = document.getElementById('contacts-list');
                if (container) {
                    container.innerHTML = '';
                    container = null;
                }
            },*/
            showAll: function (e) {
                e.preventDefault();
                var currentTarget = $(e.currentTarget);
                var navigation = currentTarget.parents('.navigation');
                if (!navigation.hasClass('disabled')) {
                    var self = this;
                    this.$el.find('.js-show-hypers').parent().removeClass('active');
                    this.$el.find('.js-show-all').parent().addClass('active');
                    setTimeout(function () {
                        self.trigger('show:all');
                    }, 20);
                }
            },
            showHypers: function (e) {
                e.preventDefault();
                var currentTarget = $(e.currentTarget);
                var navigation = currentTarget.parents('.navigation');
                if (!navigation.hasClass('disabled')) {
                    var self = this;
                    this.$el.find('.js-show-all').parent().removeClass('active');
                    this.$el.find('.js-show-hypers').parent().addClass('active');
                    setTimeout(function () {
                        self.trigger('show:hypers');
                    }, 20);
                }
            },
            cornerMenu: function (e) {
                e.preventDefault();
                this.trigger('corner:menu');
            },
        });

        View.ContactReference = Marionette.ItemView.extend({
            //contatti di ogni possibile destinatario
            template: JST['assets/js/apps/p2p/search/list/templates/contact_reference.html'],
            events: {
                "click": "clicked",
            },
            initialize: function () {
                var self = this;
                this.model.on('change', function () {
                    self.render();
                });
            },
            clicked: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.model.get('clickable') === true) {
                    var alias = this.model.get('value').replace(/\s+/g, '');
                    var isSelected = (this.model.get('selected'));
                    if (!isSelected) {
                        isSelected = false;
                    }
                    this.model.set({ selected: (!isSelected) }, { silent: false });
                    this.trigger('clicked', !isSelected);//!isSelected = valore da settare
                }
                else {
                    this.trigger('clicked:forbidden');
                }
            },
            onShow: function () {
                if (this.model.get('clickable') === false) {
                    this.$el.addClass('unclickable');
                }
            },
            onRender: function () {
                if (this.model.get("selected") === true) {
                    this.$el.addClass("selected");
                } else {
                    this.$el.removeClass("selected");
                }
            },
            tagName: 'li',
            className: 'contact-reference-item',

        });

        View.Contact = Marionette.CompositeView.extend({
            //singolo destinatario risultato della ricerca
            template: JST['assets/js/apps/p2p/search/list/templates/contacts_list_item.html'],
            className: 'wayPointTarget contacts-item',
            itemView: View.ContactReference,
            itemViewContainer: "ul.contact-reference-list",
            events: {
                'click': 'clicked',
                'click .js-edit': 'editClicked',
                'click .js-delete': 'deleteClicked',
                "click .js-favourite": "favourite",
                //"click .js-remove-favourite": "removeFavourite"
            },
            setReferenceSelected: function (isSelected, destination) {
                var item = this.collection.each(function (item, index, collection) { //setto unselected tutti gli alias, e setto a isSelected quello cercato
                    if (item.get('value') === destination) {
                        item.set({
                            selected: isSelected
                        });
                    } else {
                        item.set({
                            selected: false
                        });
                    }
                });
            },
            setSelected: function (isSelected, destination) {
                console.log(isSelected);
                if (isSelected === true) {
                    this.$el.addClass("selected");
                } else {
                    this.$el.removeClass("selected");
                }
                if (this.collection.length > 1) {
                    this.setReferenceSelected(isSelected, destination);
                }
            },
            editClicked: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('edit', this.model);
            },
            deleteClicked: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('delete', this.model);
            },
            favourite: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('favourite', this.model);
            },
            removeFavourite: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('remove:favourite', this.model);
            },
            onRender: function () {
                if (this.childrenVisible) {
                    this.$el.find('ul.contact-reference-list').slideDown("slow");
                }

                if (this.model.get("selected") === true) {
                    this.$el.addClass("selected");
                } else {
                    this.$el.removeClass("selected");
                }
                //TEST
                //console.log('id:' + this.model.id);
                //console.log('nickname:' + this.model.attributes.nickname);
                //console.log('image:' + this.model.attributes.imageId);
                //console.log('imageValue:' + this.model.attributes.imageValue);

            },
            expand: function () {
                this.childrenVisible = true;
                this.render();
            },
            clicked: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.model.get('clickable') !== false) {
                    var array = new Array();
                    var iban = this.model.get('iban');
                    var email = this.model.get('email');
                    var phoneNumber = this.model.get('phoneNumber');
                    var self = this;
                    if (this.childrenVisible) {
                        this.$el.find('ul.contact-reference-list').slideUp("slow", function () {
                            self.collection.reset();
                            self.childrenVisible = false;
                            self.render();
                        });
                    } else {
                        array = this.pushInArray(this.model.get('type'), email, phoneNumber, iban, array);
                        if (this.model.get('selected')) {
                            if (this.model.get('selectedAliasIndex')) {
                                array[this.model.get('selectedAliasIndex')].selected = true;
                            }
                            else {
                                array[0].selected = true;
                            }
                        }
                        this.collection = new Backbone.Collection(array);
                        if (this.collection.length > 1 && this.model.get('type') !== 'favourite' && this.model.get('type') !== 'hype') {
                            this.trigger('expand');
                        }
                        else {
                            var value = this.collection.first().get('value').replace(/\s+/g, '');
                            if (/^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(value) !== true && this.collection.length > 1) {
                                var value = this.collection.last().get('value').replace(/\s+/g, '');
                            }
                            var newModel = new Backbone.Model(this.model.toJSON());
                            newModel.set({
                                destination: value
                            });
                            var valueToSet = !(this.model.get('selected'));
                            self.collection.at(0).set({ selected: valueToSet }, { silent: false });
                            this.model.set({ selected: valueToSet, selectedAliasIndex: 0 }, { silent: true });
                            if (valueToSet === true) {
                                this.$el.addClass('selected');
                            }
                            else {
                                this.$el.removeClass('selected');
                            }

                            self.trigger('clicked', valueToSet, 0, newModel, null);
                        }
                    }
                }
                else {
                    this.trigger('clicked:forbidden');
                }
            },
            initialize: function () {
                var self = this;
                /*var e = new Date().getTime() + (1 * 10); //funzione per simulare lentezza di rendering
                while (new Date().getTime() <= e) { }*/
                this.on("itemview:clicked", function (childView, value) {
                    var valueToSet = childView.model.get('selected');
                    var newModel = new Backbone.Model(self.model.toJSON());
                    if (self.model.get('selectedAliasIndex') >= 0) {
                        self.collection.at(self.model.get('selectedAliasIndex')).set({ selected: false }, { silent: false });
                    }
                    newModel.set({
                        destination: childView.model.get('value')//alias cui chiedere o mandare soldi
                    });
                    var positionInAliases = self.collection.indexOf(childView.model);
                    self.model.set({ selected: valueToSet, selectedAliasIndex: positionInAliases }, { silent: true });
                    self.onRender();
                    self.trigger('clicked', valueToSet, positionInAliases, newModel, childView);
                });
                this.on("itemview:clicked:forbidden", function () {
                    self.trigger('clicked:forbidden');
                });
                this.model.on("change", function () {
                    this.render();
                }, this);
            },
            pushInArray: function (type, email, phoneNumber, iban, array) {
                if (type === 'personal') {
                    if (email) {
                        array.push({
                            selected: false,
                            value: email,
                            type: 'email',
                            clickable: true
                        });
                    }
                    if (phoneNumber) {
                        array.push({
                            selected: false,
                            value: phoneNumber,
                            type: 'phoneNumber',
                            clickable: true
                        });
                    }
                    if (iban) {
                        array.push({
                            selected: false,
                            value: iban,
                            type: 'iban',
                            clickable: true
                        });
                    }
                } else {
                    if (phoneNumber) {
                        if (!Array.isArray(phoneNumber)) {
                            phoneNumber = new Array(phoneNumber);
                        }
                        for (var i = 0; i < phoneNumber.length; i++) {
                            var clickable = true;

                            if (/^([00|\+]+\d{2})?3\d{9}$/.test(phoneNumber[i]) !== true) {
                                clickable = false;
                            }
                            array.push({
                                selected: false,
                                value: phoneNumber[i],
                                type: 'phoneNumber',
                                clickable: clickable
                            });
                        }
                    }
                    if (email) {
                        if (!Array.isArray(email)) {
                            email = new Array(email);
                        }
                        for (var i = 0; i < email.length; i++) {
                            array.push({
                                selected: false,
                                value: email[i],
                                type: 'email',
                                clickable: true
                            });
                        }
                    }
                }
                return array
            },
            onShow: function () {
                if (('' + this.model.get('firstName') + this.model.get('lastName')).length < 1) {
                    this.$el.find('.title-line').html(this.model.get('nickname'));
                }
                if (this.model.get('clickable') === false) {
                    this.$el.addClass('unclickable');
                }
            }
        });

        View.Contacts = Marionette.CompositeView.extend({
            //lista di destinatari, risultato di ogni ricerca
            template: JST['assets/js/apps/p2p/search/list/templates/contacts_list.html'],
            className: 'peers-item contacts-container',
            //emptyView: NoEntitiesView,
            itemView: View.Contact,
            itemViewContainer: ".contacts-list",
            buildItemView: function (item, ItemView) {
                var view = new ItemView({
                    model: item,
                    contactsType: this.options.contactsType,
                    mode: this.options.mode
                    //altra roba per caratterizzare una itemview hype rispetto ad una legacy
                });
                return view;
            },
            events: {
                //'change .js-search': 'keyup',
                'keydown .js-search': 'keydown',
                'click #js-add-peer.active': 'validatePeerForm',
                'click #js-show-form': 'showForm',
                'click #js-search-peer': 'contactSearch'
            },
            query: '',
            typingTimer: '',
            keydown: function () {

            },
            activateAddPeerButton: function () {
                this.$el.find('#js-add-peer').addClass('active');
            },
            deactivateAddPeerButton: function () {
                this.$el.find('#js-add-peer').removeClass('active');
            },
            keyup: function (e) {
                clearTimeout(this.typingTimer);
                var self = this;
                var keyCode = e.keyCode;
                var currentTarget = $(e.currentTarget);
                var value = currentTarget.val();
                isIban = /^[Ii][Tt][0-9]/.test(value.toLowerCase());
                this.$el.find('.info-block > .title-line > span').html(value);

                var searchTrigger = function () {
                    self.firstRender = false;
                    if (value.length >= 3) {
                        if (isIban === true) {
                            self.trigger("iban", currentTarget.val());
                            self.$el.find('.loading-contacts').fadeIn();
                        } else {
                            self.$el.find('.loading-contacts').fadeIn();
                            self.trigger("search", currentTarget.val());
                        }
                    } else if (value.length < 1) {
                        self.model.set('query', '');
                        self.collection.reset();
                        self.$el.find('#js-show-form').hide();
                    }
                };

                if (keyCode === 13) {
                    e.preventDefault();
                    $('input, textarea, select').blur();//perde focus su input
                    searchTrigger();
                }
                else {
                    this.typingTimer = setTimeout(function () {
                        searchTrigger();
                    }, 700);
                }
            },
            resetView: function () {
                this.model.set({
                    query: ''
                });
                this.collection.reset();
                this.$el.find('#search-area').hide();
                if (this.model.get('mode') === 'request') {
                    this.$el.find('#js-add-peer').addClass('active');
                }
            },
            validatePeerForm: function () {
                //valido il form del peer
                this.trigger('validate:peer:form');
            },
            newPeer: function (e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.model.set({
                    query: ''
                });
                this.$el.find('.js-search').val('');
                this.collection.reset();
            },
            contactSearch: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('import:contact');
            },
            showForm: function (e, firstName, lastName) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.collection.reset();
                this.trigger('show:form', this.model.get('query'), firstName, lastName);
                this.model.set('query', '');
                this.$el.find('.js-search').val('');
                this.$el.find('#js-show-form').hide();
                this.$el.find('.search-result').hide();
                this.$el.find('#search-area').hide();
            },
            initialize: function () {
                this.firstRender = this.options.firstRender;
                //-----
                var now = new Date();
                console.log("Inizializzo view con elenco contatti:   " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds());
                //----- 
                var self = this;
                this.collection.on('reset', function () {
                    self.onRender();
                });
                this.on("itemview:edit", function (childView, model) {
                    this.trigger('edit', model);
                });
                this.on("itemview:delete", function (childView, model) {
                    this.trigger('item:delete', model);
                });
                this.on("itemview:contact:show", function (childView) {
                    var model = childView.model;
                    var mateReference = '';
                    if (model.get('email').length > 0) {
                        mateReference = model.get('email')[0];
                        if (mateReference.length === 0) {
                            mateReference = model.get('phoneNumber')[0];
                        }
                    } else {
                        mateReference = model.get('phoneNumber')[0];
                    }

                    this.trigger('item:contact:show', mateReference, childView);
                });
                this.on("itemview:clicked", function (childView, model) {
                    var destination = model.get('destination');
                    var isIban = IBAN.isValid(destination);
                    var isEmail = /^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(destination);
                    var isPhoneNumber = /^([00|\+]+\d{2})?3\d{9}$/.test(destination);
                    //tolgo controllo su numeri fissi
                    //if ((!isIban || (isIban && this.model.get('mode') === 'request')) && !isEmail && !isPhoneNumber) {
                    //this.trigger('bad:destination', destination);
                    //} else {
                    this.resetView();
                    this.trigger('item:selected', model);
                    //}
                });
                this.on("itemview:clicked:forbidden", function () {
                    self.trigger('clicked:forbidden');
                });
            },
            ibanSearch: function () {
                this.collection.reset([], {
                    silent: true
                });
                this.$el.find('.search-result').show();
                this.$el.find('.contacts-list').empty();
                //this.$el.find('.search-result-title').hide();
                this.$el.find('.send-to-other-peer .with-result').hide();
            },
            onRender: function () {
                var query = this.model.get('query');
                this.$el.find('#js-show-form').show();
                this.$el.find('.loading-contacts').hide();
                if (!(this.collection.length === 0)) {
                    // LA collezione non è vuota
                    this.$el.find('.search-result').show();
                    //this.$el.find('.search-result-title').show();

                    this.$el.find('.send-to-other-peer .with-result').show();
                    this.$el.find('.send-to-other-peer .no-result').hide();

                    this.$el.find('#search-area').addClass("move-up");
                } else {
                    if (query.length < 1) {
                        this.$el.find('.search-result').hide();
                        this.$el.find('#search-area').removeClass("move-up");
                    } else {
                        this.$el.find('.search-result').show();
                        this.$el.find('#search-area').addClass("move-up");
                    }
                    //this.$el.find('.search-result-title').hide();

                    this.$el.find('.send-to-other-peer .with-result').hide();
                    this.$el.find('.send-to-other-peer .no-result').show();
                }

                var input = this.$el.find('.js-search');
                if (!(this.firstRender === true)) {
                    input.blur();
                    input.focus();
                }
                var tmpStr = input.val();
                input.val('');
                input.val(tmpStr);
                this.$el.find('#search-area').show();
                this.deactivateAddPeerButton();
            },

            onShow: function () {
                this.$el.find('.list-block-title').html(this.options.title);
            },
        });

        View.DedicatedContacts = View.Contacts.extend({
            template: JST['assets/js/apps/p2p/search/list/templates/dedicated_contacts_list.html'],
            initialize: function () {
                this.firstRender = this.options.firstRender;
                this.page = 1;
                //-----
                var now = new Date();
                console.log("Inizializzo view con elenco contatti:   " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds());
                //----- 
                //questa composite ha già un'azione di render collegata al reset della collezione, anche se non 
                //esplicitamente dichiarato. Non ne ho compreso il motivo

                var self = this;

                this.on("itemview:edit", function (childView, model) {
                    this.trigger('item:edit', model, childView);
                });
                this.on("itemview:delete", function (childView, model) {
                    this.trigger('item:delete', model);
                });
                this.on('itemview:favourite', function (childView, model) {
                    self.trigger('favourite', model);
                });
                //this.on('itemview:remove:favourite', function (childView, model) {
                //    self.trigger('remove:favourite', model);
                //});

                this.on("itemview:contact:show", function (childView) {
                    var model = childView.model;
                    var mateReference = '';
                    if (model.get('email') && model.get('email').length > 0) {
                        if (model.get('type') !== 'favourite') {
                            mateReference = model.get('email')[0];
                        } else {
                            mateReference = model.get('email');
                        }
                    } else {
                        if (model.get('type') !== 'favourite') {
                            mateReference = model.get('phoneNumber')[0];
                        } else {
                            mateReference = model.get('phoneNumber');
                        }
                    }
                    this.trigger('item:contact:show', mateReference, childView);
                });
                this.model.on("change", function () {
                    this.render();
                }, this);
                this.on("itemview:clicked", function (childView, valueToSet, positionInAliases, newModel, aliasItemView) {
                    var destination = newModel.get('destination');
                    //var isIban = IBAN.isValid(destination);
                    //var isEmail = /^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(destination);
                    //var isPhoneNumber = /^([00|\+]+\d{2})?3\d{9}$/.test(destination);
                    //tolgo controllo su numeri fissi
                    //if ((!isIban || (isIban && this.model.get('mode') === 'request')) && !isEmail && !isPhoneNumber) {
                    //self.trigger('bad:destination', destination);
                    //} else {  
                    self.trigger('item:selected', valueToSet, positionInAliases, newModel, childView, aliasItemView);
                    //}
                });
                this.on("itemview:clicked:forbidden", function () {
                    self.trigger('clicked:forbidden');
                });
            },
            clearContactsList: function () { //funziona solo con la ricerca interna
                this.collection.reset([], {
                    silent: true
                })
                var container = document.getElementById(this.model.get('listType'));
                if (container) {
                    container.innerHTML = '';
                    container = null;
                }
            },
            buildItemView: function (item, ItemView) {
                var view = new ItemView({
                    model: item,
                    mode: this.options.mode,
                    id: 'index-' + this.appendedItemsCount + '-' + this.model.get('listType')
                });
                this.appendedItemsCount++;
                return view;
            },
            setWaypointTarget: function (length) {
                var context = this.model.get('wayPointContext');
                var pageLength = this.model.get('pageLength');
                if (length === pageLength && pageLength > 0) {
                    var self = this;
                    var triggerElement = this.$el.find('#index-' + ((this.page - 1) * pageLength + 2) + '-' + this.model.get('listType'));
                    triggerElement.waypoint({
                        context: context,
                        continuous: false,
                        //triggerOnce: true, //autodistruzione
                        handler: function (direction) {
                            self.page++;
                            self.trigger('next', self, self.page - 1);
                        }
                    });
                }
            },
            fillHtml: function (contacts) {
                var context = this.model.get('wayPointContext');
                var pageLength = this.model.get('pageLength');
                $.waypoints('destroy');
                this.page = this.collection.length / pageLength;
                this.appendedItemsCount = this.collection.length - contacts.length;
                this.$el.find('.search-result').show();
                //this.$el.find('.search-result-title').show();

                if (this.collection.length > 0) {
                    try {
                        //this.$el.find('.search-result-title').text('Risultati trovati:');
                        var self = this;
                        for (var i = 0; i < contacts.length; i++) {
                            try {
                                var item = contacts.at(i);
                                self.addChildView(item, null, null);
                            }
                            catch (ex) {
                                LogDB.log('errore p2p addChildView => ' + ex.message);
                            }
                        }
                        this.$el.find('.loading-contacts').hide();
                    }
                    catch (ex) {
                        LogDB.log('errore p2p fillHtml => ' + ex.message);
                    }
                } else {
                    this.$el.find('.loading-contacts').hide();
                    //this.$el.find('.search-result-title').text('Nessun contatto trovato');
                }
            },
            itemViewContainer: '.contacts-list',
        });
        View.ErrorView = Marionette.ItemView.extend({
            className: 'contacts-error-panel',
            template: JST['assets/js/apps/p2p/search/list/templates/error.html'],
            events: {
                'click .js-open-settings': 'openSettings'
            },
            openSettings: function (e) {
                e.preventDefault();
                this.trigger('open:settings');
            },
        });
        View.NoEntitiesView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/p2p/search/list/templates/none.html'],
        });

    }, Handlebars);
    return Appersonam.P2pApp.Search.List.View;
});
