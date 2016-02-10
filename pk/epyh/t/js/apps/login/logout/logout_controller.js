define(["app",
    "apps/login/profile/profile_view"
], function(Appersonam, View) {
    Appersonam.module("LoginApp.Profile", function(Profile, Appersonam, Backbone, Marionette, $, _) {
        Profile.Controller = {
            logout: function(birthDate) {
                //Appersonam.request("reset:timeoutHandle");
                this.destroyCookies();
                this.resetCachedData();

                var savingXds = Appersonam.request("global:initialize:xds", null); //salvo
                Appersonam.CommonVariables['locked'] = true;
                $.when(savingXds).done(function() {
                    Appersonam.request('global:delete:object', 'movements');
                    Appersonam.request('global:delete:object', 'financial');
                    Appersonam.NavigationApp.trigger('hide:menu');
                    Appersonam.LoginApp.trigger('login', null, birthDate, false);
                    Appersonam.NavigationApp.trigger('set:selected', 'movements', 0);
                });
                var fetchingFingerPrint = Appersonam.request('global:get:object', 'fingerPrintActivated');
                $.when(fetchingFingerPrint).done(function(fingerPrint) {
                    if (fingerPrint === true) {
                        Appersonam.request('global:initialize:object', false, 'fingerPrintActivated');
                        FingerPrintPlugin.deleteBiometricInfo();
                    }
                });
            },

            returnToMain: function(hashMail) {
                location.reload();
            },

            resetCachedData: function() {
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
            },

            destroyCookies: function() {
                console.log('distruzione cookies');
                Appersonam.CommonVariables['locked'] = true;
                SellaWs._cookiejar = {}; //
                WebViewPlugin.destroyCookies(Sella.deviceactions.noop(),
                    Sella.deviceactions.noop());
            },

            lockScreen: function(ashe) {
                var self = this;
                require(["entities/login"], function() {
                    var loginEntity = Appersonam.request("login:first", ashe, null);
                    var profileView = new View.First({
                        model: loginEntity
                    });
                    profileView.on('form:submit', function(data) {

                        var useFingerPrint = data.useFingerprint;
                        var bin = undefined,
                            pin = undefined;
                        if (data.fingerPrintToken) {
                            bin = data.fingerPrintToken;
                        } else {
                            pin = data.pin;
                        }
                        //Appersonam.trigger('reset:loading');
                        var isValid = loginEntity.save({
                            deviceid: 'blablabla',
                            platform: 'HYPEAPP',
                            codiceinternet: data.codiceinternet,
                            pin: data.pin,
                            datanascita: data.datanascita,
                            checksum: data.checksum,
                            bin: bin
                        }, {
                            serviceDestination: 'NEW',
                            noData: true,
                            withoutMethods: true,
                            success: function(model, response, options) {
                                if (response.Check !== "OK") {
                                    self.logout(true);
                                } else {
                                    var xds = {};
                                    xds.gnt = 'ngt';
                                    xds.ashe = response.Checksum;
                                    Appersonam.CommonVariables['IbCode'] = response.code;

                                    var savingXds = Appersonam.request("global:initialize:xds", xds); //salvo
                                    $.when(savingXds).done(function() { //inizializzo il localstorage
                                        Appersonam.CommonVariables['locked'] = false;
                                        Appersonam.CommonVariables['loggingOut'] = false;
                                        console.log('setto loggingOut a ' + Appersonam.CommonVariables['loggingOut']);
                                        //Appersonam.request('reset:timeout');
                                        Appersonam.currentApp.trigger('close:overlay', '-lckscrn');
                                        if (useFingerPrint === true) {
                                            self.activateFingerPrint();
                                        }
                                    });
                                }
                            },
                            error: function(result, resp) {
                                Appersonam.trigger('close:loading');
                                //if (resp.errorCode !== 0) {
                                //    self.logout();
                                //}
                            },
                        });
                        if (isValid !== true) {
                            Appersonam.trigger('close:loading');
                            this.triggerMethod("form:data:invalid", loginEntity.validationError);
                        }
                    });
                    profileView.on('show', function(data) {
                        Appersonam.trigger('reset:loading');
                        Appersonam.CommonVariables['locked'] = false;
                        self.isFingerPrintActive(this);
                    });
                    Appersonam.NavigationApp.trigger('hide:menu');
                    Appersonam.currentApp.trigger('show:overlay', profileView, '-lckscrn');
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

            fastLogout: function(sessionExpired, lockScreen) {
                var self = this;
                //Appersonam.request('reset:timeoutHandle');
                var fetchingXds = Appersonam.request("global:get:xds"); //variabile di sessione
                $.when(fetchingXds).done(function(xds) {
                    xds.gnt = 'ytd'; //logout
                    var savingXds = Appersonam.request("global:initialize:xds", xds); //salvo
                    Appersonam.CommonVariables['locked'] = true;
                    $.when(savingXds).done(function() {
                        require(["entities/login"], function() {
                            logoutEntity = Appersonam.request("logout");
                            if (sessionExpired === true) {
                                self.destroyCookies();
                                self.returnToMain(xds.ashe);
                            } else {
                                logoutEntity.save(null, {
                                    serviceDestination: 'NEW',
                                    withoutMethods: true,
                                    noData: true,
                                    success: function(result) {
                                        if (lockScreen === true) {
                                            self.lockScreen(xds.ashe);
                                            self.destroyCookies();
                                        } else {
                                            self.returnToMain(xds.ashe);
                                            self.destroyCookies();
                                        }
                                    },
                                    error: function(result) {
                                        if (lockScreen === true) {
                                            self.lockScreen(xds.ashe);
                                            self.destroyCookies();
                                        } else {
                                            self.returnToMain(xds.ashe);
                                            self.destroyCookies();
                                        }
                                    },
                                });
                            }
                        });

                    });
                });
                //if (xds.gnt !== 'ytd') {
                //}
            }
        }
    });
    return Appersonam.LoginApp.Profile.Controller;
});
