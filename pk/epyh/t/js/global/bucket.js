define(["app"], function(Appersonam) {
    Appersonam.module("Bucket", function(Bucket, Appersonam, Backbone, Marionette, $, _) {  

        maskPan = function(pan){
            return pan.replace(/(\d{6})\d{6}(\d{4})/, '$1******$2').replace(/([0-9*]{4})([0-9*]{4})([0-9*]{4})([0-9*]{4})/, '$1 $2 $3 $4');
        }

        document.addEventListener("resume", function() {
            try {
                if (Appersonam.CommonVariables.UsingFingerPrint === true && Appersonam.CommonVariables['loggingOut']===true && !Appersonam.CommonVariables['ThreeDSCard']) {
                    FingerPrintPlugin.useFingerPrint(null, null, {});
                }
            } catch (ex) {
                LogDB.log('Resume error => ' + ex);
            }
        }, false);

        deepLinkAction = function(data) {
            setTimeout(function(){
                switch (data.action) {
                    case '3dscomplete':
                        threeDSCompleted(data);
                        break;
                    case 'processWalletStatus':
                        processWalletStatus(data);
                        break;
                    default:
                        LogDB.log('=> no deep link function for ' + data['function']);
                        break;
                };
            }, 200);
        };

        threeDSCompleted = function(data) {
            try {
                Appersonam.CommonVariables['loggingOut'] = true;
                console.log('statusCode: ' + data.statusCode);
                console.log('statusMsg: ' + data.statusMsg);
                console.log('addCardFlag: ' + data.addCardFlag);
                if (!!Appersonam.CommonVariables.ThreeDSCard) {
                    Appersonam.trigger('show:loading');
                    Appersonam.trigger('3DS:completed', data);
                }
            } catch (ex) {
                console.log(ex);
            }
        };

        processWalletStatus = function(jsObj) {
            var errorsDictionary = {
                '01': {
                    title: 'Si è verificato un errore',
                    description: 'La tua email primaria Hype non trova corrispondenza in Hype Wallet'
                },
                '02': {
                    title: 'Si è verificato un errore',
                    description: 'Username non presente'
                }
            };
            if (jsObj && jsObj.error && errorsDictionary[jsObj.error]) {
                Appersonam.trigger('show:error', errorsDictionary[jsObj.error], true);
            }
        };

        smsPassword = function(data) {
            if (Appersonam.currentApp.moduleName === 'LoginApp') {
                $('input, textarea, select').blur();
                Appersonam.LoginApp.trigger('read:sms', data.password);
            } else {
                console.log('Trying to read sms not during login');
            }
        };

        processTouchTimeout = function() {
            if (Appersonam.CommonVariables['loggingOut'] !== true && !Appersonam.CommonVariables['ThreeDSCard'] ) {
                $('input, textarea, select').blur();
                setTimeout(function() {
                    console.log('SET loggginOut to TRUE');
                    Appersonam.CommonVariables['loggingOut'] = true;
                    console.log('setto loggingOut a ' + Appersonam.CommonVariables['loggingOut']);
                    Appersonam.trigger('fast:logout', false, true);
                }, 200);
            } else {
                console.log('VAR loggginOut IS true');
            }
        };

        processPushMessage = function(msg) {
            DeviceInfoPlugin.isAndroid(function() {
                Appersonam.trigger('show:notification', msg.message);
            }, function() {
                Appersonam.trigger('show:notification', msg.aps.alert);
            }, null);
        };

        Appersonam.reqres.setHandler("global:get:object", function(objectKey) {
            var defer = $.Deferred();
            //var xds = JSON.parse(localStorage.getItem('xds'));
            PushNotificationPlugin.getPreference(function(result) { //success
                    if (!result || !Boolean(JSON.parse(result).prefvalue) || !JSON.parse(JSON.parse(result).prefvalue)) {
                        defer.resolve([]);
                    } else {
                        var genericObject = JSON.parse(JSON.parse(result).prefvalue);
                        defer.resolve( /*new Backbone.Collection(*/ genericObject /*)*/ );
                    }
                },
                function() { // error
                    defer.resolve(new Backbone.Collection());
                }, JSON.stringify({
                    'prefkey': objectKey
                }));
            var promise = defer.promise();
            return promise;
        });

        Appersonam.reqres.setHandler("global:delete:object", function(objectKey) {
            var obj = {
                'prefkey': objectKey
            }
            PushNotificationPlugin.deletePreference(
                function() { //success

                },
                function(result) { //error
                    LogDB.log('error deleting ' + objectKey + ' : ' + result);
                }, JSON.stringify(obj));
        });

        Appersonam.reqres.setHandler("global:initialize:object", function(genericObject, objectKey) {
            var obj = {
                'prefvalue': JSON.stringify(genericObject),
                'prefkey': objectKey
            }
            PushNotificationPlugin.setPreference(
                function(result) { //success
                    if (result === 'error') {} else {
                        Appersonam.CommonVariables['Loading' + objectKey] = false;
                    }
                },
                function(result) { //error
                    defer.resolve('error');
                }, JSON.stringify(obj));
        });

        Appersonam.reqres.setHandler("global:get:xds", function() {
            var defer = $.Deferred();
            //var xds = JSON.parse(localStorage.getItem('xds'));
            PushNotificationPlugin.getPreference(function(result) { //success
                    if (!result || !Boolean(JSON.parse(result).prefvalue) || !JSON.parse(JSON.parse(result).prefvalue)) {
                        var xds = {
                            gnt: 'ytd'
                        };
                        defer.resolve(xds);
                    } else {
                        var xds = JSON.parse(JSON.parse(result).prefvalue);
                        defer.resolve(xds);
                    }
                },
                function() { // error
                    var xds = {
                        gnt: 'ngt'
                    };
                    defer.resolve(xds);
                }, JSON.stringify({
                    'prefkey': 'xds'
                }));
            var promise = defer.promise();
            return promise;
        });

        Appersonam.reqres.setHandler("global:initialize:xds", function(xds) {
            var defer = $.Deferred();

            var obj = {
                'prefvalue': JSON.stringify(xds),
                'prefkey': 'xds'
            }

            PushNotificationPlugin.setPreference(
                function(result) { //success
                    if (result === 'error') {
                        defer.resolve(result);
                    } else {
                        defer.resolve('ok');
                    }
                },
                function(result) { //error
                    defer.resolve('error');
                }, JSON.stringify(obj));
            var promise = defer.promise();
            return promise;
        });

        Appersonam.reqres.setHandler("global:get:categories", function() {
            var categories = JSON.parse(Sella.deviceactions.load('categories'));
            //var categories = JSON.parse(localStorage.getItem('categories'));
            if (!categories) {
                return null;
            } else {
                return categories;
            }
        });

        Appersonam.reqres.setHandler("global:initialize:categories", function(categories) {
            Sella.deviceactions.save('categories', JSON.stringify(categories));
            //localStorage.setItem('categories', JSON.stringify(categories));
        });

        Appersonam.reqres.setHandler('global:initialize:dateSupported', function() {
            var i = document.createElement("input");
            i.setAttribute("type", "date");
            if (i.type == "text") {
                Sella.deviceactions.save('dateSupported', false);
            } else {
                Sella.deviceactions.save('dateSupported', true);
            }
            //i.remove();
        });

        Appersonam.reqres.setHandler('global:get:dateSupported', function() {
            var dateSupported = Sella.deviceactions.load('dateSupported', false);
            return dateSupported;
        });

        Appersonam.reqres.setHandler("global:initialize:device", function() {
            var device = {
                //platform: (DeviceInfoPlugin.isAndroid() !== null ? (DeviceInfoPlugin.isAndroid() ? 'Android' : 'iOS') : 'web'), //web / iOS / Android
                width: $(window).width(), //larghezza schermo
                height: $(window).height(), //altezza schermo
                pixelRatio: window.devicePixelRatio, //densità schermo
                model: device ? device.model : sayWho()[0], //mobile: marca-modello telefono / web: userAgent
                //uuid: '',
                version: device ? device.version : sayWho()[1] // versione sistema operativo / browser
            };

            Sella.deviceactions.getMoreInfo(function(moreInfo) {
                device.moreInfo = moreInfo;
                Sella.deviceactions.getOsVersion(function(osVer) {
                    device.osVersion = osVer;
                    Sella.deviceactions.getOsRelease(function(osRel) {
                        device.osRelease = osRel;
                        Sella.deviceactions.isAndroid(function(plat) {
                            if (plat === 'ok') {
                                device.platform = 'Android';
                                $('body').addClass('android');
                                $('body').addClass('android-' + device.osVersion.replace(/\./g, '_').replace(/\s+/g, '_'));
                                Sella.deviceInfo = device; //SERVE?
                                Sella.deviceactions.save('deviceVariables', JSON.stringify(device));
                            } else {
                                device.platform = 'web';
                                Sella.deviceInfo = device; //SERVE?
                                Sella.deviceactions.save('deviceVariables', JSON.stringify(device));
                            }
                        }, function() {
                            device.platform = 'iOS';
                            Sella.deviceInfo = device; //SERVE?
                            Sella.deviceactions.save('deviceVariables', JSON.stringify(device));
                            $('body').addClass('ios');
                        });
                    });
                });
            });


        });

        Appersonam.reqres.setHandler("global:get:device", function() {
            //return JSON.parse(localStorage.getItem('deviceVariables'));
            return JSON.parse(Sella.deviceactions.load('deviceVariables'));
        });

        Appersonam.reqres.setHandler("global:anonymizeJSON", function(src, options) {

            var dest = typeof src === 'object' ? JSON.parse(JSON.stringify(src)) : JSON.parse(src);

            options = !!options ? options : {};
            options.exclusions = !!options.exclusions ? options.exclusions : [];
            options.keepStringBits = !!options.keepStringBits ? options.keepStringBits : false;

            var anonymizeWorker = function(obj, options) {
                for (var prop in obj) {
                    if (typeof obj[prop] === 'object') {
                        anonymizeWorker(obj[prop], options); // <- recursive call
                    } else {
                        if (options.exclusions.indexOf(prop) === -1) {
                            if (typeof obj[prop] === 'number') {
                                obj[prop] = Number(obj[prop].toString().replace(/([\d])/g, '1'));
                            } else if (typeof obj[prop] === 'string') {

                                var canModify = true;

                                if (options.keepStringBits) {
                                    canModify = obj[prop] !== 'true' && obj[prop] !== 'false';
                                }

                                if (canModify) {
                                    obj[prop] = obj[prop].replace(/([a-zA-Z])/g, 'X');
                                    obj[prop] = obj[prop].replace(/([\d])/g, '1');
                                }

                            }
                        }
                    }
                }
            };

            anonymizeWorker(dest, options);

            return dest;
        });


        var sayWho = function() {
            var ua = navigator.userAgent,
                tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
            return M; //M.join(' ');
        };

    });
    return;
});
