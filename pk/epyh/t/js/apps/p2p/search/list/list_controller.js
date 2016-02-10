define(["app",
    "apps/p2p/search/list/list_view",
    "common/confirm/profile_view",
    "common/innerloading/view",
    "common/share/show/show_view",
    "facebook"
], function(Appersonam, View, Confirm, InnerLoading, ShareView) {
    Appersonam.module("P2pApp.Search.List", function(List, Appersonam, Backbone, Marionette, $, _) {
        List.Controller = {
            share: function() {
                var that = this;
                var showView = new ShareView.ShowView();
                showView.on('corner:menu', function() {
                    Appersonam.NavigationApp.trigger('corner:menu');
                });
                showView.on('share', function() {
                    var inviteUrl = Appersonam.CommonVariables['myself'].inviteUrl;
                    var onError = function(error) {
                        var confirmModel = new Backbone.Model({
                            title: 'Si è verificato un errore',
                            description: error,
                            className: 'confirmation-dialog-danger',
                        });
                        var confirmPanel = new ConfirmView.Profile({
                            model: confirmModel
                        });
                        confirmPanel.on("cancel", function() {
                            showView.removeBlur();
                            Appersonam.P2pApp.trigger('close:overlay', '-share-error');
                        });
                        showView.addBlur();
                        Appersonam.P2pApp.trigger('show:overlay', confirmPanel, '-share-error')
                    };
                    SocialSharing.prototype.share("Prova HYPE e scopri il nuovo modo di gestire il denaro.", "Prova HYPE: Semplice, gratuito, per tutti", null, inviteUrl, function() {}, onError);
                });
                showView.on('back', function() {
                    Appersonam.P2pApp.trigger("nav:back", '', 1);
                });
                Appersonam.P2pApp.trigger('show:main', showView, 2);
            },
            forbiddenPeerMessage: function() {

                var title = 'Non è possibile inviare denaro a numeri fissi!';
                var description = 'Con HYPE è possibile inviare denaro tramite numero di telefono cellulare, email ed IBAN.';
                if (this.mode === 'request') {
                    title = 'Non è possibile richiedere denaro a  numeri fissi!';
                    description = 'Con HYPE è possibile richiedere denaro tramite numero di telefono cellulare e email.';
                }
                var confirmModel = new Backbone.Model({
                    header: 'Attenzione',
                    title: title,
                    description: description,
                    className: 'confirmation-dialog-safe',
                });
                var that = this;
                var confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    that.Layout.removeBlur();
                    Appersonam.P2pApp.trigger('close:overlay');
                });
                Appersonam.P2pApp.trigger('show:overlay', confirmPanel);
                confirmPanel.on
                this.Layout.addBlur();
            },

            transferOnly: function() {
                var self = this;
                self.transferObject = new Backbone.Model({
                    amount: '0',
                    description: '',
                    peersCollection: new Backbone.Collection(),
                    transferDate: new moment(new Date()).format('YYYY-MM-DD')
                });
                var updated = function() {
                    self.transferObject.attributes.peersCollection.reset([], {
                        silent: true
                    });
                    if (!this.get('id')) {
                        //senza salvare
                        this.set('id', _.uniqueId('my-'), {
                            silent: true
                        });
                    } else {
                        //se salvo il nuovo contatto
                        var contactToAdd = this;
                        var fetchingAllContacts = Appersonam.request("global:get:object", "AllContacts"); //prendo la collezione cachata
                        $.when(fetchingAllContacts).done(function(allContacts) {
                            allContacts.push(contactToAdd.toJSON()); //aggiungo un elemento
                            Appersonam.request("global:initialize:object", allContacts, "AllContacts"); //la salvo nuovamente
                        });
                    }
                    self.transferObject.attributes.peersCollection.add(this.toJSON(), {
                        silent: true
                    });
                    Appersonam.P2pApp.trigger('p2p:secondstep', self.transferObject, 'payment', 2, true);
                };
                this.contactModel = new Backbone.Model();
                this.contactModel.unbind('change'); //per scatenare il change una volta sola
                this.contactModel.on('change', updated);
                Appersonam.P2pApp.trigger('edit:contact', this.contactModel, 'payment', true);
            },

            listEntities: function( /*searchedModel, peersCollection,*/ mode) {
                var self = this;
                this.mode = mode;
                this.currentQuery = '';
                var listPanel;
                this.activeList = 'all';
                //this.peersCollection = peersCollection;
                require(["entities/contact"], function() {
                    self.transferObject = new Backbone.Model({
                        amount: '0',
                        description: '',
                        peersCollection: new Backbone.Collection(),
                        transferDate: new moment(new Date()).format('YYYY-MM-DD')
                    });
                    self.transferObject.attributes.peersCollection.on('reset', function() {

                        //deseleziono gli elementi rimossi
                        new Backbone.Collection(self.allContactsCollection.where({
                            selected: true
                        })).each(function(item, index, collection) {
                            //imposto a selected false false tutti i selected della lista
                            item.set({
                                selected: false
                            });
                        });
                        self.transferObject.attributes.peersCollection.each(function(item, index, collection) {
                            var toSetSelected = self.allContactsCollection.get(item.id);
                            toSetSelected.set({
                                selected: true
                            });

                        });
                        self.Layout.showNext(self.transferObject.attributes.peersCollection.length);

                        self.search('', true);
                        self.Layout.$el.find('.js-search').val('');
                    });

                    self.fbStatus = '';
                    self.Layout = new View.Layout({
                        model: new Backbone.Model({
                            searchType: 'favourites',
                            mode: mode,
                            sts: Appersonam.CommonVariables['sts']
                        })
                    });
                    self.Layout.on('corner:menu', function() {
                        Appersonam.NavigationApp.trigger('corner:menu');
                    });
                    self.Layout.on('share', function() {
                        self.share();
                    });
                    var containerRegion = null;
                    var emptyFavouritesCollection = Appersonam.request('new:contactslist');
                    var emptyAllContactsCollection = Appersonam.request('new:contactslist');
                    var emptyHypersCollection = Appersonam.request('new:contactslist');
                    self.loadingListView = new InnerLoading.LoadingListView({
                        hide: true
                    });
                    self.allContactsView = new View.DedicatedContacts({
                        mode: mode,
                        firstRender: true,
                        collection: emptyAllContactsCollection,
                        model: new Backbone.Model({
                            query: '',
                            active: true,
                            mode: mode,
                            listType: 'all-contacts',
                            pageLength: 20,
                            wayPointContext: '.search-result'
                        })
                    });
                    self.favouritesView = new View.DedicatedContacts({
                        mode: mode,
                        firstRender: true,
                        collection: emptyFavouritesCollection,
                        model: new Backbone.Model({
                            query: '',
                            active: false,
                            mode: mode,
                            listType: 'favourites-contacts',
                            pageLength: -1
                        })
                    });
                    self.hypersView = new View.DedicatedContacts({
                        mode: mode,
                        firstRender: true,
                        collection: emptyHypersCollection,
                        model: new Backbone.Model({
                            query: '',
                            active: false,
                            mode: mode,
                            listType: 'hype-contacts',
                            pageLength: -1
                        })
                    });

                    self.allContactsView.on('item:selected', self.peerSelected, self);
                    self.favouritesView.on('item:selected', self.peerSelected, self);
                    self.hypersView.on('item:selected', self.peerSelected, self);

                    self.allContactsView.on('itemview:clicked:forbidden', function(model, view) {
                        self.forbiddenPeerMessage();
                    });
                    self.favouritesView.on('itemview:clicked:forbidden', function(model, view) {
                        self.forbiddenPeerMessage();
                    });
                    self.hypersView.on('itemview:clicked:forbidden', function(model, view) {
                        self.forbiddenPeerMessage();
                    });
                    var updated = function() {
                        if (this.get('deleted') === true) {
                            self.allContactsCollection.remove(this, {
                                silent: true
                            });
                            self.transferObject.attributes.peersCollection.remove(this, {
                                silent: true
                            });
                            self.Layout.showNext(self.transferObject.attributes.peersCollection.length);
                            Appersonam.P2pApp.trigger('nav:back', 'p2p', 1);
                            self.Layout.$el.find('.js-show-all').click();
                            Appersonam.request("global:initialize:object", self.allContactsCollection.toJSON(), "AllContacts");
                        } else {
                            if (!this.get('id')) { //caso in cui non salvo il destinatario 
                                this.set('id', _.uniqueId('my-'), {
                                    silent: true
                                });
                                if (mode === 'payment') {
                                    self.transferObject.attributes.peersCollection.reset([], {
                                        silent: true
                                    });
                                    self.transferObject.attributes.peersCollection.add(this.toJSON(), {
                                        silent: true
                                    });
                                } else {
                                    self.transferObject.attributes.peersCollection.add(this.toJSON(), {
                                        silent: true
                                    });
                                }
                                if (mode === 'request') {
                                    self.Layout.showNext(self.transferObject.attributes.peersCollection.length);
                                }
                                Appersonam.P2pApp.trigger('p2p:secondstep', self.transferObject, mode, 3);
                            } else { //salvo in rubrica
                                if (!self.allContactsCollection.get(this.get('id'))) { //aggiungo un nuovo elemento
                                    this.set({
                                        selected: true
                                    }, {
                                        silent: true
                                    }); //siccome lo sto creando significa che lo devo aggiungere alla lista dei peers
                                    self.transferObject.attributes.peersCollection.add(this, {
                                        silent: true
                                    });
                                    self.allContactsCollection.add(this, {
                                        silent: true
                                    });
                                    self.Layout.$el.find('.js-show-all').click();
                                    Appersonam.P2pApp.trigger('p2p:secondstep', self.transferObject, mode, 3);
                                } else {
                                    //altrimenti devo aggiornare i valori delll'elemento nella lista totale ed eventualmente in quella dei peers
                                    self.allContactsCollection.get(this.get('id')).set(this.toJSON(), {
                                        silent: true
                                    });
                                    if (self.transferObject.attributes.peersCollection.get(this.id)) {
                                        self.transferObject.attributes.peersCollection.get(this.id).set(this.toJSON());
                                    }
                                    /*//DEVO AGGIUNGERE L'ELEMENTO AI PEERS ANCHE SE LO STO EDITANDO?
                                    else {
                                        self.transferObject.attributes.peersCollection.add(this.toJSON());
                                    }*/
                                    Appersonam.P2pApp.trigger('nav:back', 'p2p', 1);
                                }
                                if (mode === 'request') {
                                    self.Layout.showNext(self.transferObject.attributes.peersCollection.length);
                                }
                                Appersonam.request("global:initialize:object", self.allContactsCollection.toJSON(), "AllContacts");
                            }
                        }
                    };
                    self.allContactsView.on('item:edit', function(model, childView) {
                        self.updateAllowed = false;
                        model.unbind('change'); //per scatenare il change una volta sola
                        model.on('change', updated);
                        model.on('change', function() {
                            childView.render();
                        });
                        Appersonam.P2pApp.trigger('edit:contact', model, mode);
                    });
                    self.Layout.on('new:personal', function() {
                        var model = new Backbone.Model();

                        model.on('change', updated);
                        Appersonam.P2pApp.trigger('edit:contact', model, mode);
                    });

                    self.hypersView.on('favourite', function(entity) {//AGGIUNGO AI PREFERITI
                        self.updateAllowed = false;
                        //entity fa parte di una lista di entità miste, quindi non ha la url per essere eliminata
                        var newFavouriteEntity = Appersonam.request("new:hypeFriend", entity.toJSON());
                        newFavouriteEntity.set({
                            hyper: undefined
                        });
                        var id = entity.get('id'); //id hyper
                        newFavouriteEntity.save(null, {
                            showLoading: false,
                            success: function(result) {
                                //self.favouritesCollection.get(entity.id).set({ id: 'fv-' + result.get('id') }, { silent: true });
                                //Appersonam.request("store:favourites");//inizializzo di nuovo i preferiti 
                            },
                            error: function(result) {
                                /*setTimeout(function () {
                                    self.onlyHypersCollection.add(hyperCopy);
                                    self.favouritesCollection.remove(entity);//rimuovo dagli hypers
                                }, 1000);*/
                            }
                        });
                        var newFavourite = self.hypersView.collection.get(id);
                        self.hypersView.collection.remove(newFavourite, {
                            silent: true
                        });
                        self.hypersView.render();
                        newFavourite.set({
                            type: 'favourite'
                        });
                        self.favouritesView.collection.add(newFavourite, {
                            silent: true
                        });
                        self.favouritesView.render();
                        var modelToUpdate = self.allContactsCollection.get(id);
                        modelToUpdate.set({
                            type: 'favourite'
                        });


                        Appersonam.request("global:initialize:object", self.hypersView.collection.toJSON(), 'Hypers');
                        Appersonam.request("global:initialize:object", self.favouritesView.collection.toJSON(), 'Favourites');
                        Appersonam.request("global:initialize:object", self.allContactsCollection.toJSON(), "AllContacts");

                    });

                    self.favouritesView.on('favourite', function(entity) { //entity fa parte di una lista di entità miste, quindi non ha la url per essere eliminata
                        self.updateAllowed = false;
                        var deleteFavourite = Appersonam.request("new:hypeFriend", entity.toJSON());
                        deleteFavourite.set({
                            hyper: undefined
                        });
                        var id = entity.get('id'); //id hyper
                        deleteFavourite.destroy({
                            showLoading: false,
                            success: function(result) {
                                //self.favouritesCollection.get(entity.id).set({ id: 'fv-' + result.get('id') }, { silent: true });
                                //Appersonam.request("store:favourites");//inizializzo di nuovo i preferiti 
                            },
                            error: function(result) {
                                /*setTimeout(function () {
                                    self.onlyHypersCollection.add(hyperCopy);
                                    self.favouritesCollection.remove(entity);//rimuovo dagli hypers
                                }, 1000);*/
                            }
                        });

                        var newHyper = self.favouritesView.collection.get(id);
                        self.favouritesView.collection.remove(newHyper, {
                            silent: true
                        });
                        self.favouritesView.render();
                        newHyper.set({
                            type: 'hype'
                        });
                        self.hypersView.collection.add(newHyper, {
                            silent: true
                        });
                        self.hypersView.render();
                        var modelToUpdate = self.allContactsCollection.get(id);
                        modelToUpdate.set({
                            type: 'hype'
                        });


                        Appersonam.request("global:initialize:object", self.hypersView.collection.toJSON(), 'Hypers');
                        Appersonam.request("global:initialize:object", self.favouritesView.collection.toJSON(), 'Favourites');
                        Appersonam.request("global:initialize:object", self.allContactsCollection.toJSON(), "AllContacts");


                        //OLD
                        /*var hypeId = (entity.get('hypeId'));
                        if (!hypeId) {
                            var hypeId = ('' + entity.get('id')).replace('fv-', '');
                        }
                        var imageValue = entity.get('imageValue');
                        var oldId = entity.get('oldId');
                        var selected = entity.get('selected');
                        if (!oldId) {
                            oldId = _.uniqueId('hy-');
                        }
                        //entity.set({ id: hypeId }, { silent: true });
                        var deleteFavourite = Appersonam.request("new:hypeFriend", entity.toJSON());
                        var favouriteCopy = entity.toJSON();

                        self.favouritesCollection.remove(entity);
                        entity.set({ imageValue: imageValue, id: oldId, selected: selected, hypeId: hypeId, type: 'hype' });
                        self.onlyHypersCollection.add(entity);
                        $('.js-show-hypers').click();
                        deleteFavourite.destroy({
                            showLoading: false,
                            success: function (result) {
                                Appersonam.request("store:favourites");
                            },
                            error: function (result) {
                                setTimeout(function () {
                                    self.favouritesCollection.add(favouriteCopy);
                                    self.onlyHypersCollection.remove(entity);
                                }, 1000);
                            }
                        });*/
                    });

                    self.allContactsView.on("bad:destination", function(value) {
                        self.showResult(false, null, 'Il recapito ' + value + ' non è valido');
                    });
                    self.allContactsView.on("itemview:expand", function(itemView) {
                        self.updateAllowed = false;
                        var item = self.transferObject.attributes.peersCollection.get(itemView.model.id);
                        if (item && mode === 'request') {
                            itemView.setReferenceSelected(true, item.get('destination'));
                        }
                        itemView.expand();
                    });
                    self.Layout.on('search', function(query) {
                        self.search(query, false);
                    });
                    self.Layout.on('second:step', function() {
                            Appersonam.P2pApp.trigger('p2p:secondstep', self.transferObject, mode, 2);
                            $('#panel_1').bind("webkitTransitionEnd", function() {
                                self.search('', true);
                                self.Layout.$el.find('.js-search').val('');
                                $('#panel_1').unbind("webkitTransitionEnd");
                            });
                        })
                        //self.allContactsView.on('next', function (index) {//al momento la paginazione funziona solo sulla lista con tutti i contatti
                        //    self.next(this, index, self.allContactsCollection);
                        //});

                    self.allContactsView.on('next', self.next, self); //al momento la paginazione funziona solo sulla lista con tutti i contatti


                    self.allContactsView.on('item:contact:show', function(mateReference, childView) {
                        self.updateAllowed = false;
                        var data = {
                            subType: 'p2p',
                            mateReference: mateReference
                        }
                        var fetchingImage = Appersonam.request("movement:entity:new", data, false);
                        $.when(fetchingImage).done(function(imgEntity) {
                            childView.model.set({
                                imageValue: imgEntity.get('image')
                            });
                        });
                    });

                    self.Layout.on('render', function() {
                        Appersonam.trigger('close:loading');
                        self.firstLoading = true;
                        self.searchType = this.model.get('searchType');
                        self.initializeCollections();
                    });
                    Appersonam.P2pApp.trigger('show:main', self.Layout, 1);
                });
            },
            showResult: function(success, title, message, callBack) {
                var self = this;
                if (success === true) {
                    var confirmModel = new Backbone.Model({
                        title: title,
                        description: message,
                        button: 'OK',
                        className: 'information-dialog',
                        closeButton: 'none'
                    });
                } else {
                    var confirmModel = new Backbone.Model({
                        title: 'Si è verificato un errore',
                        description: message,
                        className: 'confirmation-dialog-danger',
                    });
                }
                confirmPanel = new Confirm.Profile({
                    model: confirmModel
                });
                confirmPanel.on("cancel", function() {
                    self.Layout.removeBlur();
                    Appersonam.P2pApp.trigger('close:overlay');
                });
                confirmPanel.on("confirm", function() {
                    self.Layout.removeBlur();
                    if (callBack) {
                        callBack();
                    } else {
                        Appersonam.P2pApp.trigger('close:overlay');
                        Appersonam.P2pApp.trigger('nav:back', "", 1);
                    }
                });
                self.Layout.addBlur();
                Appersonam.P2pApp.trigger('show:overlay', confirmPanel);
            },
            initializeCollections: function() {
                var self = this;
                this.query = '';
                self.updateNeeded = true;
                self.updateAllowed = true;
                var updateList = function() {
                    var fetchingAllContactLists = Appersonam.request("get:all:stored:contacts");
                    if (Appersonam.CommonVariables['ContactsUpdated'] === true) {
                        //se ho già finito di aggiornare i contatti cachati, 
                        //non avrò bisogno di aggiornare le view composte dalle collezioni prese dalla cache
                        self.updateNeeded = false;
                    }

                    $.when(fetchingAllContactLists).done(function(allContactLists) {
                        if (!!Appersonam.CommonVariables.contactsError) {
                            var showContactsError = function(canOpenSettings) {
                                var errorCode = Appersonam.CommonVariables.contactsError.code;
                                self.loadingListView.disappear();
                                var errorModel = new Backbone.Model({
                                    errorCode: errorCode,
                                    canOpenSettings: canOpenSettings
                                });
                                var errorView = new View.ErrorView({
                                    model: errorModel
                                });
                                errorView.on('open:settings', function() {
                                    DeviceInfoPlugin.openSettings();
                                });
                                self.Layout.$el.find('.all-contacts-wrapper').addClass('hidden');
                                self.Layout.$el.find('.navigation').addClass('hidden');
                                self.Layout.$el.find('#search-area').addClass('hidden');
                                self.Layout.$el.addClass('contacts-error');
                                self.Layout.$el.find('.banner-button-top').addClass('hidden');
                                self.Layout.loadingRegion.show(errorView);
                            };
                            DeviceInfoPlugin.canOpenSettingsFromUrl(function() {
                                showContactsError(true);
                            }, function() {
                                showContactsError(false);
                            });
                        } else {
                            var allContacts = allContactLists.all,
                                hypers = allContactLists.hypers,
                                favourites = allContactLists.favourites;

                            self.allContactsCollection = Appersonam.request('new:contactslist');
                            self.allContactsCollection.reset(allContacts);

                            new Backbone.Collection(self.allContactsCollection.where({
                                selected: true
                            })).each(function(item, index, collection) {
                                //imposto a selected false false tutti i selected della lista
                                item.set({
                                    selected: false
                                });
                            });

                            self.hypersView.collection.reset(hypers);
                            self.favouritesView.collection.reset(favourites);
                            if (Appersonam.currentApp.moduleName === 'P2pApp') {
                                self.Layout.on('show:all', function() {
                                    self.activeList = 'all';
                                    self.allContactsView.model.set({
                                        active: true
                                    }, {
                                        silent: true
                                    });
                                    self.hypersView.model.set({
                                        active: false
                                    }, {
                                        silent: true
                                    });
                                    self.favouritesView.model.set({
                                        active: false
                                    }, {
                                        silent: true
                                    });
                                    self.search(self.currentQuery, true);
                                    //self.hypersView.clearContactsList();
                                    //self.favouritesView.clearContactsList();
                                });
                                self.Layout.on('show:hypers', function() {

                                    self.activeList = 'hypers';
                                    self.allContactsView.model.set({
                                        active: false
                                    }, {
                                        silent: true
                                    });
                                    self.hypersView.model.set({
                                        active: true
                                    }, {
                                        silent: true
                                    });
                                    self.favouritesView.model.set({
                                        active: true
                                    }, {
                                        silent: true
                                    });
                                    self.search(self.currentQuery, true);
                                    //self.allContactsView.clearContactsList();

                                });

                                try {
                                    setTimeout(function() {
                                        self.loadingListView.disappear();
                                        //TEST
                                        //self.favouritesView.collection.reset()
                                        //self.hypersView.collection.reset()
                                        self.Layout.allContactsRegion.show(self.allContactsView);
                                        if ((self.favouritesView.collection.length + self.hypersView.collection.length) > 0 || self.updateNeeded === false || self.updateAllowed === false) {
                                            self.Layout.favouritesRegion.show(self.favouritesView);
                                            self.Layout.hypersRegion.show(self.hypersView);
                                            self.Layout.toggleHypersHeaders(true);
                                        }
                                        var partialCollection = new Backbone.Collection(self.allContactsCollection.toJSON().slice(0, self.allContactsView.model.get('pageLength')));
                                        self.updateListView(partialCollection, self.allContactsView, false);
                                        self.allContactsView.setWaypointTarget(partialCollection.length);
                                        self.Layout.enableTabs();
                                        if (self.updateNeeded === true) {
                                            //se la chiamata per aggiornare la cache non era terminata mentre rendereizzavo, devo aggiornare le liste
                                            self.doneFetchingNewHypers();
                                        }
                                    }, 300);
                                } catch (ex) {
                                    LogDB.log('errore inizializzazione liste di contatti => ' + ex.message);
                                }
                            }                            
                        }
                    });
                };

                var loadingHypers = new InnerLoading.LoadingListView({
                    hide: false
                });

                self.Layout.loadingRegion.show(self.loadingListView);
                self.Layout.favouritesRegion.show(loadingHypers);
                self.loadingListView.visualize(updateList);

                self.Layout.toggleHypersHeaders(false);

            },
            doneFetchingNewHypers: function() {
                var that = this;
                var fetchingUpdatedCollections = Appersonam.CommonVariables['FetchingAllContacts'];
                $.when(fetchingUpdatedCollections).done(function(updatedCollections) {
                    if (that.updateAllowed === true) {
                        that.updateAllowed = false;
                        that.allContactsCollection.reset(updatedCollections.allContacts);
                        updatedCollections.allContacts = null; //libero memoria

                        var partialCollection = Appersonam.request('new:contactslist');
                        var i = 0;
                        var allContactsLength = that.allContactsView.collection.length;
                        if (allContactsLength % 20 > 0) {
                            allContactsLength = that.allContactsView.page * 20;
                        } else if (allContactsLength === 0) {
                            allContactsLength = 20;
                        }
                        partialCollection.reset(that.allContactsCollection.toJSON().slice(0, allContactsLength));

                        for (i = 0; i < allContactsLength; i++) { //aggiorno contatti esistenti e aggiungo altri nuovi, poi ri renderizzo la view
                            var newContact = partialCollection.at(i);
                            
                            if (that.allContactsView.collection.get(newContact.id)) {
                                try{
                                    that.allContactsView.children.findByIndex(i).model.set(newContact.toJSON());
                                }
                                catch(ex){
                                    LogDB.log('errore view lista contatti=> ' + ex.message);
                                }
                                that.allContactsView.collection.at(i).set(newContact.toJSON());
                            } else {
                                that.allContactsView.collection.add(newContact, {
                                    silent: false
                                });
                            }
                        }
                        that.allContactsView.render();

                        that.Layout.toggleHypersHeaders(true);
                        that.hypersView.collection.reset(updatedCollections.hypers);
                        that.favouritesView.collection.reset(updatedCollections.favourites);
                        that.hypersView.render();
                        that.favouritesView.render();
                        that.Layout.favouritesRegion.show(that.favouritesView);
                        that.Layout.hypersRegion.show(that.hypersView);
                    } else {
                        that.Layout.favouritesRegion.show(that.favouritesView);
                        that.Layout.hypersRegion.show(that.hypersView);
                        that.Layout.toggleHypersHeaders(true);
                    }
                });
            },
            updateListView: function(collection, view, reset) {
                if (reset) {
                    view.clearContactsList();
                }
                view.collection.add(collection.toJSON(), {
                    silent: true
                }); //evito che la view si renderizzi da sé
                view.fillHtml(collection);
            },
            applyFilter: function(query, reFilter) {
                if (this.activeList !== 'hypers') {
                    if (reFilter === true) {
                        return this.allContactsView.collection.filterContacts(query);
                    } else {
                        return this.allContactsCollection.filterContacts(query);
                    }
                } else {
                    if (reFilter === true) {
                        var result = new Backbone.Model();
                        result.set({
                            favourites: this.favouritesView.collection.filterContacts(query)
                        });
                        result.set({
                            hypers: this.hypersView.collection.filterContacts(query)
                        });
                        return result;
                    } else {
                        var result = new Backbone.Model();
                        var onlyHypers = Appersonam.request('new:contactslist');
                        onlyHypers.reset(this.allContactsCollection.where({
                            type: 'hype'
                        }));
                        var onlyFavourites = Appersonam.request('new:contactslist');
                        onlyFavourites.reset(this.allContactsCollection.where({
                            type: 'favourite'
                        }));
                        result.set({
                            hypers: onlyHypers.filterContacts(query)
                        });
                        result.set({
                            favourites: onlyFavourites.filterContacts(query)
                        });
                        return result;
                    }
                }
            },
            search: function(query, switching) {

                if (query.indexOf(this.currentQuery) === 0 && this.currentQuery.length > 2 && switching !== true) {
                    var filtered = this.applyFilter(query, true); //se sto filtrando una collezione già filtrata
                } else {
                    var filtered = this.applyFilter(query, false);
                }
                if (this.activeList === 'hypers') {
                    this.hypersView.collection.reset([], {
                        silent: true
                    }); //resetto i contatti della view
                    this.favouritesView.collection.reset([], {
                        silent: true
                    });

                    this.hypersView.clearContactsList();
                    this.favouritesView.clearContactsList();

                    if (query) {
                        var sliceAt = 1000;
                    } else {
                        var sliceAt = this.favouritesView.model.get('pageLength');
                    }
                    if (sliceAt < 0) {
                        sliceAt = filtered.get('favourites').toJSON().length;
                    }

                    this.updateListView(new Backbone.Collection(filtered.get('favourites').toJSON().slice(0, sliceAt)), this.favouritesView, false);

                    if (query) {
                        var sliceAt = 1000;
                    } else {
                        var sliceAt = this.hypersView.model.get('pageLength');
                    }
                    if (sliceAt < 0) {
                        sliceAt = filtered.get('hypers').toJSON().length;
                    }

                    this.updateListView(new Backbone.Collection(filtered.get('hypers').toJSON().slice(0, sliceAt)), this.hypersView, false);

                    if (switching) {
                        this.allContactsView.clearContactsList();
                        this.Layout.$el.find('.hypers-favourites-wrapper').show();
                        this.Layout.$el.find('.all-contacts-wrapper').hide();
                    }

                } else {
                    this.allContactsView.collection.reset([], {
                        silent: true
                    }); //resetto i contatti della view
                    this.allContactsView.clearContactsList();

                    if (query) {
                        var sliceAt = 1000;
                    } else {
                        var sliceAt = this.allContactsView.model.get('pageLength');
                    }
                    if (sliceAt < 0) {
                        sliceAt = filtered.toJSON().length;
                    }
                    var sliced = filtered.toJSON().slice(0, sliceAt);
                    this.updateListView(new Backbone.Collection(sliced), this.allContactsView, false);
                    if (switching || query.length === 0) { //resetto la collezione se passo da un tab all'altro o se ho cancellato la ricerca
                        this.hypersView.clearContactsList();
                        this.favouritesView.clearContactsList();
                        this.Layout.$el.find('.hypers-favourites-wrapper').hide();
                        this.Layout.$el.find('.all-contacts-wrapper').show();
                        this.allContactsView.setWaypointTarget(sliced.length);
                    }
                }
                this.currentQuery = query;
            },
            peerSelected: function(valueToSet, positionInAliases, selectedPeerModel, contactItemView, aliasItemView) { //devo farmi arrivare la itemview per mettere o togliere il "selected"
                this.updateAllowed = false;
                var type = selectedPeerModel.get('type');
                //AVENDO PASSATO SELF QUANDO HO BINDATO QUESTA FUNZIONE ALL'EVENTO DELLA VIEW, THIS NON E' LA VIEW CHE HA SCATENATO L'EVENTO, MA E' L'OGGETTO CONTROLLER
                if (this.mode === 'payment') {
                    this.transferObject.attributes.peersCollection.reset([]);
                    this.transferObject.attributes.peersCollection.add(selectedPeerModel.toJSON());
                    var that = this;
                    Appersonam.P2pApp.trigger('p2p:secondstep', this.transferObject, this.mode, 2);
                    $('#panel_1').bind("webkitTransitionEnd", function() {
                        that.search('', true);
                        that.Layout.$el.find('.js-search').val('');
                        $('#panel_1').unbind("webkitTransitionEnd");
                    });
                } else {
                    if (valueToSet === false) {
                        this.transferObject.attributes.peersCollection.remove(this.transferObject.attributes.peersCollection.get(selectedPeerModel.id));
                    } else {
                        var peerToUpdate = this.transferObject.attributes.peersCollection.get(contactItemView.model.id);
                        if (peerToUpdate) {
                            peerToUpdate.set(selectedPeerModel.toJSON());
                        } else {
                            this.transferObject.attributes.peersCollection.add(selectedPeerModel.toJSON());
                        }
                    }
                    /*
                    var selectedModel = this.transferObject.attributes.peersCollection.find(contactItemView.model.id);
                    if (selectedModel && (selectedModel.get('destination') === aliasItemView.model.get('value'))) {//stesso alias
                        this.transferObject.attributes.peersCollection.remove(selectedModel, { silent: true });
                        //view.setSelected(false, model.get('destination'));
                        //view.model.set({ selected: false }, { silent: true });
                        aliasItemView.model.set
                        this.allContactsCollection.get(idToFind).set({ selected: false }, { silent: true });
                        if (idToFind.indexOf('my-') < 0 && idToFind.indexOf('-') >= 0) {//seleziono un hyper o preferito
                            var findModel = this.onlyHypersCollection.get(idToFind);
                            if (findModel) {
                                findModel.set({ selected: false }, { silent: true });
                            }
                            else {
                                findModel = this.favouritesCollection.findWhere({ oldId: model.get('oldId') });
                                if (findModel) {
                                    findModel.set({ selected: false }, { silent: true });
                                }
                                else {
                                    this.favouritesCollection.findWhere({ oldId: idToFind }).set({ selected: false }, { silent: true });
                                }
                            }
                        }
                    }
                    else {
                        this.transferObject.attributes.peersCollection.remove(this.transferObject.attributes.peersCollection.get(model.id));//rimuovo eventuale alias diverso ma stesso id
                        this.transferObject.attributes.peersCollection.add(model.toJSON(), { silent: true });
                        view.setSelected(true, model.get('destination'));
                        view.model.set({ selected: true }, { silent: true })
                        this.allContactsCollection.get(idToFind).set({ selected: true }, { silent: true });
                        if (idToFind.indexOf('my-') < 0 && idToFind.indexOf('-') >= 0) {//seleziono un hyper o preferito
                            var findModel = this.onlyHypersCollection.get(idToFind);
                            if (findModel) {
                                findModel.set({ selected: true }, { silent: true });
                            }
                            else {
                                findModel = this.favouritesCollection.findWhere({ oldId: model.get('oldId') });
                                if (findModel) {
                                    findModel.set({ selected: true }, { silent: true });
                                }
                                else {
                                    this.favouritesCollection.findWhere({ oldId: idToFind }).set({ selected: true }, { silent: true });
                                }
                            }
                        }
                    }
                    */
                    //show next fa apparire il tasto per andare allo step successivo
                    this.Layout.showNext(this.transferObject.attributes.peersCollection.length);
                }
                var modelToUpdate = this.allContactsCollection.findWhere({
                    id: selectedPeerModel.id
                });
                modelToUpdate.set({
                    selected: valueToSet,
                    selectedAliasIndex: positionInAliases
                });
            },
            next: function(view, index) {
                var sliceAt = view.model.get('pageLength');
                if (sliceAt < 0) {
                    sliceAt = this.allContactsCollection.toJSON().length;
                }
                var partialCollection = new Backbone.Collection(this.allContactsCollection.toJSON().slice((index * sliceAt), (sliceAt + index * sliceAt)));
                this.updateListView(partialCollection, view, false); //all: do per scontato che la paginazione avvenga solo per la lista di tutti i contatti
                this.allContactsView.setWaypointTarget(partialCollection.length);
            }
        }
    });
    return Appersonam.P2pApp.Search.List.Controller;
});
