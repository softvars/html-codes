define(["app",
    'templates',
], function (Appersonam, JST) {
    Appersonam.module("UserApp.NotificationList.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        View.Entity = Marionette.ItemView.extend({
            tagName: "div",
            className: "notification-item",
            template: JST['assets/js/apps/user/notifications/list/templates/list_item.html'],

            events: {
                "click": "selected",
                "click a.delete": "deleteClicked"
            },
            deleteClicked: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('notification:delete', this.model);
            },
            selected: function (e) {
                e.preventDefault();
                e.stopPropagation();
                //this.trigger("notification:selected", this.model); //LA MODIFICA E' SOSPESA
            },
            onShow: function () {
                var result = 'Avvertimi quando ';
                var dataArray = this.model.toJSON();
                var i = 0;
                var data = this.model.get('data');
                this.populate(data);
            },
            populate: function (data) {
                var i = 0;
                var state = 0;
                while (data[i] !== undefined) {
                    var value = data[i];
                    if (value === '==') {
                        value = '>';
                    }
                    var triggerObject = this.options.triggersObject[state];
                    if (triggerObject) {
                        if (Object.keys(triggerObject)[0] === 'numeric') {
                            this.$el.append(data[i] + ' ');
                        }
                        else {
                            var text = triggerObject[value].description;
                            this.$el.append(text + ' ');
                            state = triggerObject[value].state;//stato next del grafo
                        }
                    }
                    i = i + 1;
                }
                this.stripItalic();
            },
            stripItalic: function () {
                this.$el.find('.subject ').each(function (key, value) {
                    var innerContent = value.innerText;
                    value.innerHTML = innerContent;
                });
            },
        });

        var NoEntitiesView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/user/notifications/list/templates/none.html'],
            tagName: "div",
            className: "alert"
        });

        View.Entities = Marionette.CompositeView.extend({
            template: JST['assets/js/apps/user/notifications/list/templates/list.html'],
            itemView: View.Entity,
            itemViewContainer: ".js-content",
            events: {
                'click a.js-new': 'newNotification',
                "click .back": "back"
            },
            initialize: function () {
                if (this.options.emptyView) {
                    this.emptyView = this.options.emptyView;
                }
                else {
                    this.emptyView = NoEntitiesView;
                }
            },
            buildItemView: function (item, ItemView) {
                var view = new ItemView({
                    model: item,
                    triggersObject: this.options.triggersObject,
                    placeholderType: 'notifications'
                });
                return view;
            },
            back: function (e) {
                e.preventDefault();
                this.trigger('back');
            },
            onRender: function () {
                console.log('aggiorno lista trigger');
            },
            onShow: function () {
                console.log('onshow');
            },
            newNotification: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('notification:new');
            }
        });
    }, Handlebars);
    return Appersonam.UserApp.NotificationList.View;
});