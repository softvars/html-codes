define(["app",
    "iban"
], function(Appersonam) {
    Appersonam.module("Entities", function(Entities, Appersonam, Backbone, Marionette, $, _) {
        //array ordinato per firstname
        Entities.GenericContacts = Backbone.Collection.extend({
            comparator: function(item) {
                return ((item.get("firstName") + item.get("lastName") + item.get("nickname") + '').toLowerCase());
            },
            model: Backbone.Model,
            url: "",
            filterContacts: function(query) {
                filtered = this.filter(function(item) {
                    query = query.toLowerCase();
                    var valueString = "";
                    if (item.get('firstName')) {
                        valueString += item.get('firstName');
                    }
                    if (item.get('lastName')) {
                        valueString += item.get('lastName');
                    }
                    if (item.get('phoneNumber') && item.get('phoneNumber').length > 0) {
                        if ((_.isArray(item.get('phoneNumber')) === false)) {
                            valueString += item.get('phoneNumber');
                        } else {
                            for (var i = 0; i < item.get('phoneNumber').length; i++) {
                                valueString += item.get('phoneNumber')[i];
                            }
                        }
                    }

                    if (item.get('email') && item.get('email').length > 0) {
                        if ((_.isArray(item.get('email')) === false)) {
                            valueString += item.get('email');
                        } else {
                            for (var i = 0; i < item.get('email').length; i++) {
                                valueString += item.get('email')[i];
                            }
                        }
                    }

                    if (item.get('nickname')) {
                        valueString += item.get('nickname');
                    }
                    return valueString.toLowerCase().indexOf(query) >= 0;
                });
                return new Entities.GenericContacts(filtered);
            }
        });
        //array contatti hype da telefono
        Entities.HypePhoneContactItem = Backbone.Model.extend({
            
            get: function(attr) {
                var value = this.attributes[attr];
                if (_.isArray(value) === true) {
                    return value[0];
                } else {
                    return value;
                }
            }
        });

        Entities.HypePhoneContacts = Entities.GenericContacts.extend({
            model: Entities.HypePhoneContactItem,
            url: ""
        });

        Entities.MyContact = Backbone.Model.extend({
            urlRoot: "rest/social/mycontacts/",            
            initialize: function() {
                
            },            
            validate: function(attrs, options) {
                var errors = {}
                if (!attrs.nickname || attrs.nickname.replace(/\s+/g, '') === '') {
                    errors.nickname = "Inserire un nickname";
                }
                if (!attrs.firstName || attrs.firstName.replace(/\s+/g, '') === '') {
                    errors.firstName = "Inserire un nome";
                }
                if (!attrs.iban && !attrs.email && !attrs.phoneNumber) {
                    errors.destination = 'inserire recapito valido';
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });
        Entities.FacebookResultItem = Backbone.Model.extend({
            initialize: function(object) {
                this.clear();
                this.set({
                    type: 'facebook',
                    nickname: '' + object.first_name + ' ' + object.last_name,
                    uid: object.uid
                });
            }
        });

        Entities.FacebookContacts = Backbone.Model.extend({
            urlRoot: 'https://graph.facebook.com/v1.0/fql'
        });
        Entities.MyContacts = Entities.GenericContacts.extend({
            url: "rest/social/mycontacts",
            model: Entities.MyContact
        });

        Entities.FilterPhoneContactItem = Backbone.Model.extend({
            defaults: {
                type: 'phone'
            },
            initialize: function(attributes, options) {
                //var item = new Backbone.Model(allContactsArray[id]);
                var emails = this.get('emails');
                var phoneNumbers = this.get('phoneNumbers');
                var nameObject = this.get('name');
                var nickname = '',
                    firstName = '',
                    lastName = '',
                    phoneId = '';
                phoneId = this.get('id');
 
                //tolto il controllo sul numero di casa
                //var noMobilePhone = false, clickable = 'clickable';
                if (phoneNumbers && !_.isEmpty(phoneNumbers) && phoneNumbers[0].value) {
                    for (var j = 0; j < phoneNumbers.length; j++) {
                        phoneNumbers[j] = API.normalizePhoneNumber(phoneNumbers[j].value);
                    }
                }
                else {
                    phoneNumbers = [];
                }
                if (emails && !_.isEmpty(emails) && emails[0].value) {
                    for (var j = 0; j < emails.length; j++) {
                        emails[j] = emails[j].value.replace(/\s+/g, '');
                    }
                }
                else{          
                    emails = [];
                }

                //tolto il controllo sul numero di casa
                //else if (noMobilePhone === true) {
                //    API.UnclickableArray.push(phoneId);//se non ho mail e ho solo un telefono fisso
                //}

                //TUTTA LA PARTE RELATIVA A NOME E FOTO E' DA SPOSTARE, AL SERVER MANDO SOLO L'INDISPENSABILE
                /*----------*/

                this.clear();

                /*this.set({
                 id: phoneId,
                 nickname: 'nickname',
                 email: emails,
                 firstName: 'firstName',
                 lastName: 'lastName',
                 phoneNumber: phoneNumbers,
                 });*/
                //DA CAMBIARE IN :
                this.set({
                    i: phoneId,
                    e: emails,
                    p: phoneNumbers
                });

            }
        });

        Entities.FilterPhoneContacts = Backbone.Collection.extend({
            model: Entities.FilterPhoneContactItem
        });
        Entities.FilterPhoneContactsWrapper = Backbone.Model.extend({
            //urlRoot: 'rest/social/gethypecontacts',
            urlRoot: 'rest/social/getfasthypecontacts',
            comparator: function(item) {
                return item.get("firstName");
            },
            set: function(key, val, options) {
                if (_.isArray(key)) {
                    val = new Backbone.Collection(key);
                    key = 'collection';
                }
                return Backbone.Model.prototype.set.call(this, key, val, options);
            },
            toJSON: function() { //override del metodo per far si che si possa inviare un array non associativo
                var collection = this.get('collection').toJSON();
                return collection;
            }
        });
        Entities.FacebookResult = Entities.GenericContacts.extend({
            byName: function(name) {
                var filtered = this.filter(function(element) {
                    var elementName = element.get("name").toLowerCase();
                    return (elementName.indexOf(name) > -1)
                });
                return new Entities.FilterFacebookResult(filtered);
            },
            model: Entities.FacebookResultItem
        });

        Entities.HypeFriend = Backbone.Model.extend({
            urlRoot: "rest/social/myhypefriends/"
                /*defaults: {
                 type: 'favourite',
                 imageValue: null
                 },
                 initialize: function () {
                 if (this.get('id')) {
                 this.set({ id: 'fv-' + this.get('id') });
                 }
                 }*/
        });
        Entities.HypeFriends = Entities.GenericContacts.extend({
            url: "rest/social/myhypefriends",
            model: Entities.HypeFriend
        });

        Entities.FacebookPost = Backbone.Model.extend({
            urlRoot: 'https://graph.facebook.com/v1.0/me/fulviodantonio:testshare',
            save: function(attributes, options) {
                var options = {
                    requestMode: 'BACKBONE'
                };
                Backbone.Model.prototype.save.call(this, attributes, options);
            }
        });
        var API = {
            anonymizeContacts: function(src) {
                return Appersonam.request('global:anonymizeJSON', src, {
                    keepStringBits: true,
                    exclusions: ['id']
                });
            },
            UnclickableArray: [],
            ToRemoveArray: [],
            PhotoArray: [],

            getAnonymizedContacts: function() {
                var defer = $.Deferred();
                var promise = defer.promise();
                //Appersonam.CommonVariables['PromiseHypers'] = promise;
                var options = {} /*new ContactFindOptions()*/ ;
                var query = '';
                options.filter = query; //caratteri digitati dall'utente
                options.multiple = true; //ottengo più risultati se presenti
                var fields = ['displayName', 'name', 'phoneNumbers', 'emails', 'photos'];
                options.desiredFields = fields;
                var resultType = {
                    q: query
                };

                ContactsPlugin.getContacts(function(stringifiedContacts) {

                        stringifiedContacts = stringifiedContacts.replace(/\\n/g, '').replace(/\\r/g, '').replace(/\n/g, '').replace(/\r/g, '');

                        var htmlEncode = function(val) {
                            if (typeof(val) != "string") {
                                return val;
                            }
                            var replaced = $('<div/>').text(val).html();
                            return replaced;
                        };

                        stringifiedContacts = htmlEncode(stringifiedContacts);
                        var phoneContactsList = new Entities.GenericContacts(JSON.parse(stringifiedContacts));
                        var i = 0;
                        for (i = 0; i < phoneContactsList.length; i++) {
                            phoneContactsList.at(i).set(API.cleanDataFromMobileContact(phoneContactsList.at(i)));
                            phoneContactsList.at(i).set('id', _.uniqueId(''));
                        }
                        defer.resolve(JSON.stringify(API.anonymizeContacts(phoneContactsList)));
                    }, //success
                    Sella.deviceactions.noop(), //fail
                    resultType, //per android
                    fields, //per ios
                    options //per ios
                );
                return promise;
            },

            getHypeContacts: function() {
                var defer = $.Deferred();
                var self = this;
                var promise = defer.promise();
                var options = {} /*new ContactFindOptions()*/ ;
                options.filter = ''; //caratteri digitati dall'utente
                options.multiple = true; //ottengo più risultati se presenti
                var fields = ['displayName', 'name', 'phoneNumbers', 'emails', 'photos'];
                options.desiredFields = fields;
                var resultType = {
                    q: ''
                };
                //chiamata alla rubrica di cordova

                var doneGettingContacts = function(stringifiedContacts, error) {
                    if (error) {
                        Appersonam.CommonVariables.contactsError = error;
                        defer.resolve({
                            hypers: [],
                            originalPhoneContacts: new Backbone.Collection()
                        });
                    } else {
                        stringifiedContacts = stringifiedContacts.replace(/\\n/g, '').replace(/\\r/g, '').replace(/\n/g, '').replace(/\r/g, '');
                        var htmlEncode = function(val) {
                            if (typeof(val) != "string") {
                                return val;
                            }
                            var replaced = $('<div/>').text(val).html();
                            return replaced;
                        };
                        stringifiedContacts = htmlEncode(stringifiedContacts);
                        var filterPhoneContacts = new Entities.FilterPhoneContacts(JSON.parse(stringifiedContacts)); //collezione da spedire al server pulita delle cose inutili provenienti dal telefono
                        var filterPhoneContactsWrapper = new Entities.FilterPhoneContactsWrapper();
                        filterPhoneContactsWrapper.set({
                            collection: filterPhoneContacts
                        });
                        filterPhoneContactsWrapper.save(null, {
                            serviceDestination: 'NEW',
                            showLoading: false,
                            withoutMethods: true, //per evitare create alla fine della url
                            success: function(resultingData) {
                                filterPhoneContacts = null; //libero memoria eliminando una collezione che non mi serve più
                                defer.resolve({
                                    hypers: resultingData.get('collection'),
                                    originalPhoneContacts: new Backbone.Collection(JSON.parse(stringifiedContacts))
                                });
                            },
                            error: function(result) {
                                defer.resolve({
                                    hypers: [],
                                    originalPhoneContacts: new Backbone.Collection()
                                });
                            }
                        });
                    }
                };

                var successCallback = function(stringifiedContacts) {
                    doneGettingContacts(stringifiedContacts, false);
                };
                var errorCallback = function(error) {
                    doneGettingContacts(false, error);
                };

                ContactsPlugin.getContacts(successCallback, //success
                    errorCallback, //fail
                    resultType, //per android
                    fields, //per ios
                    options //per ios
                );
                return promise;
            },

            getPhoneContacts: function() {// usato in caso in cui non ho niente in cache, perciò li prendo subito dal telefono
                var defer = $.Deferred();
                var promise = defer.promise();
                //Appersonam.CommonVariables['PromiseHypers'] = promise;
                var options = {} /*new ContactFindOptions()*/ ;
                var query = '';
                options.filter = query; //caratteri digitati dall'utente
                options.multiple = true; //ottengo più risultati se presenti
                var fields = ['displayName', 'name', 'phoneNumbers', 'emails', 'photos'];
                options.desiredFields = fields;
                var resultType = {
                    q: query
                };
                var doneGettingContacts = function(stringifiedContacts, error) {
                    if (error) {
                        Appersonam.CommonVariables.contactsError = error;
                        defer.resolve(new Entities.GenericContacts());
                    } else {
                        stringifiedContacts = stringifiedContacts.replace(/\\n/g, '').replace(/\\r/g, '').replace(/\n/g, '').replace(/\r/g, '');

                        var htmlEncode = function(val) {
                            if (typeof(val) != "string") {
                                return val;
                            }
                            var replaced = $('<div/>').text(val).html();
                            return replaced;
                        };

                        stringifiedContacts = htmlEncode(stringifiedContacts);
                        var phoneContactsList = new Entities.GenericContacts(JSON.parse(stringifiedContacts));
                        var i = 0;
                        for (i = 0; i < phoneContactsList.length; i++) {
                            phoneContactsList.at(i).set(API.cleanDataFromMobileContact(phoneContactsList.at(i)));
                        }
                        defer.resolve(phoneContactsList);
                    }
                };
                var successCallback = function(stringifiedContacts) {
                    doneGettingContacts(stringifiedContacts, false);
                };
                var errorCallback = function(error) {
                    doneGettingContacts(false, error);
                };
                ContactsPlugin.getContacts(successCallback, //success
                    errorCallback, //fail
                    resultType, //per android
                    fields, //per ios
                    options //per ios);
                );
                return promise;
            },


            getAllStoredContacts: function() { //prendo subito le tre collezioni per le tre view: preferiti hypers e tutti insieme
                var defer = $.Deferred();
                var promise = defer.promise();
                var self = this;
                var fetchingStoredAllContacts = Appersonam.request("global:get:object", "AllContacts");
                var fetchingStoredHypers = Appersonam.request("global:get:object", "Hypers");
                var fetchingStoredFavourites = Appersonam.request("global:get:object", "Favourites");
                $.when(fetchingStoredAllContacts, fetchingStoredHypers, fetchingStoredFavourites).done(function(storedAll, storedHypers, storedFavourites) {
                    //storedAll = [];//TEST SIMULA PRIMA VOLTA CHE SI LOGGA CON STRONG (non ci sono contatti cachati)
                    if (storedAll.length === 0) { //non ho niente in cache, prendo subito quelli del telefono e li mostro
                        var fetchingPhoneContacts = API.getPhoneContacts();
                        $.when(fetchingPhoneContacts).done(function(phoneContacts) {
                            storedAll = phoneContacts.toJSON();
                            storedHypers = [];
                            storedFavourites = [];
                            defer.resolve({
                                all: storedAll,
                                hypers: storedHypers,
                                favourites: storedFavourites
                            });
                        });
                    } else {
                        defer.resolve({
                            all: storedAll,
                            hypers: storedHypers,
                            favourites: storedFavourites
                        });
                    }
                });
                return promise;
            },

            getFavouriteContacts: function() {
                var defer = $.Deferred();
                var promise = defer.promise();
                Appersonam.CommonVariables['PromiseFavourites'] = promise;
                var hypeContacts = new Entities.HypeFriends();
                hypeContacts.fetch({
                    showLoading: false,
                    serviceDestination: 'NEW',
                    data: {
                        search: ''
                    },
                    success: function(result) {
                        //salvo nei settings i preferiti
                        defer.resolve(result.toJSON());
                    },
                    error: function(result) {
                        defer.resolve(new Backbone.Collection.toJSON());
                    }
                });
                return promise;
            },
            
            cleanDataFromMobileContact: function(rawContact) {
                var emails = rawContact.get('emails');
                var phoneId = rawContact.get('id');
                var phoneNumbers = rawContact.get('phoneNumbers');
                var nameObject = rawContact.get('name');
                var photos = rawContact.get('photos');
                var imageValue = '';
                var noName = false;
                var nickname = '';
                var lastName = '';
                var firstName = '';
                var noMails = true;
                var noPhones = true;
                if (phoneNumbers && !_.isEmpty(phoneNumbers) && phoneNumbers[0].value) {
                    for (var j = 0; j < phoneNumbers.length; j++) {
                        phoneNumbers[j] = API.normalizePhoneNumber(phoneNumbers[j].value);
                    }
                    noPhones = false;
                }
                if (emails && !_.isEmpty(emails) && emails[0].value) {
                    for (var j = 0; j < emails.length; j++) {
                        emails[j] = emails[j].value.replace(/\s+/g, '');
                    }
                    noMails = false;
                }
                if(!nameObject.givenName){
                    nameObject.givenName = '';
                }
                if(!nameObject.familyName){
                    nameObject.familyName = '';
                }
                if (nameObject && !_.isEmpty(nameObject) && (nameObject.givenName + nameObject.familyName)) {
                    //prendo il nickname da nome e cognome
                    firstName = nameObject.givenName;
                    lastName = nameObject.familyName;
                    nickname = firstName + ' ' + lastName;
                    if (!nickname) {
                        nickname = nameObject.formatted;
                    }
                } else if (rawContact.get('displayName')) {
                    //prendo il nome e cognome dal nickname
                    nickname = rawContact.get('displayName');
                    firstName = nickname.split(' ')[0];
                    lastName = nickname.split(' ')[1];
                } else {
                    noName = true;
                }

                /*if ((!nickname) || (!emails && !phoneNumbers)) {
                 if (!API.ToRemoveArray) {
                 API.ToRemoveArray = new Array();
                 }
                 API.ToRemoveArray.push(phoneId);
                 }*/

                if (noName) {
                    if (noMails === false) {
                        nickname = firstName = emails[0];
                    } else if (noPhones === false) {
                        nickname = firstName = phoneNumbers[0];
                    } else {
                        nickname = firstName = 'Contatto Senza Nome';
                    }
                    lastName = '';
                } else if (!phoneNumbers && !emails) {
                    API.ToRemoveArray.push(phoneId);
                }
                if (photos && !_.isEmpty(photos) && photos[0].value) {
                    imageValue = photos[0].value;
                }
                return {
                    id: phoneId,
                    phoneNumber: phoneNumbers,
                    email: emails,
                    firstName: firstName,
                    lastName: lastName,
                    nickname: nickname,
                    iban: '',
                    type: 'phone',
                    hyper: false,
                    imageId: '',
                    imageValue: imageValue,
                    image: undefined,
                    hypeId: ''
                };
            },

            updateStoredContacts: function() {
                var defer = $.Deferred();
                var self = this;
                var promise = defer.promise();
                //eseguo le chiamate ai tre servizi
                var fetchingPersonals = API.getPersonalContacts();
                var fetchingHypers = API.getHypeContacts();
                var fetchingFavourites = API.getFavouriteContacts();

                //preparo le collezioni da cachare
                var storedAllContacts = new Entities.GenericContacts();
                var storedHypers = new Entities.GenericContacts();
                var storedFavourites = new Entities.GenericContacts();


                $.when(fetchingPersonals, fetchingHypers, fetchingFavourites).done(function(personalContacts, hypersContacts, favouritesContacts) {
                    var originalPhoneContacts = hypersContacts.originalPhoneContacts; //array di contatti del telefono
                    var hypers = hypersContacts.hypers;
                    var i = 0;

                    //riformulo i dati della collezione del telefono per metterli nella lista che contiene tutti i contatti, da cachare
                    for (i = 0; i < originalPhoneContacts.length; i++) {
                        //pulisco l'elemento, settandogli solo i dati necessarivar oldElement = originalPhoneContacts.at(i);
                        //var phoneId = oldElement.get('id'), email = oldElement.get('email'), phoneNumber = oldElement.get('phoneNumber');
                        var originalPhoneElement = originalPhoneContacts.get(originalPhoneContacts.at(i).id);
                        //inserisco l'elemento nella collezione
                        storedAllContacts.push(API.cleanDataFromMobileContact(originalPhoneElement));
                        for (var j = 0; j < API.ToRemoveArray.length; j++) {
                            storedAllContacts.remove(storedAllContacts.get(API.ToRemoveArray[j]));
                        }
                    }
                    originalPhoneContacts = null; //libero memoria eliminando una collezione che non mi serve più

                    //scorro i preferiti, e proseguo la preparazione delle collezioni

                    for (i = 0; i < hypers.length; i++) {
                        var imageValue = '';
                        var hyper = hypers.at(i);
                        var phoneId = hyper.get('id');
                        //TEST
                        //if (!hyper.get('imageReal') || !hyper.get('imageReal').content) {
                        //    var asdasd
                        //}
                        //if ('' + phoneId === '1343') {
                        //    var asd
                        //}
                        var originalPhoneElement = storedAllContacts.get(phoneId);
                        if (hyper.get('imageReal') && hyper.get('imageReal').content) {
                            imageValue = hyper.get('imageReal').content;
                        }
                        originalPhoneElement.set({
                            phoneNumber: hyper.get('phoneNumber'), //assicurarsi che sia un array
                            email: hyper.get('email'), //assicurarsi che sia un array
                            type: 'hype',
                            hyper: true,
                            imageValue: imageValue,
                            imageId: hyper.get('image'),
                            image: undefined,
                            hypeId: hyper.get('hypeId')
                        });
                        storedHypers.push(new Backbone.Model(originalPhoneElement.toJSON()));
                    }
                    for (i = 0; i < favouritesContacts.length; i++) {
                        var favourite = favouritesContacts[i];
                        var favouriteHyper = storedHypers.where({
                            hypeId: favourite.id
                        })[0];
                        if (favouriteHyper) {
                            var phoneId = favouriteHyper.id;
                            var originalPhoneElement = storedAllContacts.get(phoneId);
                            if (originalPhoneElement) {
                                var imageValue = '';
                                if (favourite.imageReal && favourite.imageReal.content) {
                                    imageValue = favourite.imageReal.content;
                                }
                                originalPhoneElement.set({
                                    type: 'favourite',
                                    hyper: true
                                });
                                storedFavourites.push(originalPhoneElement); //aggiungo l'elemento alla cache dei preferiti
                                storedHypers.remove(favouriteHyper);
                            }
                        }
                    }
                    hypersContacts = null; //libero memoria eliminando una collezione che non mi serve più
                    for (i = 0; i < personalContacts.length; i++) {
                        var personal = personalContacts[i];
                        var id = 'my-' + personal.id;
                        var personalToAdd = new Backbone.Model({
                            id: id,
                            phoneNumber: personal.phoneNumber,
                            email: personal.email,
                            iban: personal.iban,
                            firstName: personal.firstName,
                            lastName: personal.lastName,
                            nickname: personal.nickname,
                            image: '',
                            type: 'personal',
                            hyper: false,
                            imageId: '',
                            imageValue: '',
                            hypeId: ''
                        });
                        storedAllContacts.push(personalToAdd);
                    }
                    Appersonam.request("global:initialize:object", storedAllContacts.toJSON(), "AllContacts");
                    Appersonam.request("global:initialize:object", storedHypers.toJSON(), "Hypers");
                    Appersonam.request("global:initialize:object", storedFavourites.toJSON(), "Favourites");

                    //TEST
                    //setTimeout(function () {
                    defer.resolve({
                        hypers: storedHypers.toJSON(),
                        favourites: storedFavourites.toJSON(),
                        allContacts: storedAllContacts.toJSON()
                    });
                    Appersonam.CommonVariables['ContactsUpdated'] = true;
                    //}, 3000);
                });


                //-----
                return promise;
            },

            getPersonalContacts: function() {
                var defer = $.Deferred();
                var promise = defer.promise();
                var myContacts = new Entities.MyContacts();
                myContacts.fetch({
                    showLoading: false,
                    data: {
                        search: ''
                    },
                    success: function(result) {
                        //salvo nei settings i personali
                        defer.resolve(result.toJSON());
                    },
                    error: function(result) {
                        defer.resolve([]);
                    }
                });
                return promise;
            },

            normalizePhoneNumber: function(phoneValue) {

                var plus = '';
                phoneValue = phoneValue.replace(/\s+/g, '');
                if (isNaN(phoneValue[0])) {
                    plus = '+';
                }
                phoneValue = plus + phoneValue.replace(/\D/g, ''); //procedimento per rimuovere il + nel caso in cui non sia scritto nella codifica standard, sostituendolo con il + corretto

                if (phoneValue.indexOf('0039') === 0) {
                    phoneValue = phoneValue.replace('0039', '+39');
                }
                if (phoneValue.indexOf('+39') < 0 && phoneValue[0] !== '+') { //se non c'è il +39 e il numero non è estero
                    phoneValue = '+39' + phoneValue;
                }
                return phoneValue;
            },

            share: function(userID, token, message) {
                var publish = new Entities.FacebookPost();

                //publish.urlRoot = 'https://graph.facebook.com/' + userID + '/feed?message=prova&access_token=' + token //+ '&tags=' + userID

                //publish.urlRoot = 'https://graph.facebook.com/me/cookbook:eat?recipe=http://www.example.com/recipes/pizza/&access_token=' + token //+ '&tags=' + userID
                publish.fetch({
                    data: {
                        hype: 'http://samples.ogp.me/723635527674751',
                        tags: ['' + userID],
                        access_token: token,
                        method: 'POST'
                    },
                    requestMode: 'BACKBONE'
                });

            },


            getHypeFriends: function(query, except, index) {
                var hypeContacts = new Entities.HypeFriends();
                var defer = $.Deferred();


                var doneFilteringFavouriteContacts = function(result) {
                    defer.resolve(result);
                }
                var errorFilteringFavouriteContacts = function() {
                    defer.resolve(new Entities.GenericContacts());
                }
                if (Appersonam.CommonVariables['LoadingFavourites'] === true) {
                    var fetchingFavourites = Appersonam.CommonVariables['PromiseFavourites'];
                    //hypeContacts.fetch({
                    //    showLoading: false,
                    //    serviceDestination: 'NEW',
                    //    data: {
                    //        search: query
                    //    },
                    //    success: function (result) {
                    //        doneFilteringFavouriteContacts(result);
                    //    },
                    //    error: function (result) {
                    //        errorFilteringFavouriteContacts();
                    //    }
                    //});
                } else {
                    var fetchingFavourites = Appersonam.request("global:get:object", "Favourites");
                }
                $.when(fetchingFavourites).done(function(favourites) {
                    doneFilteringFavouriteContacts(new Entities.GenericContacts(favourites));
                });
                var promise = defer.promise();
                return promise;
            },
            getFbContacts: function(query, token) {
                var fbContacts = new Entities.FacebookContacts();
                var defer = $.Deferred();
                fbContacts.fetch({
                    showLoading: false,
                    requestMode: 'BACKBONE',
                    data: {
                        access_token: token,
                        q: 'SELECT first_name, last_name, uid, work FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND ( ( strpos(lower(first_name),"' + query + '") >=0 ) OR   ( strpos(lower(last_name),"' + query + '") >=0 ) )'
                    },
                    success: function(response) {
                        if (response && !response.error) {
                            var data = response.get('data');
                            var resultCollection = new Entities.FacebookResult(data);

                            defer.resolve(resultCollection);
                            //versione filtrata lato backbone
                            /*var completeListCollection = new Entities.FilterFacebookResult(data);
                             var filtered = completeListCollection.byName(query.toLowerCase());
                             _.each(filtered.models, function (item) {
                             var nickname = item.get('name');
                             item.unset('name');
                             item.set({ nickname: nickname });
                             });
                             defer.resolve(filtered);*/

                        }
                    }
                });
                var promise = defer.promise();
                return promise;
            },

            locallyFilterPersonal: function(query, success, error) {
                var fetchingPersonal = Appersonam.request("global:get:personalcontacts");
                $.when(fetchingPersonal).done(function(personal) {
                    if (query.length > 0) {
                        var filterCollection = new Backbone.Collection(personal.toJSON());
                        filterCollection.each(function(item, index, collection) { //filtro in base alla query
                            var firstName = "";
                            if (item.get('firstName')) {
                                firstName = item.get('firstName').toLowerCase();
                            }
                            var lastName = "";
                            if (item.get('lastName')) {
                                lastName = item.get('lastName').toLowerCase();
                            }
                            var phoneNumber = item.get('phoneNumber');
                            var email = item.get('email');
                            if (!phoneNumber) {
                                phoneNumber = '';
                            }
                            var nickname = item.get('nickname').toLowerCase();
                            if (!(firstName.indexOf(query) > -1 || lastName.indexOf(query) > -1 || nickname.indexOf(query) > -1 || phoneNumber.toLocaleLowerCase().indexOf(query) > -1 || email.toLocaleLowerCase().indexOf(query) > -1)) {
                                personal.remove(item);
                            }
                        });
                    }
                    var result = new Entities.HypeFriends(personal.toJSON());
                    success(result);
                });
            }

            /*locallyFilterFavourites: function (query, success, error) {
             var fetchingFavourites = Appersonam.request("global:get:object", "Favourites");
             $.when(fetchingFavourites).done(function (favourites) {
             if (query.length > 0) {
             var filterCollection = new Backbone.Collection(favourites.toJSON());
             filterCollection.each(function (item, index, collection) {//filtro in base alla query
             var firstName = item.get('firstName').toLowerCase();
             var lastName = item.get('lastName').toLowerCase();
             var phoneNumber = item.get('phoneNumber');
             var email = item.get('email');
             if (!phoneNumber) {
             phoneNumber = '';
             }
             var nickname = item.get('nickname').toLowerCase();
             if (!(firstName.indexOf(query) > -1 || lastName.indexOf(query) > -1 || nickname.indexOf(query) > -1 || phoneNumber.toLocaleLowerCase().indexOf(query) > -1 || email.toLocaleLowerCase().indexOf(query) > -1)) {
             favourites.remove(item);
             }
             });
             }

             var result = new Entities.HypeFriends(favourites.toJSON());
             success(result);
             });
             },
             */
            /*locallyFilterHypeContacts: function (query, success, error) {
             var fetchingHypers = Appersonam.request("global:get:object", "Hypers");
             $.when(fetchingHypers).done(function (hypers) {
             if (query.length > 0) {
             var filterCollection = new Backbone.Collection(hypers.toJSON());
             filterCollection.each(function (item, index, collection) {//filtro in base alla query
             var firstName = "";
             if (item.get('firstName')) {
             firstName = item.get('firstName').toLowerCase();
             }
             var lastName = "";
             if (item.get('lastName')) {
             lastName = item.get('lastName').toLowerCase();
             }
             var phoneNumber = "";
             if (item.get('phoneNumber') && item.get('phoneNumber').length > 0) {
             phoneNumber = item.get('phoneNumber')[0];
             };
             var email = "";
             if (item.get('email') && item.get('email').length > 0) {
             email = item.get('email')[0];
             };
             var nickname = "";
             if (item.get('nickname')) {
             nickname = item.get('nickname').toLowerCase();
             }
             if (!(firstName.indexOf(query) > -1 || lastName.indexOf(query) > -1 || nickname.indexOf(query) > -1 || phoneNumber.toLocaleLowerCase().indexOf(query) > -1 || email.toLocaleLowerCase().indexOf(query) > -1)) {
             hypers.remove(item);
             }
             });
             }

             var result = new Entities.FilterPhoneContactsWrapper({ collection: hypers });
             success(result);
             });
             },
             */
        };
        Appersonam.reqres.setHandler("store:favourites", function() {
            return API.storeFavourites();
        });

        Appersonam.reqres.setHandler("store:personal", function() {
            return API.storePersonal();
        });

        Appersonam.reqres.setHandler("get:all:stored:contacts", function() {
            return API.getAllStoredContacts();
        });
        Appersonam.reqres.setHandler("get:favourites", function(query, except, index) {
            return API.getHypeFriends(query, except, index);
        });


        //old

        Appersonam.reqres.setHandler("personal:contacts", function(query) {
            return API.getMyContacts(query, new Entities.GenericContacts());
        });

        Appersonam.reqres.setHandler("new:contactslist", function(data) {
            if (data) {
                return new Entities.GenericContacts(data);
            } else {
                return new Entities.GenericContacts();
            }
        });

        Appersonam.reqres.setHandler("anonymize:contacts", function() {
            return API.getAnonymizedContacts();
        });

        Appersonam.reqres.setHandler("hype:friends", function(query) {
            return API.getHypeFriends(query);
        });
        Appersonam.reqres.setHandler("facebook:contacts", function(query, token) {
            return API.getFbContacts(query, token);
        });
        Appersonam.reqres.setHandler("legacy:contact:new", function() {
            return new Entities.MyContact();
        });
        Appersonam.reqres.setHandler("facebook:share", function(userID, token, message) {
            API.share(userID, token, message);
        });
        Appersonam.reqres.setHandler("update:stored:contacts", function(userID, token, message) {
            return API.updateStoredContacts();
        });
        Appersonam.reqres.setHandler("edit:personal", function(data) {
            if (data.id) {
                data.id = ('' + data.id).replace('my-', '');
            }
            return new Entities.MyContact(data);
        });
        Appersonam.reqres.setHandler("new:hypeFriend", function(data) {
            if (data.hypeId) { //per aggiungere un preferito serve l'id dell'utente hype
                data.id = data.hypeId;
                delete data.hypeId;
            }
            delete data.type;
            delete data.imageReal;
            if (data.email && data.email.length > 0) {
                data.email = data.email[0]
            } else {
                data.email = "";
            }
            if (data.phoneNumber && data.phoneNumber.length > 0) {
                data.phoneNumber = data.phoneNumber[0];
            } else {
                data.phoneNumber = "";
            }
            var newFriend = new Entities.HypeFriend(data);
            var id = newFriend.get('id');
            id = ('' + id).replace(/hy-/g, '');
            id = ('' + id).replace(/fv-/g, '');
            newFriend.set('id', id);
            newFriend.unset('imageValue');
            newFriend.unset('imageId');
            newFriend.unset('image');
            newFriend.unset('destination');
            newFriend.unset('oldId');
            newFriend.unset('type');
            return newFriend;
        });
    });

});
