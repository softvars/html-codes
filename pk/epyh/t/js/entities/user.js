define(["app", "sjcl"], function(Appersonam, sjcl) {
    Appersonam.module("Entities", function(Entities, Appersonam, Backbone, Marionette, $, _) {

        Entities.BigStartResume = Backbone.Model.extend({
            url: 'rest/experienceapi/mobileapp/hypestart',
            //url: "financialSituation",
        });

        Entities.AllUserInfo = Backbone.Model.extend({
            url: 'rest/business/manageProfile',
            //url: "financialSituation",
        });

        //Entities.SellaBoxDocument = Backbone.Model.extend({
        //    urlRoot: "INFO/GETSELLABOXDOC.SPR"
        //});

        Entities.SellaBoxDocuments = Backbone.Model.extend({
            url: "INFO/GETSELLADIGITDOCLIST.SPR"
        });

        Entities.OpenPdfEntity = Backbone.Model.extend({
            url: "INFO/GETSELLADIGITDOC.SPR",
            defaults: {
                isPdf: true
            }
        });

        Entities.SellaBoxDisclaimer = Backbone.Model.extend({
            url: 'INFO/GETSBXDISCSTATUS.SPR',
            //url: "financialSituation",
        });

        Entities.SellaBoxAcceptDisclaimer = Backbone.Model.extend({
            url: 'INFO/PUTSBXDISCSTATUS.SPR',
            //url: "financialSituation",
        });

        Entities.AddAlias = Backbone.Model.extend({
            url: "/REALINFO/P2P/user/alias/add",
            defaults: {
                contactChannel: 'HYPE'
            },
            validate: function(attrs, options) {
                var errors = {};
                var aliasType = "";
                if (attrs.aliasType === 'M') {
                    aliasType = "numero di telefono";

                    if (attrs.alias.indexOf('0039') === 0) {
                        attrs.alias = attrs.alias.replace('0039', '+39');
                        this.set({
                            alias: attrs.alias
                        });
                    } else if (attrs.alias.indexOf('+39') !== 0) {
                        attrs.alias = '+39' + attrs.alias;
                        this.set({
                            alias: attrs.alias
                        });
                    }
                } else {
                    aliasType = "email";
                    attrs.alias = attrs.alias.toLowerCase();
                    this.set({
                        alias: attrs.alias
                    });
                }
                if (!attrs.alias) {
                    errors.alias = "Inserisci " + aliasType;
                } else if (!((/^([00|\+]+\d{2})?3\d{9}$/.test(attrs.alias) && attrs.aliasType === 'M') || (/^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(attrs.alias) && attrs.aliasType === 'E'))) {
                    errors.alias = "Inserire un valore valido";
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });
        Entities.RemoveAlias = Backbone.Model.extend({
            url: "/REALINFO/P2P/user/alias/remove"
        });
        Entities.SetPrimary = Backbone.Model.extend({
            url: "rest/business/usersettings/change"
        });
        Entities.ConfirmAlias = Backbone.Model.extend({
            url: "/REALINFO/P2P/user/alias/confirm",
            validate: function(attrs, options) {
                var errors = {};
                if (!attrs.otp) {
                    errors.otp = "Inserisci codice di conferma";
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });
        /*
                Entities.ActiveAliasListContainer = Backbone.Model.extend({
                    url: "/REALINFO/P2P/user/alias"
                });
                Entities.ActiveAliasListContainer = Backbone.Model.extend({
                    url: "/REALINFO/P2P/user/alias/inactivelist"
                });
                
                */
        Entities.AllAliasList = Backbone.Model.extend({
            url: "rest/business/usersettings/alias"
        });

        Entities.InactiveAliasItem = Backbone.Model.extend({
            defaults: {
                active: false, //activeordervalue e defaultoerdervalue servono per il sort: i valori false corrispondono a 2, che è maggiore di 1
                activeOrderValue: 2
            }
        });
        Entities.ActiveAliasItem = Backbone.Model.extend({
            defaults: {
                active: true,
                activeOrderValue: 1
            }
        });
        Entities.InactiveAliasList = Backbone.Collection.extend({
            model: Entities.InactiveAliasItem
        });

        Entities.ActiveAliasList = Backbone.Collection.extend({
            model: Entities.ActiveAliasItem
        });

        Entities.BaseAlias = Backbone.Model.extend({
            initialize: function() {
                if (this.get('aliasType')) {
                    this.set({
                        type: this.get('aliasType')
                    });
                    this.unset(('aliasType'));
                }
                if (this.get('aliasType')) {
                    this.set({
                        value: this.get('alias')
                    });
                    this.unset(('alias'));
                }
            }
        });

        Entities.AliasList = Backbone.Collection.extend({
            model: Entities.BaseAlias,
            setDefault: function(mail, phone) {
                phone = phone.replace('+39', '').replace('0039', '');
                var emailFound = false;
                var phoneFound = false;
                this.each(function(item, index, collection) { //setto gli alias predefiniti, immutabili
                    var alias = item.get("alias").replace('+39', '').replace('0039', '').toLowerCase();
                    if (alias === mail.toLowerCase()) {
                        emailFound = true;
                        item.set({
                            active: true,
                            activeOrderValue: 1,
                            defaultAlias: true,
                            defaultOrderValue: 1
                        });
                    } else if (alias === phone) {
                        phoneFound = true;
                        item.set({
                            active: true,
                            activeOrderValue: 1,
                            defaultAlias: true,
                            defaultOrderValue: 1
                        });
                    } else {
                        item.set({
                            defaultOrderValue: 2
                        });
                    }
                });
                if (!emailFound) { //dai p2p possono non arrivare la mail o il numero di telefono con cui ci si è registrato, che comuinque prendo da userdata
                    this.add({
                        active: true,
                        defaultOrderValue: 1,
                        activeOrderValue: 1,
                        alias: mail,
                        defaultAlias: true,
                        aliasType: 'E'
                    });
                }
                if (!phoneFound) {
                    this.add({
                        active: true,
                        defaultOrderValue: 1,
                        activeOrderValue: 1,
                        alias: phone,
                        defaultAlias: true,
                        aliasType: 'M'
                    });
                }
            },
            comparator: function(item) {
                console.log(JSON.stringify(item));
                var activeValue = 1;
                if (item.get('active') === true) {
                    activeValue = 0;
                }
                return activeValue + item.get('value');
                //return ('' + item.get("aliasType") /*+ item.get("defaultOrderValue") + item.get('activeOrderValue')*/ );
            },
        });

        Entities.ChangePin = Backbone.Model.extend({
            urlRoot: 'INFO/CHANGEPIN.SPR',
            validate: function(attrs, options) {
                var errors = {};
                if (!attrs.Oldpin) {
                    errors.Oldpin = "Inserisci la vecchia password";
                } else if (('' + attrs.Oldpin).length > 8) {
                    errors.Oldpin = "Password non valida";
                }
                if (('' + attrs.Newpin).length === 8 && ('' + attrs.Newpinconfirm).length === 8) {
                    if (attrs.Newpin === attrs.Oldpin) {
                        errors.Newpinconfirm = "La nuova password deve essere diversa da quella vecchia";
                    } else if (attrs.Newpin !== attrs.Newpinconfirm) {
                        errors.Newpinconfirm = "Nuova password e conferma nuova password devono essere uguali";
                        errors.Newpin = "Nuova password e conferma nuova password devono essere uguali";
                    }
                } else {
                    if (!attrs.Newpin) {
                        errors.Newpin = "Inserisci la nuova password";
                    } else if (('' + attrs.Newpin).length !== 8) {
                        errors.Newpin = "Password non valida";
                    }
                    if (!attrs.Newpinconfirm) {
                        errors.Newpinconfirm = "Conferma la nuova password";
                    } else if (('' + attrs.Newpinconfirm).length !== 8) {
                        errors.Newpinconfirm = "Password non valida";
                    }
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            },
            save: function(attributes, options) {
                options.data = $.extend(options.data, attributes);
                Backbone.Model.prototype.save.call(this, attributes, options);
                if (this.validationError) {
                    return false;
                } else {
                    return true;
                }
            }
        });
        Entities.UserReportEntity = Backbone.Model.extend({
            url: 'rest/business/userreport',
            //url: "financialSituation",
        });
        Entities.UserEntity = Backbone.Model.extend({
            url: 'rest/business/usersettings/',
            //url: "financialSituation",
        });
        Entities.UserCoordinates = Backbone.Model.extend({
            url: 'rest/business/usersettings/bankaccount',
            //url: "financialSituation",
        });
        Entities.SendMailEntity = Backbone.Model.extend({
            urlRoot: "",
            save: function(attributes, options) {
                var that = this;
                Sella.deviceactions.getAppVersion(function(version) {
                    try {
                        var success = options.success;
                        var error = function(ex) {
                            if (ex) {
                                LogDB.log('errore invio mail => ' + ex.message);
                            }
                            options.error();
                        };
                        that.validationError = that.validate(that.toJSON(), options);
                        if (!_.isEmpty(that.validationError)) {
                            return false;
                        } else {
                            var deviceInfos = Appersonam.request('global:get:device');
                            deviceInfos.appVersion = version;
                            deviceInfos = sjcl.encrypt("aip-sec399delcavagnet", JSON.stringify(deviceInfos));
                            Sella.deviceactions.sendMail(that.get('to'), that.get('subject'), that.get('message'), that.get('report'), that.get('contacts'), deviceInfos, success, error);
                        }
                    } catch (ex) {
                        if (ex) {
                            Appersonam.trigger('close:loading');
                            LogDB.log('errore invio mail => ' + ex.message);
                        }
                        options.error();
                    }
                });
            },
            validate: function(attrs, options) {
                /* var errors = {}
                 if (!attrs.email || (/^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(attrs.email) !== true)) {
                     errors.email = "Inserire una mail valida";
                 }
                 return errors;*/
                return {};
            }
        });
        /*Entities.SendMailEntity = Backbone.Model.extend({
            url: '/',
            save: function () {
        
            },
            validate: function (attrs, options) {
                var errors = {}
                if (!attrs.email || (/^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(attrs.email) !== true)) {
                    errors.email = "Inserire una mail valida";
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        
        });*/
        var API = {
            openPdf: function(pdfid) {
                var entity = new Entities.OpenPdfEntity();
                entity.fetch({
                    data: {
                        pdfid: pdfid,
                        isPdf: true
                    },
                    showLoading: true,
                });
            },
            getSellaboxDocuments: function() {
                var entities = new Entities.SellaBoxDocuments();
                var defer = $.Deferred();
                var today = moment(new Date()).format('DD/MM/YYYY');
                var lastYear = new Date().getFullYear() - 1;
                var oldDate = moment(new Date().setFullYear(lastYear)).format('DD/MM/YYYY');
                entities.fetch({
                    data: {

                    },
                    showLoading: true,
                    success: function(resultData) {
                        defer.resolve(new Backbone.Collection(resultData.get('lista')));
                    },
                    error: function(resultData) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                return defer.promise();
            },
            getSellaboxDisclaimer: function(showLoading) {
                var entity = new Entities.SellaBoxDisclaimer();
                if (showLoading) {
                    showLoading = false;
                }
                var defer = $.Deferred();
                entity.fetch({
                    showLoading: showLoading,
                    success: function(resultData) {
                        defer.resolve(resultData);
                    },
                    error: function(resultData) {
                        defer.resolve(new Backbone.Model({
                            "ErrorMessage": "",
                            "WarningMessage": "",
                            "show": "true"
                        }));
                    }
                });
                return defer.promise();
            },

            getAllUserInfo: function(showLoading) {
                var entity = new Entities.AllUserInfo();
                var defer = $.Deferred();
                entity.fetch({
                    showLoading: showLoading,
                    serviceDestination: 'NEW',
                    success: function(resultData) {
                        defer.resolve(resultData);
                    },
                    error: function(resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return defer.promise();
            },

            getprimaryMail: function() {
                var defer = $.Deferred();
                var entities = new Entities.AllAliasList();
                entities.fetch({
                    serviceDestination: 'NEW',
                    showLoading: false,
                    withoutMethods: true,
                    success: function(result) {
                        var primaryMail = result.get('primaryMail');
                        var primaryPhone = result.get('primaryPhone');
                        defer.resolve(primaryMail);
                    },
                    error: function(data) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            },

            getAllAliasList: function(principalMail, principalPhone) {
                var defer = $.Deferred();
                var entities = new Entities.AllAliasList();
                entities.fetch({
                    serviceDestination: 'NEW',
                    showLoading: false,
                    withoutMethods: true,
                    success: function(result) {
                        var phoneArray = result.get('secondaryPhone');
                        var mailArray = result.get('secondaryMail');
                        var primaryMail = result.get('primaryMail');
                        var primaryPhone = result.get('primaryPhone');

                        defer.resolve({
                            emailList: new Entities.AliasList(mailArray),
                            phoneList: new Entities.AliasList(phoneArray),
                            primaryMail: new Backbone.Model({
                                value: primaryMail,
                                type: 'E',
                                anyAliases: (mailArray.length > 0),
                                maxReached: (mailArray.length >= Appersonam.CommonVariables.aliasesLimit)
                            }),
                            primaryPhone: new Backbone.Model({
                                value: primaryPhone,
                                type: 'M',
                                anyAliases: (phoneArray.length > 0),
                                maxReached: (phoneArray.length >= Appersonam.CommonVariables.aliasesLimit)
                            })
                        });
                    },
                    error: function(data) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            },

            getInactiveAliases: function() {
                var defer = $.Deferred();
                var entities = new Entities.InactiveAliasListContainer();
                entities.save(null, {
                    serviceDestination: 'NEW',
                    showLoading: false,
                    withoutMethods: true,
                    success: function(data) {
                        var collection = new Entities.InactiveAliasList(data.get('UserAlias'));
                        defer.resolve(collection);
                    },
                    error: function(data) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getActiveAliases: function() {
                var defer = $.Deferred();
                var entities = new Entities.ActiveAliasListContainer({});
                entities.save(null, {
                    serviceDestination: 'NEW',
                    withoutMethods: true,
                    noData: true,
                    showLoading: false,
                    success: function(data) {
                        var collection = new Entities.ActiveAliasList(data.get('UserAlias'));
                        defer.resolve(collection);
                    },
                    error: function(data) {
                        defer.resolve(new Backbone.Collection());
                    }
                });
                var promise = defer.promise();
                return promise;
            },
            getInitialResume: function() {
                var entity = new Entities.BigStartResume();
                var defer = $.Deferred();
                entity.fetch({
                    serviceDestination: 'NEW',
                    data: {
                        start: 0,
                        end: 19
                    },
                    success: function(resultData) {
                        defer.resolve(resultData);
                    },
                    error: function(resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return defer.promise();
            },
            getUserReportEntity: function() {
                var entity = new Entities.UserReportEntity();
                var defer = $.Deferred();
                entity.fetch({
                    serviceDestination: 'NEW',
                    success: function(resultData) {
                        defer.resolve(resultData);
                    },
                    error: function(resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return defer.promise();
            },
            getUserCoordinatesEntity: function() {
                var entity = new Entities.UserCoordinates();
                var defer = $.Deferred();
                entity.fetch({
                    serviceDestination: 'NEW',
                    success: function(resultData) {
                        defer.resolve(resultData);
                    },
                    error: function(resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return defer.promise();
            },
            getUserEntity: function() {
                var entity = new Entities.UserEntity();
                var defer = $.Deferred();
                entity.fetch({
                    serviceDestination: 'NEW',
                    success: function(resultData) {
                        defer.resolve(resultData);
                    },
                    error: function(resultData) {
                        defer.resolve(new Backbone.Model());
                    }
                });
                return defer.promise();
            }
        };

        Appersonam.reqres.setHandler("user:resume", function() {
            return API.getUserReportEntity();
        });

        Appersonam.reqres.setHandler("user:changepin", function() {
            return new Entities.ChangePin();
        });

        Appersonam.reqres.setHandler("initial:resume", function() {
            return API.getInitialResume();
        });

        Appersonam.reqres.setHandler("user:coordinates", function() {
            return API.getUserCoordinatesEntity();
        });

        Appersonam.reqres.setHandler("user:active:aliases", function() {
            return API.getActiveAliases();
        });

        Appersonam.reqres.setHandler("user:inactive:aliases", function() {
            return API.getInactiveAliases();
        });

        Appersonam.reqres.setHandler('new:alias', function(aliasType) {
            return new Entities.AddAlias({
                aliasType: aliasType
            });
        });

        Appersonam.reqres.setHandler('accept:disclaimer:entity', function() {
            return new Entities.SellaBoxAcceptDisclaimer();
        });

        Appersonam.reqres.setHandler('get:all:user:info', function(showLoading) {
            return API.getAllUserInfo(showLoading);
        });

        Appersonam.reqres.setHandler('activate:alias', function(data, otp) {
            var confirmAlias = new Entities.ConfirmAlias({
                aliasType: data.type,
                alias: data.value.toLowerCase(),
                contactChannel: 'HYPE',
                otp: otp
            });
            return confirmAlias;
        });

        Appersonam.reqres.setHandler('delete:alias', function(data) {
            var removeAlias = new Entities.RemoveAlias({
                aliasType: data.type,
                alias: data.value.toLowerCase(),
                contactChannel: 'HYPE'
            });
            return removeAlias;
        });

        Appersonam.reqres.setHandler('set:primary:entity', function(data) {
            var newPrimary = new Entities.SetPrimary({
                aliasType: data.type,
                alias: data.value.toLowerCase(),
                contactChannel: 'HYPE'
            });
            return newPrimary;
        });


        Appersonam.reqres.setHandler("user:entity", function() {
            return API.getUserEntity();
        });

        Appersonam.reqres.setHandler("sellabox:disclaimer", function(showLoading) {
            return API.getSellaboxDisclaimer(showLoading);
        });

        Appersonam.reqres.setHandler("open:pdf", function(pdfId) {
            return API.openPdf(pdfId);
        });

        Appersonam.reqres.setHandler('user:all:aliases', function(principalMail, principalPhone) {
            return API.getAllAliasList(principalMail, principalPhone);
        });

        Appersonam.reqres.setHandler('empty:alias', function(data) {
            return new Entities.BaseAlias(data);
        });

        Appersonam.reqres.setHandler('empty:alias:list', function(data) {
            return new Entities.AliasList(data);
        });

        Appersonam.reqres.setHandler("sellabox:entities", function() {
            return API.getSellaboxDocuments();
        });

        Appersonam.reqres.setHandler("new:user:entity", function(data) {
            return new Entities.UserEntity(data);
        });

        Appersonam.reqres.setHandler("coordinates:mail:entity", function(entity, data, sender) {
            var message = 'Ciao,' + '\n' + 'di seguito trovi le coordinate bancarie della Carta Hype di ' + sender.toUpperCase() + ':\n\n';
            var keys = Object.keys(entity);
            var i = 0;
            keys.forEach(function(key) {
                if (key !== 'id') {
                    message += key.toUpperCase() + ': ' + entity[key];
                    if (i + 1 < keys.length) {
                        message += '\n';
                    }
                }
                i++;
            });
            message += '\n' + 'Il Team di Hype';
            var subject = 'Coordinate Bancarie della Carta Hype di ' + sender.toUpperCase();
            var sendEmailEntity = new Entities.SendMailEntity({
                to: '',
                message: message,
                subject: subject
            });
            return sendEmailEntity;
        });

        Appersonam.reqres.setHandler("primary:mail", function() {
            return API.getprimaryMail();
        });

        Appersonam.reqres.setHandler("mail:entity", function(message, subject, destination) {
            var sendEmailEntity = new Entities.SendMailEntity({
                message: message,
                subject: subject,
                to: destination
            });
            return sendEmailEntity;
        });
    });

    return;

});
