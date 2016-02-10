define(["app",
 'templates'], function (Appersonam, JST) {
     Appersonam.module("Common.Loading.View", function (View, Appersonam, Backbone, Marionette, $, _) {
         View.Show = Marionette.ItemView.extend({ 
             template: JST['assets/js/common/loading/templates/loading.html'],
         });
     });
     return Appersonam.Common.Loading.View;
 });