define(["app"], function (Appersonam) {
    Appersonam.module("Syncronization", function (Sync, Appersonam, Backbone, Marionette, $, _) {

        //riportati in commons.js var legacyUrl = 'http://192.168.111.60/mobileweb/cd/globalconnector.aspx';
        //var hypeUrl = 'http://localhost:8080/canalidiretti-appersonam/'; //locale/portatile
        //var hypeUrl = 'http://10.192.34.67:8080/canalidiretti-hype/rest'; //fulvio
        //riportati in commons.js var hypeUrl = 'http://10.192.34.194:8088/canalidiretti-hype/'; //andrea
        //riportati in commons.js var p2pUrl = 'http://172.22.75.20:12002/p2pservices/';
        //var globalUrl = 'http://10.192.35.194/hypeapp/hype/hypeconnector.aspx';
        //riportati in commons.js var globalUrl = 'http://10.192.35.194/hypeapp/hype/hypeconnector.aspx';


        var originalSync = Backbone.sync;
        var originalAjax = Backbone.ajax;

        Backbone.ajax = function () {

            if (arguments[0].requestMode === 'BACKBONE') {
                var args = Array.prototype.slice.call(arguments, 0);
                return Backbone.$.ajax.apply(Backbone.$, _.extend(args, { type: 'GET' }));
            }
            else {
                var data = {
                    secure: true,
                    deviceid: "deviceid",
                    devicetype: "platform",
                    async: true,
                    postdata: arguments[0].data,
                    okfn: arguments[0].success,
                    kofn: arguments[0].error,
                    url: arguments[0].url
                    /*
                    una volta che si è sul device reale questo url
                    dovrebbe essere ignorato in favore di quello
                    presente nel manifest
                    */
                };

                /*Fix Greg 7 luglio 2014*/
                if (data.deviceid) {
                    data.postdata[data.deviceid] = Sella.getDeviceId();
                }
                if (data.devicetype) {
                    data.postdata[data.devicetype] = Sella.deviceType;
                }
                if (SellaWs._cookiejar) {
                    var cookies = "";
                    for (var a in SellaWs._cookiejar)
                        cookies += SellaWs._cookiejar[a] + "; ";
                    // TODO: Elimina § finito di mappare i servizi
                    // console.log(cookies); TODO: rimetti
                    data.head = {
                        "Cookie": cookies,
                        //"appversion":Sella.appVersion
                    };
                }
                data.secure = data.secure && SellaWs._secureenabled;
                /*end fix*/

                if (arguments[0].data.isPdf) {
                    data.isPdf = true;
                    delete arguments[0].data.isPdf;
                    data.success = function () {
                        Appersonam.trigger('close:loading');
                    };
                    data.error = function (errorResult) {
                        if (!errorResult) {
                            var errorResult = {
                                title: 'Si &egrave; verificato un problema durante l&apos; apertura del file'
                            };
                        }
                        Appersonam.trigger('close:loading');
                        Appersonam.trigger('show:error', errorResult, true);
                    };
                }
                Sella.deviceactions.ajax(data);
            }
        };

        Backbone.sync = function (method, model, options) {
            var resultModelUrl = _.result(model, 'url') || urlError();
            if (options.requestMode !== undefined && options.requestMode === 'BACKBONE') {
                originalSync(method, model, options);
            }
            else {
                var params = {
                    type: 'POST'
                };
                if (window && window.env) {
                    params.url = SellaURL[window.env].connector;
                } else {
                    params.url = SellaURL.dev.connector;
                }
                if (!options.data) {
                    options.data = {};
                }
                else {
                    for (var key in options.data) {
                        if (options.data.hasOwnProperty(key)) {
                            var value = options.data[key];
                            value = encodeURIComponent(value);
                            options.data[key] = value;
                        }
                    }
                }

                var url = (_.result(model, 'url') || urlError()).replace(/(.*?\/)[0-9]+/, '$1');
                if (options.withoutMethods !== true) {
                    url = url + customUrlMethodMap[method];
                }
                //if (options.data.function !== 'logout.spr') {
                //    Appersonam.request('reset:timeout');
                //}
                options.data['function'] = url;

                //var xds = Appersonam.request("global:get:xds");
                //options.data = $.extend(options.data/*, xds.defaultData);
                if (model && (method === 'create' || method === 'update' || method === 'patch') && !options.noData) {
                    if (options.encode !== false) {
                        options.data['data'] = stringifyEncoded(model.toJSON());
                    }
                    else {
                        options.data['data'] = JSON.stringify(model.toJSON());
                    }
                } else if (model && (method === 'delete') && !options.noData) {
                    options.data['id'] = model.id;
                }


                params.contentType = customHeaderDataTypeMap[method];
                options.beforeSend = function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,**;q=0.8'); //modificato, tolto / tra i due asterischi
                    /*if (xds.authorized === true) {
                        xhr.setRequestHeader('Cookie', 'ASP.NET_SessionId=' + xds.aspcook + ';' + 'newids=' + xds.newids);
                    }*/
                };
                if (options.showLoading !== false) {
                    Appersonam.trigger('show:loading');
                }
                var originalSuccess = options.success;
                var originalError = options.error;
                options.success = function (result) {
                    //console.log('risultato per ' + resultModelUrl + ':');
                    //console.log(JSON.stringify(result));
                    //result = parseUnescaped(JSON.stringify(result));

                    setTimeout(function () {//nel caso dovessi bloccare il back sui loading, a questo punto dovrei mettere un parametro per evitare che si autorizzi l'evento di back quando il logout è terminato
                        if (options.showLoading !== false) {
                            Appersonam.trigger('close:loading');
                        }
                    }, 400);
                    if (result.ErrorMessage) {
                        if (result.ErrorMessage[0].errorCode === '666') {
                            if (Appersonam.CommonVariables['loggingOut'] !== true) {
                                Appersonam.CommonVariables['loggingOut'] = true;
                                console.log('setto loggingOut a ' + Appersonam.CommonVariables['loggingOut']);
                                Appersonam.trigger('fast:logout', true);
                            }
                            if (resultModelUrl === 'logout.spr') {//se il logout chiamato da lockscreen ha dato 666 per qualche motivo, deve comunque effettuare le azioni per mostrare il lockscreen
                                originalSuccess(result);
                            }
                        }
                        else {
                            originalSuccess(result);
                        }
                    } else {
                        originalSuccess(result);
                    }
                }
                options.error = function (result) {
                    //result = parseUnescaped(JSON.stringify(result));
                    if (options.showLoading !== false) {
                        Appersonam.trigger('close:loading');
                    }
                    Appersonam.trigger('show:error', result);
                    originalError(result);
                }
                //console.log('sto chiamando: ' + resultModelUrl);
                //console.log('sto inviando: ' + JSON.stringify(params));
                //console.log('options: ' + JSON.stringify(options));
                var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
                model.trigger('request', model, xhr, options);
                return xhr;
            }
        };


        var htmlEncode = function (key, val) {
            if (typeof (val) != "string") {
                return val;
            }
            var replaced = $('<div/>').text(val).html();
            return replaced;
        };

        var escape = function (key, val) {
            if (typeof (val) != "string") {
                return val;
            }
            var replaced = encodeURIComponent(val);
            return replaced;
        };
        var unescape = function (key, val) {
            if (typeof (val) != "string") {
                return val;
            }
            var replaced = decodeURIComponent(val);
            return replaced;
        };

        var stringifyEncoded = function (obj) {
            return JSON.stringify(obj, htmlEncode);
        };

        var stringifyEscaped = function (obj) {
            return JSON.stringify(obj, escape);
        };

        var parseUnescaped = function (obj) {
            return JSON.parse(obj, unescape);
        };

        var customHeaderDataTypeMap = {
            'create': 'application/json; charset=utf-8',
            'update': 'application/json; charset=utf-8',
            'patch': 'application/json; charset=utf-8',
            'delete': 'application/x-www-form-urlencoded',
            'read': 'application/x-www-form-urlencoded'
        };

        var customUrlMethodMap = {
            'create': 'create',
            'update': 'update',
            'patch': 'patch',
            'delete': 'delete',
            'read': ''
        };
    });
    return;
});