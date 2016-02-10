define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.Utility = Backbone.Model.extend({
            urlRoot: "INFO/GETEMITTENTIBOLLETTA.SPR",
        });
        Entities.ConfirmBill = Backbone.Model.extend({
            urlRoot: "DISPO/PAGABOLLETTA.SPR",
            save: function (attributes, options) {
                options.data = { params: this.toJSON() };
                options.serviceDestination = 'LEGACY';
                Backbone.Model.prototype.save.call(this, attributes, options);
            },
        });
        Entities.CheckBillData = Backbone.Model.extend({
            url: "INFO/CHECKBOLLETTA.SPR",
            defaults: { aliasib: 'EM1', codeline: '', contopostale: '', importo: '0', },
            save: function (attributes, options) {
                options.data = { params: this.toJSON() };
                options.serviceDestination = 'LEGACY';
                Backbone.Model.prototype.save.call(this, attributes, options);
            }
        });

        var API = {
            getUtilities: function () {
                var utilities = new Entities.Utility();
                var defer = $.Deferred();
                //var params = { tipo: 'CELLULARE' };
                utilities.fetch({
                    data: {},
                    serviceDestination: 'LEGACY',
                    success: function (data) {
                        var list = data.get('Emittenti');
                        defer.resolve(list);
                    }
                });
                var promise = defer.promise();
                return promise;
            }
        };

        Appersonam.reqres.setHandler("utility:entities", function () {
            return API.getUtilities();
        });

        Appersonam.reqres.setHandler("checkbill:entity", function () {
            return new Entities.CheckBillData();
        });

        Appersonam.reqres.setHandler("bill:confirm", function (operator) {
            return new Entities.ConfirmBill();
        });
    });
    return;

});
