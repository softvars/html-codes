define(["app", "apps/user/sellabox/list_view", "common/placeholder/view"], function (Appersonam, View, Placeholder) {
    Appersonam.module("UserApp.Sellabox", function (Sellabox, Appersonam, Backbone, Marionette, $, _) {
        Sellabox.Controller = {
            list: function () {
                var self = this;
                require(["entities/user"], function () {
                    var fetchingDocuments = Appersonam.request("sellabox:entities");
                    $.when(fetchingDocuments).done(function (documents) {
                        var view;
                        view = new View.Entities({
                            collection: documents
                        });
                        view.on("back", function () {
                            Appersonam.UserApp.trigger("nav:back", 'user', 1);
                        });
                        view.on("itemview:selected", function (childView, itemId) {
                            Appersonam.request("open:pdf", itemId);
                        });
                        Appersonam.UserApp.trigger('show:main', view, 2);
                    });
                });
            }
        };
    });
    return Appersonam.UserApp.Sellabox.Controller;
});
