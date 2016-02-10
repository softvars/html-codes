define(["app",
    'templates',
], function (Appersonam, JST) {
    Appersonam.module("UserApp.Sellabox.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        View.Entity = Marionette.ItemView.extend({
            tagName: "div",
            className: "documents-list-item",
            template: JST['assets/js/apps/user/sellabox/templates/list_item.html'],
            events: {
                "click": "selected"
            },
            selected: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('selected', this.model.get('id'));
            },
        });

        var NoEntitiesView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/user/sellabox/templates/none.html'],
            tagName: "div",
            className: "no-documents"
        });

        View.Entities = Marionette.CompositeView.extend({
            template: JST['assets/js/apps/user/sellabox/templates/list.html'],
            itemView: View.Entity,
            itemViewContainer: ".documents-list",
            events: {
                "click .back": "back"
            },
            back: function (e) {
                e.preventDefault();
                this.trigger('back');
            }
        });
    }, Handlebars);
    return Appersonam.UserApp.Sellabox.View;
});