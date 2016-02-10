define(["app",
    'templates'], function (Appersonam, JST) {
     Appersonam.module("Common.Input.View", function (View, Appersonam, Backbone, Marionette, $, _) {
         View.InputWidget = Marionette.ItemView.extend({
             template: JST['assets/js/common/input/templates/input.html'],
             events: {
                 'click a.js-confirm': 'confirm',
                 'click a.js-delete': 'deleteItem',
                 'keyup input': 'keyup'
             },
             keyup: function (e) {
                 if (e.which == 13) {
                     this.confirm();
                 }
                 else if (this.model.get('instant') === true) {//se è un input che deve aggiornare un input ad ogni tasto premuto
                     this.confirm();
                 }
             },
             onShow: function () {

             },
             deleteItem: function (e) {
                 e.preventDefault();
                 this.trigger('delete');
                 this.close();
             },
             confirm: function (e) {
                 if (e) {
                     e.preventDefault();
                 }
                 var target = this.model.get('target');
                 var value = this.$el.find('input').val();
                 var index = this.model.get('index');
                 this.trigger('confirm', value, target, index);
             }
         });
     });
     return Appersonam.Common.Input.View;
 });