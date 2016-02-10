define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Logout = Backbone.Model.extend({
            urlRoot: 'INFO/LOGOUT.SPR',
            save: function (attributes, options) {
                options.data = {
                    codiceinternet: Appersonam.CommonVariables['IbCode']
                }
                Backbone.Model.prototype.save.call(this, null, options);
            }
        });

        Entities.EnrollFingerPrint = Backbone.Model.extend({
            urlRoot: 'INFO/ENROLLBIO.SPR'
        });

        Entities.First = Backbone.Model.extend({
            urlRoot: 'FREE/LOGINFIRSTSTEP.SPR',
            defaults: {

            },
            validate: function (attrs, options) {
                var errors = {};
                if (!attrs.codiceinternet && !attrs.checksum) {//attrs.checksum indica caso di fast login, richiesto solo il pin
                    errors.codiceinternet = "Inserisci la tua email";
                }
                    //in futuro aggiungere
                else if (/^[\-\.\w]+@([\-a-zA-Z_0-9]+?\.)*[\-a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/.test(attrs.codiceinternet) !== true && !attrs.checksum) {
                    errors.codiceinternet = "Inserisci una email valida";
                }
                if (!attrs.pin && !attrs.bin) {
                    errors.pin = "Inserisci la password";
                }
                //else if (('' + attrs.pin).length !== 8) {
                //    errors.pin = "Inserisci una password valida";
                //}
                if (attrs.birthDate === true && attrs.datanascita == '') {
                    errors.datanascita = "Inserisci la tua data di nascita";
                }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            },
            save: function (attributes, options) {
                if (attributes.checksum) {
                    this.urlRoot = 'FREE/LOGINFIRSTSTEPFA.SPR';
                }
                else {
                    this.urlRoot = 'FREE/LOGINFIRSTSTEP.SPR';
                }
                options.data = $.extend(options.data, attributes);
                Backbone.Model.prototype.save.call(this, attributes, options);
                if (this.validationError) {
                    return false;
                }
                else {
                    return true;
                }
            }
        });

        Entities.VerifyHash = Backbone.Model.extend({
            urlRoot: 'FREE/GETFALEVEL.SPR',
            save: function (attributes, options) {
                options.data = $.extend(options.data, attributes);
                Backbone.Model.prototype.save.call(this, null, options);
            }
        });

        Entities.Second = Backbone.Model.extend({
            urlRoot: 'FREE/LOGINSECONDSTEP.SPR',
            defaults: {

            },
            validate: function (attrs, options) {
                var errors = {};
                if (!attrs.pwd) {
                    errors.pwd = "Inserisci la password";
                }
                //else if (isNaN(attrs.pwd) || (attrs.pwd + '').length !== 8) {
                //    errors.pwd = "Inserisci una password valida";
                //}
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            },
            save: function (attributes, options) {
                options.data = $.extend(options.data, attributes);
                Backbone.Model.prototype.save.call(this, attributes, options);
                if (this.validationError) {
                    return false;
                }
                else {
                    return true;
                }
            }
        });

        var API = {
            verifyHash: function (hashMail, codiceinternet) {
                var verifyHash = new Entities.VerifyHash();
                var defer = $.Deferred();
                verifyHash.fetch({
                    serviceDestination: 'NEW',
                    data: {
                        checksum: hashMail,
                        codiceinternet: '',
                        sessionid: '',
                        deviceid: 'blablabla',
                        platform: 'HYPEWEB'
                    },
                    success: function (result) {
                        if (result.get('Authlevel') === '0') {
                            defer.resolve(hashMail);
                        }
                        else {
                            defer.resolve(undefined);
                        }
                    },
                    error: function () {
                        defer.resolve(undefined);
                    }
                });
                var promise = defer.promise();
                return promise;
            }
        };
        Appersonam.reqres.setHandler("login:first", function (hashMail, birthDate) {
            var email = hashMail === undefined || hashMail === null;//se non c'è l'hash, devo chiedere la mail
            var model = new Entities.First({ email: email, birthDate: birthDate, checksum: hashMail });

            return model;
        });

        Appersonam.reqres.setHandler('new:fingerprint:enroll',function(){
            return new Entities.EnrollFingerPrint();
        });

        Appersonam.reqres.setHandler("logout", function () {
            var logoutModel = new Entities.Logout();
            return logoutModel;
        });
        Appersonam.reqres.setHandler("login:second", function (codiceinternet) {
            var isAndroid = (Sella.isAndroid === 'Android');
            var model = new Entities.Second({ codiceinternet: codiceinternet, isAndroid: isAndroid });
            return model;
        });
        Appersonam.reqres.setHandler("hash:isvalid", function (hashMail) {
            if (hashMail === '') {
                hashMail = null;
            }
            if (hashMail !== undefined && hashMail !== null) {
                hashMail = API.verifyHash(hashMail);
            }
            return hashMail;
        });
    });
    return;
});
