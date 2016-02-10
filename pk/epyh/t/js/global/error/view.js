define(["app",
    "common/confirm/profile_view"
], function (Appersonam, Confirm) {
    Appersonam.module("Common.Error.View", function (View, Appersonam, Backbone, Marionette, $, _) {

        Appersonam.on('show:error', function (errorResult, generic) {
            var confirmModel = null;
            var errCode = parseInt(errorResult.errorCode);
            var showError = true;
            if (!generic) {
                //l'altro campo è errorText, ma non è garantito
                if (errCode === 400) {
                    confirmModel = new Backbone.Model({
                        title: "Dati non validi",
                        description: "Verificare i dati inseriti",
                        className: 'confirmation-dialog-danger',
                    });
                } else if (errCode === -1001) {
                    confirmModel = new Backbone.Model({
                        title: "Timeout",
                        description: "L'operazione sta richiedendo troppo tempo ed &egrave; stata interrotta",
                        className: 'confirmation-dialog-danger',
                    });
                } else if (errCode <= 0) {
                    confirmModel = new Backbone.Model({
                        title: "Errore di connessione",
                        description: "Verificare che il traffico dati sia attivo e riprovare",
                        className: 'confirmation-dialog-danger',
                    });
                } else {
                    var confirmModel = new Backbone.Model({
                        title: "Ops...",
                        description: "Si &egrave; verificato un problema",
                        className: 'confirmation-dialog-danger huge-title',
                    });
                    showError = false; // TODO - Workaround nasconde errore 500
                }
            }
            else {
                confirmModel = new Backbone.Model({
                    title: errorResult.title,
                    description: errorResult.description,
                    className: 'confirmation-dialog-danger',
                });
            }

            if (showError) {
                $('#main-content .panel-manager').addClass('blurred-element');

                var errorView = new Confirm.Profile({
                    model: confirmModel
                });

                var close = function () {
                    $('#main-content .panel-manager').removeClass('blurred-element');
                    Appersonam.errorContentRegion.close();
                    Appersonam.trigger('close:menu');
                    setTimeout(function () {//dopo che il panelmanager non ha scatenato il back perché lockato, lo sblocco
                        Appersonam.CommonVariables['locked'] = false; // sblocca il tasto back
                    }, 100);
                };

                errorView.on('cancel', function () {
                    close();
                });
                Appersonam.CommonVariables['locked'] = true; // blocca il tasto back
                Appersonam.errorContentRegion.show(errorView);
                var that = this;
                document.addEventListener('backbutton', function () {
                    document.removeEventListener('backbutton', arguments.callee);
                    close();
                }, false);

                //var backButtonListener = document.getElementById('backButton');
                //backButtonListener.addEventListener("click", function () {
                //    this.removeEventListener('click', arguments.callee);
                //    close();
                //}, false);

            }
        });

    });
    return Appersonam.Common.Error.View;
});