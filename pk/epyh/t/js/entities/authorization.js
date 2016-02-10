define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Authorization = Backbone.Model.extend({
            urlRoot: "INFO/LOGINCHECKPWDTYPE.SPR",
        });

        //var API = { //in disuso
        //    GetAuthorization: function () {
        //        var authRequest = new Entities.Authorization();
        //        var defer = $.Deferred();
        //        authRequest.fetch({
        //            data: {},
        //            serviceDestination: 'NEW',
        //            success: function (result) {
        //                defer.resolve(new Backbone.Model({ Char1: 1, Char2: 2 }));
        //            },
        //            error: function (result) {
        //                defer.resolve(new Backbone.Model({ Char1: 1, Char2: 2 }));
        //            }
        //        });
        //        var promise = defer.promise();
        //        return promise;
        //    }
        //};

        Appersonam.reqres.setHandler("authorization:entity", function (pin, password) {
            return new Backbone.Model({ pin: pin, password: password });
        });
    });
    return;

});
