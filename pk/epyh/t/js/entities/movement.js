define(["app", "moment"], function (Appersonam, moment) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Movement = Backbone.Model.extend({
            urlRoot: "rest/movement",
        });

        Entities.AssociatedMovementsCollection = Backbone.Collection.extend({
            url: "rest/movementByGoal",
        });
        Entities.MovementCollection = Backbone.Collection.extend({
            //url: "rest/movements",
            url: "rest/paginated/allmovements",
            model: Entities.Movement,
            comparator: function (movement) {
                return (-(movement.get("date")));
            }
        });

        Entities.P2PMovementObject = Backbone.Model.extend({
            urlRoot: "rest/social/getcontact"
        });
        Entities.MovementInfoObject = Backbone.Model.extend({
            urlRoot: "rest/social/getcontactbymovementid"
        });

        Entities.SearchMovementObject = Backbone.Model.extend({
            urlRoot: "rest/search"
        });

        Entities.P2PMovementsCollection = Backbone.Model.extend({
            save: function (attributes, options) {
                options.serviceDestination = 'NEW';
                options.withoutMethods = true;
                //options.data = { amount: this.get('amount') };
                Backbone.Model.prototype.save.call(this, attributes, options);
            },
            url: "/REALINFO/P2P/payment"
        });

        Entities.P2PMovement = Backbone.Model.extend({
            url: "/REALINFO/P2P/payment",
            initialize: function (data) {
                this.clear();
                var type = '',
                    p2p_type = '',
                    mate = '',
                    p2p_title = '',
                    id = '';
                var mateFirstName = null,
                    mateLastName = null,
                    reference = null,
                    movementDate = null;
                if (data.counterpart.firstName || data.counterpart.lastName) {
                    mate = '' + data.counterpart.firstName + ' ' + data.counterpart.lastName;
                    mateFirstName = data.counterpart.firstName;
                    mateLastName = data.counterpart.lastName;

                } else {
                    mate = data.counterpart.aliasValue;
                }
                reference = data.counterpart.aliasValue;
                if (data.operation === 'Cr') {
                    type = 'income';
                } else {
                    type = 'outcome';
                }
                if (data.status.code === 'REQUESTED_OK' && data.operation === 'Cr') {
                    p2p_type = 'request_out';
                    p2p_title = 'hai chiesto ' + data.amount + '&euro; a ' + mate;
                } else if (data.status.code === 'REQUESTED_OK' && data.operation === 'Db') {
                    p2p_type = 'request_in';
                    p2p_title = mate + ' ti ha chiesto ' + data.amount + '&euro;';
                }
                    //else if (data.status.code === 'REJECT_OK') {

                    //    if (data.operation === 'Cr') {
                    //        p2p_title = mate + ' ha rifiutato la tua richiesta di pagamento';
                    //        p2p_type = 'reject_in';
                    //    }
                    //    else {
                    //        p2p_title = ' hai rifiutato la richiesta di pagamento di ' + mate;
                    //        p2p_type = 'reject_out';
                    //    }
                    //}
                else if (data.status.code === 'INT_OK') {
                    if (type === 'income') {
                        p2p_title = mate + ' ti ha inviato ' + data.amount + '&euro;';
                        p2p_type = 'receive_pending';
                    } else {
                        p2p_type = 'send_pending';
                        p2p_title = 'Pagamento a ' + mate + ' di ' + data.amount + '&euro; in sospeso';
                    }
                } else if (data.status.code === 'PAY_OK') {
                    p2p_type = 'send';
                    if (type === 'income') {
                        p2p_title = mate + ' ti ha inviato ' + data.amount + '&euro;';
                    } else {
                        p2p_title = 'hai inviato ' + data.amount + '&euro; a ' + mate;
                    }
                }

                id = 'p2p' + data.id

                movementDate = new Date(moment(data.paymentDate.split(' ')[0], 'DD/MM/YYYY').format('YYYY-MM-DD')).setHours(0, 0, 0, 0);
                this.set({
                    amount: data.amount,
                    causal: data.description,
                    title: data.description,
                    paymentReferenceNumber: data.paymentReference.paymentReferenceNumber,
                    date: movementDate,
                    subType: 'p2p',
                    goal: null,
                    category: null,
                    type: type,
                    mate: mate,
                    mateFirstName: mateFirstName,
                    mateLastName: mateLastName,
                    mateReference: mateReference,
                    p2p_type: p2p_type,
                    p2p_title: p2p_title,
                    memo: data.description
                });
            }
        });


        Entities.P2PMovementCollection = Backbone.Collection.extend({
            url: "/REALINFO/P2P/payment",
            model: Entities.P2PMovement,
            initialize: function () { }
        });


        Entities.CancelTransfer = Backbone.Model.extend({
            url: "rest/cancel",
            defaults: {
                deviceid: 'blablabla'
            },
            save: function (attributes, options) {
                options.serviceDestination = 'NEW';
                options.noData = true;
                options.data = {
                    idBonifico: attributes.idBonifico
                };
                options.withoutMethods = true;
                Backbone.Model.prototype.save.call(this, attributes, options);
            }
        });

        var API = {
            getAssociatedMovements: function (goalId) {
                var defer = $.Deferred();
                var entities = new Entities.AssociatedMovementsCollection();
                entities.fetch({

                    data: { id: goalId },
                    showLoading: false,
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        console.log('ERRORE RICHIESTA MOVIMENTI P2P');
                        console.log(data.toJSON());
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getPeerInfo: function (data, showLoading) {
                if (showLoading === undefined || showLoading === null) {
                    showLoading = true;
                }
                var defer = $.Deferred();
                var promise = defer.promise();
                var entity = new Entities.PeerInfoObject();
                if (data.mateReference) {
                    var value = data.mateReference;
                }
                else if (data.reference) {
                    var value = data.reference;
                }
                else {
                    var value = data.id;
                }
                entity.fetch({
                    data: {
                        value: ('' + value).toLowerCase()
                    },
                    showLoading: showLoading,
                    success: function (resultData) {
                        if (resultData.get('imageReal')) {
                            data.image = resultData.get('imageReal').content;
                        } else {
                            data.image = '';
                        }
                        var movement = new Entities.Movement(data);
                        defer.resolve(movement);
                    },
                    error: function (resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return promise;
            },
            getMovementDetails: function (data, showLoading, itemId) {
                //itemId serve a tenere traccia di dove si trova l'oggetto nella collezione da cui proviene (vedi richiedi denaro)
                if (showLoading === undefined || showLoading === null) {
                    showLoading = true;
                }
                var defer = $.Deferred();
                if (data && data.subType === 'p2p' && data.p2pType !== 'send_pending') { //p2p
                    var promise = defer.promise();
                    if (data.accounted === true) {//movimento pending
                        var entity = new Entities.MovementInfoObject();
                    }
                    else {
                        var entity = new Entities.P2PMovementObject();
                    }
                    if (data.mateReference) {
                        var value = data.mateReference;
                    } else if (data.reference) {
                        var value = data.reference;
                    }
                    else {
                        var value = data.id;
                    }
                    entity.fetch({
                        data: {
                            value: ('' + value).toLowerCase()
                        },
                        showLoading: showLoading,
                        success: function (resultData) {
                            if (resultData.get('imageReal')) {
                                data.image = resultData.get('imageReal').content;
                            } else {
                                data.image = '';
                            }
                            var movement = new Entities.Movement(data);
                            if (itemId !== null && itemId !== undefined) {
                                movement.set({ itemId: itemId });
                            }
                            defer.resolve(movement);
                        },
                        error: function (resultData) {
                            defer.resolve(new Backbone.Model());
                        }
                    });
                    return promise;
                } else {
                    var promise = defer.promise();
                    var movement = new Entities.Movement(data);
                    if (itemId !== null && itemId !== undefined) {
                        movement.set({ itemId: itemId });
                    }
                    defer.resolve(movement);
                    return promise;
                }
            },
            getP2PMovements: function (data) {
                var defer = $.Deferred();
                var entities = new Entities.P2PMovementsCollection(data);
                entities.save(null, {
                    serviceDestination: 'NEW',
                    showLoading: false,
                    success: function (data) {
                        var collection = new Entities.P2PMovementCollection(data.get('TransactionDetail'));
                        defer.resolve(collection);
                    },
                    error: function (data) {
                        console.log('ERRORE RICHIESTA MOVIMENTI P2P');
                        console.log(data.toJSON());
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            searchMovements: function (query) {
                var defer = $.Deferred();
                var entities = new Entities.SearchMovementObject();
                entities.fetch({
                    data: {
                        searchType: "movements",
                        query: query
                    },
                    showLoading: false,
                    success: function (data) {
                        //var collection = new Entities.MovementCollection(data.get("movements"));
                        defer.resolve(data);
                    },
                    error: function (data) {
                        console.log('ERRORE RICHIESTA MOVIMENTI Ricerca');
                        console.log(data.toJSON());
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            mergeMovements: function (defer, normalMovements, lastMovementDate) {
                //la lista movimenti normale arriva dal più recente al più lontano nel tempo
                //per i p2p fromDate è il più lontano nel tempo, toDate è il più recente
                //lastMovementDate e endDate sono in millisecondi, sono quelle dei movimenti normali
                //i movimenti p2p usano fromDate e toDate, in formato europeo
                console.log('lastMovementDate  ' + new Date(lastMovementDate));
                var ninetyDays = 7776000000;
                var sixMonths = 15552000000;
                var oneDay = 86400000;
                //lastMovementDate -= oneDay;
                var toDate = moment(new Date(lastMovementDate)).format('DD/MM/YYYY');
                if (normalMovements.length > 0) {
                    console.log('normalMovements.last  ' + new Date(normalMovements.last().get('date')));
                    var endDate = normalMovements.last().get('date'); //endDate per i movimenti normali è la data più lontana
                    if (lastMovementDate - endDate > ninetyDays) {
                        endDate = lastMovementDate - ninetyDays; //la differenza tra due date richieste è al massimo 90 giorni
                    }
                } else {
                    endDate = lastMovementDate - ninetyDays; //la differenza tra due date richieste è al massimo 90 giorni
                }
                if ((new Date()).getTime() - endDate >= sixMonths) {
                    endDate = (new Date()).getTime() - sixMonths; //la data più lontana richiedibile è di 180 giorni fa
                }
                var fromDate = moment(new Date(endDate)).format('DD/MM/YYYY');
                var fetchingP2p = API.getP2PMovements({
                    statuses: {
                        status: [{
                            code: 'REQUESTED_OK'
                        },
                            //{ code: 'REJECT_OK' },
                            {
                                code: 'INT_OK'
                            }
                        ]
                    },
                    contactChannel: "HYPE",
                    fromDate: fromDate,
                    toDate: toDate
                });
                $.when(fetchingP2p).done(function (fetchedP2p) {
                    var finalCollection = new Entities.MovementCollection();
                    finalCollection.add(fetchedP2p.toJSON(), {
                        silent: true
                    });
                    delete fetchedP2p;
                    finalCollection.add(normalMovements.toJSON());
                    defer.resolve(finalCollection);
                });
            },
            getMovementEntities: function (startIndex, endIndex, lastMovementDate) {
                var self = this;
                var entities = new Entities.MovementCollection();
                var defer = $.Deferred();
                entities.fetch({
                    showLoading: false,
                    data: {
                        start: startIndex,
                        end: endIndex
                    },
                    serviceDestination: 'NEW',
                    success: function (data) {
                        defer.resolve(data);
                        //self.mergeMovements(defer, data, lastMovementDate);
                    },
                    error: function (data) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getFileEntity: function (id, target) {
                var entity = new Entities.GetFile();
                var defer = $.Deferred();
                if (id) {
                    entity.fetch({
                        data: {
                            id: id
                        },
                        success: function (resultData) {
                            if (!resultData.get('content')) {
                                resultData.set({
                                    content: ''
                                });
                            }
                            resultData.set({
                                target: target
                            });
                            defer.resolve(resultData);
                        },
                        error: function (resultData) {
                            resultData.set({
                                target: target,
                                content: ''
                            });
                            defer.resolve(resultData);
                        }
                    });
                    return defer.promise();
                } else {
                    var promise = defer.promise();
                    defer.resolve(new Backbone.Model({
                        target: target,
                        content: ''
                    }));
                    return promise;
                }
            },
            getMovementEntity: function (entityId) {
                var entity = new Entities.Movement();
                var defer = $.Deferred();
                entity.fetch({
                    serviceDestination: 'NEW',
                    data: {
                        id: entityId
                    },
                    success: function (resultData) {
                        defer.resolve(resultData);
                    },
                    error: function (resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return defer.promise();
            }
        };

        Appersonam.reqres.setHandler("movement:entities", function (startIndex, endIndex, lastMovementDate, collection, firstTime) {
            if (collection) {
                var defer = $.Deferred();
                var promise = defer.promise();
                if (firstTime) { //primo caricamento della lista movimenti
                    setTimeout(function () {
                        defer.resolve(collection);
                        //API.mergeMovements(defer, new Entities.MovementCollection(collection), lastMovementDate);
                    }, 10);
                } else { //ho switchato da goal a movimenti, quindi non devo ricaricare la lista
                    setTimeout(function () {
                        defer.resolve(new Entities.MovementCollection(collection));
                    }, 10);
                }
                return promise;
            } else {
                return API.getMovementEntities(startIndex, endIndex, lastMovementDate);
            }
        });

        Appersonam.reqres.setHandler('movement:new:collection', function (data) {
            return new Entities.MovementCollection(data);
        });

        Appersonam.reqres.setHandler("movement:search:entities", function (query) {
            return API.searchMovements(query);
        });

        Appersonam.reqres.setHandler("associated:movements", function (goalId) {
            return API.getAssociatedMovements(goalId);
        });

        Appersonam.reqres.setHandler('new:entity', function (data) {
            return new Entities.Movement(data);
        });

        Appersonam.reqres.setHandler("movement:entity", function (id) {
            return API.getMovementEntity(id);
        });
        Appersonam.reqres.setHandler("movement:p2p:entities", function (destination) {
            return API.getP2PEntities();
        });
        Appersonam.reqres.setHandler("movement:entity:new", function (data, showLoading, itemId) {
            return API.getMovementDetails(data, showLoading, itemId);
        });
        Appersonam.reqres.setHandler("peer:info", function (data, showLoading) {
            return API.getPeerInfo(data, showLoading);
        });

        Appersonam.reqres.setHandler("cancel:transfer", function (bonificoid, aliasib) {
            return new Entities.CancelTransfer({
                bonificoid: bonificoid,
                aliasib: aliasib
            });
        });
    });
    return;
});