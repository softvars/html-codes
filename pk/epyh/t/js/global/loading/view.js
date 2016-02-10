define(["app",
    'templates'
    ], function(Appersonam, JST) {
        Appersonam.module("Common.Loading.View", function(View, Appersonam, Backbone, Marionette, $, _) {

            View.Show = Marionette.ItemView.extend({
                template: JST['assets/js/global/loading/templates/loading.html'],
                className: 'modal-dialog loading-dialog full-opacity',
                onShow:function(){
                    /*
                    var number = 1 + Math.floor(Math.random() * 3);
                    this.$el.find('.loading-text .message.text-'+ number).addClass('selected');
                    */
                },
                makeTransparent: function() {
                    this.$el.removeClass('full-opacity');
                }
            });
            Appersonam.on('reset:loading', function () {
                $('#main-content .panel-manager').removeClass('blurred-element');
                Appersonam.loadingContentRegion.close();
                this.loadingView = null;

            });
            Appersonam.on('show:loading', function () {
            //al momento non blocco il back durante il loading, altrimenti si sblocca anche quando fa logout
            //Appersonam.CommonVariables['locked'] = true;
            $('#main-content .panel-manager').addClass('blurred-element');
            if (!this.loadingView) {
                this.index = 1;
                this.loadingView = new View.Show();
                this.firstTime = true;
            } else {
                this.index += 1;
                if (this.firstTime === false) {
                    this.loadingView.makeTransparent();
                }
            }
            if (this.loadingView !== undefined && this.loadingView.isClosed !== false) {
                Appersonam.loadingContentRegion.show(this.loadingView);
            }
            //console.log(this.index)
        });
            Appersonam.on('close:loading', function() {
                if (this.index < 2) {
                    $('#main-content .panel-manager').removeClass('blurred-element');
                    Appersonam.loadingContentRegion.close();
                    Appersonam.trigger('close:menu');
                    this.firstTime = false;
                //al momento non blocco il back durante il loading, altrimenti si sblocca anche quando fa logout
                //Appersonam.CommonVariables['locked'] = false; 
            }
            if (this.index > 0) {
                this.index -= 1;
            }
            //console.log(this.index)
        });

        });
return Appersonam.Common.Loading.View;
});