define(["app",
    'templates',
"backbone.syphon"], function (Appersonam, JST) {

    Appersonam.module("Common.ComboView.List.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.ComboItemView = Marionette.ItemView.extend({
            template: JST['assets/js/common/combo/list/templates/list_item.html'],
            onShow: function () {

            },
            events: {
                'click': 'selected'
            },
            selected: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('selected', this.model);
            }
        });

        View.ComboItemsView = Marionette.CompositeView.extend({
            template: JST['assets/js/common/combo/list/templates/list.html'],
            itemView: View.ComboItemView,
            itemViewContainer: ".items",
            tagName: 'span',
            events: {
                'click span': 'showOptions',
            },
            initialize: function () {
                var value = this.model.get(this.options.valueName);
                var text = this.model.get(this.options.textName);
                this.model.set({ value: value, text: text, input: this.options.inputName });
                this.on('itemview:selected', function (itemview, item) {
                    var value = item.get(this.options.valueName);
                    var text = item.get(this.options.textName);
                    this.$el.find('input').val(value);
                    this.$el.find('span').text(text);
                    this.toggle();
                });
            },
            toggle: function () {
                this.trigger('toggle');
                this.$el.find('.items').toggleClass('hidden');
            },
            showOptions: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            }
        });
    }, Handlebars);
    return Appersonam.Common.ComboView.List.View;
});