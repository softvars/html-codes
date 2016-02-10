define(["app",
    "apps/login/profile/profile_view"
], function(Appersonam, View) {
    Appersonam.module("LoginApp.Profile", function(Profile, Appersonam, Backbone, Marionette, $, _) {
        Profile.Controller = {
            initializeDeviceVariables: function(hashMail, birthDate, cornerMenu) {
                //inizializzo variabili globali
                var that = this;
                Sella.deviceactions.getAppVersion(function() {
                    Sella.deviceactions.isDeviceIdPresent(function() {
                        that.firstStep(hashMail, birthDate, cornerMenu);
                    });
                });
            },
            canUseFingerPrint: function(profileView) {
                var success = function() {
                    profileView.model.set('canUseFingerprint', true);
                    profileView.render();
                };
                var failure = function() {
                    profileView.model.set('canUseFingerprint', false);
                    profileView.render();
                };
                FingerPrintPlugin.canUseFingerPrint(success, failure, {});
            },
            fingerPrintLogin: function(fingerPrintToken, profileView) {
                profileView.triggerMethod('use:fingerPrint', fingerPrintToken);
                Appersonam.CommonVariables.UsingFingerPrint = false;
            },
            isFingerPrintActive: function(profileView) {
                var that = this;
                var fetchingFingerPrint = Appersonam.request('global:get:object', 'fingerPrintActivated');
                $.when(fetchingFingerPrint).done(function(fingerPrint) {
                    if (fingerPrint === true) { //ho un token per il fingerprint memorizzato, attivo il login con touchID

                        Appersonam.CommonVariables.UsingFingerPrint = true; //se il telefono e' bloccato, l'evento resume di cordova controlla questa variabile
                        //in caso di login in corso tramite fingerprint, questo flag e' attivo e viene richiamato il fingerprintplugin
                        var useFingerPrintWrapper = function(fingerPrintToken) {
                            that.fingerPrintLogin(fingerPrintToken, profileView);
                        };
                        FingerPrintPlugin.getBiometricInfoSuccess = useFingerPrintWrapper;
                        FingerPrintPlugin.useFingerPrint(null, null, {});
                    } else { //non ho token per il fingerprint
                        that.canUseFingerPrint(profileView);
                    }
                });
            },
            activateFingerPrint: function() {
                var success = function(data) {
                    FingerPrintPlugin.activateFingerPrint(null, null, data.get('Bin'));
                    Appersonam.request('global:initialize:object', true, 'fingerPrintActivated');
                };
                var error = function() {

                };
                var enrollEntity = Appersonam.request('new:fingerprint:enroll');
                enrollEntity.save(null, {
                    withoutMethods: true,
                    noData: true,
                    success: success,
                    error: error
                });
            },
            readSms: function(data) {
                if (this.secondStepProfileView) {
                    this.secondStepProfileView.readSms(data);
                }
            },
            firstStep: function(hashMail, birthDate, cornerMenu) {
                var that = this;
                var fetchingWalkthrough = Appersonam.request("global:get:object", 'walkthrough');
                $.when(fetchingWalkthrough).done(function(showWalkthrough) {
                    if (showWalkthrough !== 'hide') {
                        Appersonam.LoginApp.trigger('walkthrough');
                    } else {
                        $('#dynmic-walkthrough-stylesheet').remove();
                    }
                });

                require(["entities/login"], function() {
                    fetchingHashMail = Appersonam.request("hash:isvalid", hashMail);
                    $.when(fetchingHashMail).done(function(hashMail) {
                        var loginEntity = Appersonam.request("login:first", hashMail, birthDate);
                        var profileView = new View.First({
                            model: loginEntity
                        });
                        profileView.on('form:submit', function(data) {
                            Appersonam.trigger('reset:loading');
                            if (hashMail) {
                                Appersonam.trigger('show:loading');
                            }
                            var useFingerPrint = data.useFingerprint;
                            var bin = undefined,
                                pin = undefined;
                            if (data.fingerPrintToken) {
                                bin = data.fingerPrintToken;
                            } else {
                                pin = data.pin;
                            }
                            var isValid = loginEntity.save({
                                platform: 'HYPEAPP',
                                codiceinternet: data.codiceinternet,
                                datanascita: data.datanascita,
                                checksum: data.checksum,
                                pin: pin,
                                bin: bin
                            }, {
                                serviceDestination: 'NEW',
                                noData: true,
                                withoutMethods: true,
                                success: function(model, response, options) {
                                    var pinExpired = (response.ErrorMessage.length > 0 && response.ErrorMessage[0].errorMessage.toLowerCase() === 'pin scaduto');
                                    var errorMessage = 'Hai inserito dei dati non validi, inserisci la tua data di nascita:';
                                    var isPlusCustomer = false;
                                    if (response.Check !== "OK") {
                                        var remainingTemptatives = parseFloat(response.remaining);
                                        var birthDate = true,
                                            email = true;
                                        if (remainingTemptatives > 0 && pinExpired === false) { 
                                            isPlusCustomer = Appersonam.CommonVariables.accountInfos.isPlusCustomer;
                                            birthDate = false;
                                            email = false;
                                            errorMessage = 'Password errata';

                                        } else {
                                            data.checksum = null;
                                            if (pinExpired) {
                                                errorMessage = 'Il tuo pin &egrave; scaduto';
                                            } else if (remainingTemptatives < 1) {
                                                errorMessage = 'Hai fatto troppi errori devi inserire altri dati!'
                                            }
                                            hashMail = null; //resetto l'hash che serve per la fast
                                            var xds = {}; //resetto il localstorage
                                            var savingXds = Appersonam.request("global:initialize:xds", xds); //salvo
                                        }
                                        Appersonam.CommonVariables['locked'] = true;
                                        $.when(savingXds).done(function() {
                                            Appersonam.trigger('close:loading');
                                            var codiceinternet = loginEntity.get('codiceinternet');
                                            loginEntity.clear().set({
                                                birthDate: birthDate,
                                                email: email,
                                                errorMessage: errorMessage,
                                                checksum: data.checksum,
                                                codiceinternet: codiceinternet,
                                                isPlusCustomer: isPlusCustomer
                                            });
                                            profileView.render();
                                        });

                                    } else {

                                        if (!hashMail) {
                                            Appersonam.LoginApp.trigger('secondstep', data.codiceinternet, data.remember);
                                            Appersonam.request('tracking:log:event', 'first_step_login_completed');
                                        } else {
                                            var xds = {};
                                            xds.gnt = 'ngt';
                                            xds.ashe = response.Checksum;

                                            var savingXds = Appersonam.request("global:initialize:xds", xds); //salvo
                                            Appersonam.CommonVariables['locked'] = false;
                                            $.when(savingXds).done(function() { //inizializzo il localstorage
                                                Appersonam.CommonVariables['ContactsUpdated'] = false;
                                                Appersonam.CommonVariables.isDealsActive = false; //servizio deal attivo
                                                Appersonam.CommonVariables.canShowDeals = true; //posso mostrare i deal
                                                Appersonam.CommonVariables.movementsFetched = false;
                                                Appersonam.trigger('activities', 'movements:list', true);
                                                Appersonam.CommonVariables['IbCode'] = response.code;
                                                Appersonam.CommonVariables['loggingOut'] = false;

                                                Appersonam.request('start:tracking', model.get('CodiceInternet'));

                                                //attivare il fingerprint se fast e useFingerPrint è true
                                                if (useFingerPrint === true) {
                                                    that.activateFingerPrint();
                                                }
                                                console.log('setto loggingOut a ' + Appersonam.CommonVariables['loggingOut']);
                                            });
                                        }
                                    }
                                },
                                error: function(result, resp) {
                                    console.log(resp.errorCode);
                                },
                            });
                            if (isValid !== true) {
                                Appersonam.trigger('close:loading');
                                this.triggerMethod("form:data:invalid", loginEntity.validationError);
                            }
                        });
                        profileView.on('show', function(data) {
                            if (this.model.get('checksum')) {
                                that.isFingerPrintActive(this);
                            }

                            Appersonam.trigger('reset:loading');
                            Appersonam.trigger('close:loading');
                            Appersonam.CommonVariables['locked'] = false;
                        });

                        var fetchingAccountInfos = Appersonam.request('global:get:object', 'customerAccountInfos');
                        $.when(fetchingAccountInfos).done(function(accountInfos) {
                            if(! _.isEmpty(accountInfos)){
                                Appersonam.CommonVariables['accountInfos'] = accountInfos;
                                profileView.model.set({isPlusCustomer: accountInfos.isPlusCustomer});
                            }
                            Appersonam.LoginApp.trigger('show:main', profileView);
                            if (cornerMenu === true) {
                                Appersonam.NavigationApp.trigger('corner:menu');
                            }
                        });
                    });
                });
            },
            secondStep: function(codiceinternet, remember) {
                //svuoto tutti gli elementi cachati
                Appersonam.request('global:initialize:object', false, 'fingerPrintActivated');
                Appersonam.request("global:delete:object", "financial");
                Appersonam.request("global:delete:object", "movements");
                Appersonam.request("global:delete:object", "userImage");
                Appersonam.request("global:delete:object", "userInfo");
                Appersonam.request("global:delete:object", "Favourites");
                Appersonam.request("global:delete:object", "Hypers");
                Appersonam.request("global:delete:object", "Personal");
                Appersonam.request("global:delete:object", "AllContacts");
                Appersonam.request("global:delete:object", "goals");
                Appersonam.request("global:delete:object", "customerAccountInfos");
                //PushNotificationPlugin.resetPreferences();


                var self = this;
                require(["entities/login"], function() {
                    Sella.deviceactions.getAppVersion(function() {
                        var loginEntity = Appersonam.request("login:second", codiceinternet);
                        self.secondStepProfileView = new View.Second({
                            model: loginEntity
                        });
                        self.secondStepProfileView.on('show', function(data) {
                            Appersonam.CommonVariables['locked'] = false;
                        });
                        self.secondStepProfileView.on('form:submit', function(data) {
                            Appersonam.trigger('reset:loading');
                            Appersonam.trigger('show:loading');
                            var isValid = loginEntity.save({
                                codiceinternet: codiceinternet,
                                pwd: data.password,
                                deviceid: 'blablabla',
                                platform: 'HYPEAPP',
                            }, {
                                serviceDestination: 'NEW',
                                noData: true,
                                withoutMethods: true,
                                success: function(model, response, options) {
                                    if (response.Check !== "OK") {
                                        hashMail = null;
                                        var xds = {}; //resetto il localstorage
                                        var savingXds = Appersonam.request("global:initialize:xds", xds); //salvo
                                        Appersonam.CommonVariables['locked'] = true;
                                        $.when(savingXds).done(function() {
                                            Appersonam.trigger('close:loading');
                                            Appersonam.LoginApp.trigger('login', null, true);

                                        });
                                    } else {
                                        //registrazione app per notifiche push
                                        Sella.deviceactions.registerPushService(response.Cod);
                                        var xds = {};
                                        xds.gnt = 'ngt';
                                        if (remember === true) {
                                            xds.ashe = response.Checksum;
                                        }

                                        var savingXds = Appersonam.request("global:initialize:xds", xds); //salvo
                                        Appersonam.CommonVariables['locked'] = false;
                                        $.when(savingXds).done(function() { //inizializzo il localstorage
                                            Appersonam.CommonVariables['ContactsUpdated'] = false;
                                            Appersonam.trigger('activities', 'movements:list', true);
                                            Appersonam.request('start:tracking', model.get('Cod'));
                                            Appersonam.CommonVariables['loggingOut'] = false;
                                            Appersonam.CommonVariables.isDealsActive = false; //servizio deal attivo
                                            Appersonam.CommonVariables.movementsFetched = false;
                                            Appersonam.CommonVariables.canShowDeals = true; //posso mostrare i deal
                                            console.log('setto loggingOut a ' + Appersonam.CommonVariables['loggingOut']);
                                            Appersonam.CommonVariables['IbCode'] = response.Cod;
                                        });
                                    }
                                },
                                error: function(result, resp) {
                                    console.log(resp.errorCode);
                                }
                            });
                            if (isValid === false) {
                                Appersonam.trigger('close:loading');
                                this.triggerMethod("form:data:invalid", loginEntity.validationError);
                            }
                        });
                        Appersonam.LoginApp.trigger('show:main', self.secondStepProfileView);
                    });
                });
            }
        }
    });
    return Appersonam.LoginApp.Profile.Controller;
});
