/**
 * Created by CON817 on 15/06/2015.
 */

/**
 * @remarks
 * Potenzialmente rimovibile, non toccare per adesso.
 *
 * @type {{}}
 */
var Patch = {};

/**
 *
 * @type {{_cookiejar: {}, _secureenabled: boolean}}
 */
var SellaWs = {
    _cookiejar: {},
    _secureenabled: true,
    _log: console.log
};

/**
 * @description
 * Verificare che gli indirizzi IP elencati di seguito siano inclusi come eccezioni
 * nel controllo del metodo jody() della classe java com.sella.BancaSella.AsyncHttpPost
 *
 * @type {{dev: {connector: string, legacyUrl: string, hypeUrl: string, p2pUrl: string}, test: {connector: string}, pre: {connector: string}, pre2: {connector: string}, prod: {connector: string}, realEnv: string, channel: string}}
 */

var SellaURL = {
    dev: {
        // for PRE environment
        /*
         root : "http://213.218.40.133/mobileweb/cd/",
         connector : "http://213.218.40.133/mobileweb/cd/globalconnector.aspx"
         */
        // for TEST environment
        // root: 'http://10.192.35.194/hypeapp/hype/',

        //connector: 'http://localhost:8080/canalidiretti-hype/connector',

        //connector: 'http://172.30.4.239/mobileweb/hype/hypeconnector.aspx', //IIS di Cavagnet
        //connector: 'http://10.192.33.217/mobileweb/hype/hypeconnector.aspx', //IIS di FRANK


        //connector: 'http://10.192.35.189/mobileweb/hype/hypeconnector.aspx', //vasta
        //connector: 'http://10.192.48.90/MobileFrontEndWEB/hype/hypeconnector.aspx', //antonio
        //connector: 'http://10.192.35.194/hypeapp/hype/hypeconnector.aspx',      //test
        //connector: 'http://172.30.5.56/hypeapp/hype/hypeconnector.aspx', //nuovo test
        //connector: 'http://172.30.3.48/hypeapp/hype/hypeconnector.aspx',//NUOVISSIMO TEST
        //connector: 'http://192.168.111.60/mobileweb/hype/hypeconnector.aspx',     //pre produzione
        //connector: 'http://192.168.111.77/mobileweb/hype/hypeconnector.aspx',     //altra pre produzione 1
        //connector: 'https://mobile.sella.pre/mobileweb/hype/hypeconnector.aspx', //altra pre produzione 2
        //connector: 'https://mobile.sella.it/mobileweb/hype/hypeconnector.aspx', //produzione
        //connector: 'http://172.30.4.107/mobileweb/hype/hypeconnector.aspx', //IIS di FRANK
    	connector: 'http://172.30.2.212/mobileweb/hype/hypeconnector.aspx', // test new
        legacyUrl: 'http://192.168.111.60/mobileweb/cd/globalconnector.aspx',
        hypeUrl: 'http://10.192.34.194:8088/canalidiretti-hype/',
        p2pUrl: 'http://172.22.75.20:12002/p2pservices/'
    },
    test: {
        connector: 'http://10.192.35.194/hypeapp/hype/hypeconnector.aspx'
    },
    pre: {
        connector: 'https://192.168.111.77/mobileweb/hype/hypeconnector.aspx'
    },
    pre2: {
        connector: 'https://www.pp-hype.it/app/hype/hypeconnector.aspx'
    },
    prod: {
        connector: 'https://mobile.sella.it/mobileweb/hype/hypeconnector.aspx'
    },
    realEnv: 'dev',
    channel: 'app'
};

/**
 * @namespace
 * @descriptuion
 * Funzioni generiche, utilizzate dai diversi moduli per operazioni varie. Include alcune estensioni dei tipi base di Javascript.
 *
 */
