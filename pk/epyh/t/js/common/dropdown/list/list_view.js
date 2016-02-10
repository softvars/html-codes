define(["app",
    'templates'], function (Appersonam, JST) {

     Appersonam.module("Common.Dropdown.List.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.DropdownItemView = Marionette.ItemView.extend({
            template: JST['assets/js/common/dropdown/list/templates/list_item.html'],
            tagName: "option",
            onShow: function () { 
                this.$el.attr('value', this.model.get('id')); 
            }
        });

        View.DropdownItemsView = Marionette.CompositeView.extend({
            template: JST['assets/js/common/dropdown/list/templates/list.html'],
            className: "dropdown-select",
            itemView: View.DropdownItemView,
            itemViewContainer: "select",
            events: {
                'change': 'itemSelected'
            },
            itemSelected: function (event) {
                event.preventDefault();
                var id = this.$el.find("option:selected").val();
                var text = this.$el.find("option:selected").text();
                this.$el.find('.show-selected-value').text(text);
                
                this.trigger('item:selected', this.collection.get(id));
                
            },
            onShow: function () {
                if (this.options.name) {
                    this.$el.find('select').attr('name', this.options.name);
                }

                if (this.options.selectedItem) {
                    var value = this.options.selectedItem.id
                    var text = this.$el.find("option:selected").text();

                    this.$el.find('select').val(value);
                    this.$el.find('.show-selected-value').text(this.options.selectedItem.name);
                }
            }
        });
}, Handlebars);
return Appersonam.Common.Dropdown.List.View;
});