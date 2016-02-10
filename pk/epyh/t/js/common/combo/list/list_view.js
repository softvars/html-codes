define(["app",
    'templates',
    "backbone.syphon"
], function (Appersonam, JST) {

    Appersonam.module("Common.ComboView.List.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.ComboItemView = Marionette.ItemView.extend({
            template: JST['assets/js/common/combo/list/templates/list_item.html'],
            className: "combo-item",
            tagName: "li",
            events: {
                'click': 'selected'
            },
            initialize: function () {
                this.model.set({
                    name: this.model.get(this.options.textName)
                });
            },
            selected: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('selected', this.model);
            }
        });

        View.ComboItemsView = Marionette.CompositeView.extend({
            template: JST['assets/js/common/combo/list/templates/list.html'],
            className: 'hidden combo-selection modal-dialog',
            itemViewContainer: ".combo-list",
            itemView: View.ComboItemView,
            events: {
                'click span': 'showOptions',
                'click a.js-cancel': 'closeClicked'
            },
            showItems: function () {
                this.$el.removeClass('hidden');
            },
            hideItems: function (callBack) {
                this.$el.addClass('hidden');
                if (callBack) {
                    callBack();
                }
            },
            closeClicked: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('close:combo');
            },
            onShow: function () {
                var self = this;
                this.on('itemview:selected', function (itemview, item) {
                    self.selectedItem(item);
                });
                var firstItem = this.collection.first();
                if (this.options.selectFirstItem) {
                    this.selectedItem(firstItem);
                }
                if (this.options.title) {
                    this.$el.find('.top-title').html(this.options.title);
                }
            },
            selectedItem: function (item) {
                this.trigger('item:selected', item); //inputname è il nome dell'input da aggiornare nel form principale
            },
            buildItemView: function (item, ItemView) {
                var view = new ItemView({
                    model: item,
                    textName: this.options.textName
                });
                return view;
            },
        });
    }, Handlebars);
    return Appersonam.Common.ComboView.List.View;
});