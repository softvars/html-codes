define(["app"], function (Appersonam) {
    Appersonam.module("Entities", function (Entities, Appersonam, Backbone, Marionette, $, _) {
        Entities.File = Backbone.Model.extend({
            url: 'rest/images/',
        });
        Entities.GetFile = Backbone.Model.extend({
            url: 'rest/images/post',
        });
        Entities.GetDealFile = Backbone.Model.extend({
            url: Appersonam.CommonVariables.dealsImageUrl,
            defaults:{
                key: Appersonam.CommonVariables.dealsImageKey
            }
        });

        var API = {
            getFileEntity: function (id, target, showLoading) {
                var entity = new Entities.GetFile();
                var defer = $.Deferred();
                if (showLoading === undefined || showLoading === null) {
                    showLoading = true;
                }
                if (id) {
                    entity.fetch({
                        data: { id: id },
                        showLoading: showLoading,
                        success: function (resultData) {
                            if (!resultData.get('content')) {
                                resultData.set({ content: '' });
                            }
                            resultData.set({ target: target });
                            defer.resolve(resultData);
                        },
                        error: function (resultData) {
                            resultData.set({ target: target, content: '' });
                            defer.resolve(resultData);
                        }
                    });
                    return defer.promise();
                }
                else {
                    var promise = defer.promise();
                    defer.resolve(new Backbone.Model({ target: target, content: '' }));
                    return promise;
                }
            }
        };

        Appersonam.reqres.setHandler("file:entity", function (id) {
            return new Entities.File({ id: id });
        });
        Appersonam.reqres.setHandler("get:image", function (id, target, showLoading) {
            return API.getFileEntity(id, target, showLoading)
        });
        Appersonam.reqres.setHandler("get:image:base64", function (value, target) {
            var defer = $.Deferred();
            var promise = defer.promise();
            defer.resolve(new Backbone.Model({ target: target, content: value }));
            return promise;
        });
    });
    return;
});