var Sella = {
    /** Azioni dipendenti dal device (i.e. interfaccia con phonegap) */
    deviceactions: {
        _compatmode: false,
        noop: function () {
            /**
             *
             */
        },
        ajax: function (data) {

            //if (data.postdata['function'] === 'rest/sellabox/INFO/GETSELLADIGITDOCLIST.SPR' || data.postdata['function'] === 'rest/sellabox/INFO/GETSELLADIGITDOC.SPR') {
            //    data.url = 'http://10.192.48.126:8800/DBAccess/' + data.postdata['function'];
            //}

            /**
             * common object's keys iterator local variable
             * placed into the outer scope
             * to avoid redundant variables initializations
             */
            var k;
            /**
             * common local variable that wraps values in loops
             * placed into the outer scope
             * to avoid variables initializations within the loops
             */
            var arg;

            if (data.secure && !this._compatmode) {
                ////////
                //GBS02251 - CASH ASYNC
                //21/02/2013
                ////////
                var postparametes = [];
                for (k in data.postdata) {
                    if (data.postdata[k] !== undefined) {
                        arg = {};
                        arg[k] = (data.postdata[k]);
                        postparametes.push(arg);
                    }
                }
                var headerparameters = [];
                for (k in data.head) {
                    if (data.head[k] !== undefined) {
                        arg = {};
                        arg[k] = data.head[k];
                        headerparameters.push(arg);
                    }
                }
                // NOTE: Fixato da Sella. Aggiunta appversion
                headerparameters.push({
                    appversion: Sella.appVersion + '-' + (!!Patch.patchversion ? Patch.patchversion : 'std')
                });
                //MOBANK-84  FIX JFOUND
                //console.log('OOOO: ' + SellaWs._jfound);
                headerparameters.push({
                    jfound: (SellaWs._jfound ? "'" + SellaWs._jfound + "'" : '')
                });
                ////////
                //GBS02251 - CASH ASYNC
                //21/02/2013
                ////////
                var out = {
                    url: data.url,
                    postparametes: postparametes,
                    headerparameters: headerparameters,
                    async: (data.async ? data.async : '')
                };
                if (data.isPdf) {
                    Sella.deviceactions.openPDFnew(out, data.success, data.error);
                } else {
                    RequestHttpsPlugin.doRequestHttps(
                        function (result) {
                            var answ = JSON.parse(result);
                            var curcookie = answ.header && answ.header['set-cookie'] ? answ.header['set-cookie'] : null;
                            var jfound = answ.header && answ.header.jfound ? answ.header.jfound : null;
                            //console.log('jfound in: ' + jfound);
                            if (curcookie) {
                                //gestisce un solo cookie
                                /*
                                 var key = curcookie.substr(0, curcookie.indexOf('='));
                                 SellaWs._cookiejar[key] = curcookie;
                                 */
                                var cookieArray = [];
                                if (curcookie instanceof Array) {
                                    cookieArray = curcookie;
                                } else {
                                    cookieArray.push(curcookie);
                                }
                                for (var j = 0; j < cookieArray.length; j++) {
                                    var item = cookieArray[j];
                                    var key = item.substr(0, item.indexOf('='));
                                    SellaWs._cookiejar[key] = item;
                                }

                            }
                            //MOBANK-84  FIX JFOUND
                            if (jfound) {
                                SellaWs._jfound = jfound;
                            }
                            var isJson = true;
                            try {
                                JSON.parse(answ.responseText)
                            } catch (e) {
                                isJson = false;
                            }
                            if (isJson === true) {
                                data.okfn(JSON.parse(answ.responseText));
                            } else {
                                var error = '{"ErrorMessage":[{"errorCode":"000","errorMessage":"' + answ.responseText + '","field":"*"}]}';
                                data.okfn(JSON.parse(error));
                            }
                        },
                        function (error) {
                            ////////
                            //GBS02251 - CASH ASYNC
                            //21/02/2013
                            ////////
                            data.kofn(JSON.parse(error));
                        },
                        Sella.serialize(out)
                    );
                }
            } else {
                var http = new XMLHttpRequest();
                var postdata = null;
                //var cookies = null;
                http.open(data.method, data.url, true);
                if (data.method == 'POST') {
                    postdata = '';

                    for (k in data.postdata) {
                        postdata += k + '=' + (data.postdata[k] === undefined ? '' : encodeURIComponent(data.postdata[k])) + '&';
                    }

                    postdata = postdata.substring(0, postdata.length - 1);
                    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                }
                // NOTE: Fixato da Sella. Aggiunta appversion
                if (data.head) {
                    if (!this._compatmode) {
                        for (k in data.head) {
                            http.setRequestHeader(k, data.head[k]);
                        }
                    }
                    http.setRequestHeader('appversion', Sella.appVersion);
                }
                http.onreadystatechange = function () { // Call a function when the state changes.
                    // SellaWs._log('RS', http.readyState, 'ST', http.status);
                    if (http.readyState == 4) {
                        /** Uncomment for debugging purpose*/
                        //if (SellaWs.debugMode) {
                        //    /*
                        //     SellaWs._log('---');
                        //     SellaWs._log('CALL:', data);
                        //     SellaWs._log('URL:', data.url);
                        //     SellaWs._log('METHOD:', data.method);
                        //     SellaWs._log('COOKIES:', cookies);
                        //     SellaWs._log('POSTDATA:', postdata);
                        //     SellaWs._log('HEADS:');
                        //     SellaWs._log(this.getAllResponseHeaders());
                        //     SellaWs._log('ASW:', http.responseText);
                        //     SellaWs._log('XML:', http.responseXML);
                        //     SellaWs._log('---');
                        //     */
                        //}
                        var curcookie = this.getResponseHeader('Set-Cookie');
                        /*if (curcookie) { // old: gestiva un solo cookie
                         var key = curcookie.substr(0, curcookie.indexOf('='));
                         SellaWs._cookiejar[key] = curcookie;
                         SellaWs._log('NEW COOKIE:', key, '=', curcookie);
                         }*/
                        if (curcookie) {
                            var cookieArray = [];
                            if (curcookie instanceof Array) {
                                cookieArray = curcookie;
                            } else {
                                cookieArray.push(curcookie);
                            }
                            for (var j = 0; j < cookieArray.length; j++) {
                                var item = cookieArray[j];
                                var key = item.substr(0, item.indexOf('='));
                                SellaWs._cookiejar[key] = item;
                                SellaWs._log('NEW COOKIE:', key, '=', item);
                            }
                        }
                        if ((http.fake || ((http.status == 200) || (http.status == 0)) && http.getAllResponseHeaders().length)) {
                            if (data.okfn) {
                                data.okfn(http);
                            }
                        } else {
                            if (data.kofn)
                                data.kofn(http);
                        }
                    }
                };
                // TODO: Elimina console.log finito di mappare i servizi
                // console.log('sending', postdata); TODO: rimetti
                try {

                    /*
                     console.log('--- 8< --- SEND: '+data.url)
                     if (postdata) {
                     var msgs=postdata.split('&');
                     for (var a in msgs) console.log(msgs[a]);
                     }
                     console.log('--- >8 ---');
                     console.log('');
                     console.log('');
                     console.log(postdata);
                     */
                    http.send(postdata);
                } catch (err) {
                    SellaWs._log(err.description);
                }
            }
        },
        registerPushService: function (icode) {
            if (!this._compatmode) {
                PushNotificationPlugin.registerPushService(this.noop, this.noop, Sella.serialize({
                    internetcode: icode
                }));
            }
        },
        sendMail: function (to, subj, body, report, contacts, deviceInfos, success, error) {
            if (!success) {
                success = this.noop;
            }
            if (!error) {
                error = this.noop;
            }
            try {
                if (report === true) {
                    SendEmailPlugin.sendReport(this.noop, this.noop, Sella.serialize({
                        to: to,
                        subject: subj,
                        body: body,
                        contacts: contacts,
                        deviceInfos: deviceInfos
                    }));
                    //setTimeout(function () {
                    success();
                    //}, 2000);
                } else {
                    if (this._compatmode) {
                        document.location.href = 'mailto:' + encodeURIComponent(to) + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
                    } else {
                        SendEmailPlugin.sendMail(success, error, Sella.serialize({
                            to: to,
                            subject: subj,
                            body: body
                        }));
                        //setTimeout(function () {
                        success();
                        //}, 2000);
                    }
                }
            } catch (ex) {
                console.log(ex);
                error(ex);
            }
        },
        openLink: function (url) {
            if (this._compatmode) {
                window.open(url);
            }
            else {
                WebViewPlugin.openLink(this.noop, this.noop, Sella.serialize({link: url}));
            }
        },
        hasPDF: function () {
            /**@deprecated*/
            return PDFReaderPlugin.hasPDF();
        },
        openSimplePDF: function (pdftoopen) {
            if (this._compatmode) {
                window.open(pdftoopen);
            }
            else {
                PDFReaderPlugin.openSimplePDF(this.noop, this.noop, Sella.serialize({link: pdftoopen}));
            }
        },
        openPDFnew: function (prepareddata, success, error) {
            if (this._compatmode) {
                window.open(url);
            }
            else {
                try {

                    PDFReaderPlugin.openPDF(function (result) {
                            var answ = JSON.parse(result);
                            var curcookie = answ.header && answ.header['set-cookie'] ? answ.header['set-cookie'] : null;
                            if (curcookie) {
                                var key = curcookie.substr(0, curcookie.indexOf('='));
                                SellaWs._cookiejar[key] = curcookie;
                                //SellaWs._log('NEW COOKIE:', key, '=', curcookie);
                            }
                            success();
                        },
                        function (/*errorResult*/) {
                            PDFReaderPlugin.hasPDF(function () {
                                var errorResult = {
                                    title: 'Impossibile visualizzare il PDF (nessun file disponibile)'
                                };
                                error(errorResult);
                            }, function () {
                                var errorResult = {
                                    title: 'Impossibile visualizzare il PDF (nessun reader disponibile)'
                                };
                                error(errorResult);
                            });
                        },
                        Sella.serialize(prepareddata));
                } catch (ex) {
                    error();
                }
            }
        },
        openPDF: function (url) {
            if (this._compatmode) {
                window.open(url);
            }
            else {
                PDFReaderPlugin.openPDF(this.noop, this.noop, Sella.serialize({params: url}));
            }
        },
        openTol: function () {
            WebViewPlugin.openTol(this.noop, this.noop, Sella.serialize({
                link: ''
            }));
        },
        save: function (key, value) {
            if (this._compatmode) {
                alert('Saving:\n[' + key + '] ' + value);
            }
            else {
                window.localStorage.setItem(key, value);
            }
        },
        load: function (key) {
            if (this._compatmode) {
                var txtPrompt = prompt('Loading:\n[' + key + ']');
                return (txtPrompt == '' ? null : txtPrompt);
                /*var form = {code:SellaWebapp.utils.zeroFill(prompt('ID UTENTE\n[46024 di default]')||46024),pin:1111,gg:undefined,mm:undefined,aaaa:undefined,fastauthenabled:true};
                 SellaWs.macro.login({code:form.code?SellaWebapp.utils.zeroFill(form.code):null,pin:form.pin,gg:form.gg,mm:form.mm,aaaa:form.aaaa,fastauthenabled:form.fastauthenabled},{
                 okfn:function(req,res) {
                 SellaWebapp.managers.login.actions.auth(SellaRenderer.stack.currentSheet().body.getData(),null,1,1,form.fastauthenabled);
                 },
                 kofn:function() {}
                 });
                 return null;*/
            } else {
                return window.localStorage.getItem(key);
            }
        },
        isDeviceIdPresent: function (cb) {
            if (this._compatmode) {
                Sella.deviceId = 'SIMULATED';
                cb();
            } else {
                PushNotificationPlugin.getPreference(
                    function (id) {
                        Sella.deviceId = JSON.parse(id).prefvalue;
                        cb();
                    }, //Ok callback
                    function () {
                        Sella.deviceId = 'SIMULATED';
                        cb();
                    }, //kocallback
                    Sella.serialize({
                        'prefkey': 'uniquecode'
                    })
                );
            }
        },
        isAndroid: function (cb, err) { //funzione ok chiamata da android e web
            DeviceInfoPlugin.isAndroid(function (plat) {
                Sella.isAndroid = plat;
                /*se null è web*/
                if (Sella.isAndroid === 'ok') {
                    Sella.isAndroid = 'Android';
                    Sella.deviceType = Sella.isTablet ? 'ATAB' : 'ASMART';
                } else {
                    Sella.isAndroid = 'web';
                    Sella.deviceType = 'web';
                }
                cb(plat);
            }, function (plat2) { //funzione di errore chiamata da ios
                Sella.isAndroid = 'iOS';
                Sella.deviceType = Sella.isTablet ? 'IPAD' : 'IPHONE';
                err(plat2);
            });
        },
        getAppVersion: function (cb) {
            DeviceInfoPlugin.appVersion(function (ver) {
                Sella.appVersion = ver;
                cb(ver);
            });
        },
        getOsVersion: function (cb) {
            DeviceInfoPlugin.osVersion(function (ver) {
                Sella.osVersion = ver;
                cb(ver);
            });
        },
        getOsRelease: function (cb) {
            DeviceInfoPlugin.osRelease(function (ver) {
                Sella.osRelease = ver;
                cb(ver);
            });
        },
        getMoreInfo: function (cb) {
            DeviceInfoPlugin.moreInfo(function (ver) {
                Sella.moreInfo = ver;
                cb(ver);
            });
        }
    },
    /** Restituisce la versione da caricare. #ver-xxxx */
    getVersion: function () {
        if (window.location.hash.indexOf('ver-') != -1) {
            return window.location.hash.substr(window.location.hash.indexOf('ver-') + 4, 4);
        }
        else {
            return '';
        }
    },
    /** Chiude l'applicazione */
    close: function () {
        if (window.navigator && window.navigator.app && navigator.app.exitApp) {
            navigator.app.exitApp();
        }
    },
    /**
     Restituisce l'ID univoco del device.
     @returns l'ID del device o SIMULATED se non disponibile.
     */
    getDeviceId: function () {
        return Sella.deviceId;
    },
    serialize: JSON.stringify
};
