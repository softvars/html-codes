define(["app",
    "apps/user/help/show_view"
], function (Appersonam, View) {
    Appersonam.module("UserApp.Help", function (Help, Appersonam, Backbone, Marionette, $, _) {
        Help.Controller = {
            show: function () {
                var helpView = new View.Show({
                    model: new Backbone.Model({
                        appVersion: Sella.appVersion
                    })
                });
                helpView.on('back', function () {
                    Appersonam.UserApp.trigger("nav:back", 'user/navigation', 1);
                });
                helpView.on("phone", function () {
                    document.location.href = 'tel:+390152434677';
                });
                helpView.on("faq", function () {
                    var url = 'http://www.hype.it/Hype/faq/';
                    //var ref = window.open(link, '_blank', 'location=yes');
                    WebViewPlugin.openLink(null, null, JSON.stringify({link: url}));
                });

                helpView.on("sendLog", function () {
                    var fetchingContacts = Appersonam.request('anonymize:contacts');
                    $.when(fetchingContacts).done(function (contacts) {
                        //LogDB.log("Contatti rubrica offuscati => " + contacts);
                        sendMailEntity = Appersonam.request("mail:entity", '', 'Segnalazione bug', 'support@hype.it');
                        sendMailEntity.set({
                            report: true,
                            contacts: contacts
                        });
                        Appersonam.trigger('show:loading');
                        sendMailEntity.save(null, {
                            success: function (data) {
                                Appersonam.trigger('close:loading');
                            },
                            error: function (data) {
                                Appersonam.trigger('show:error', {
                                    title: 'Siamo spiacenti',
                                    description: 'Si &egrave; verificato un errore durante l&#39; invio della segnalazione.<br />Controlla il tuo account di posta elettronica.'
                                }, true);
                                Appersonam.trigger('close:loading');
                            }
                        });
                    });
                });
                helpView.on("mail", function () {
                    var mailModel = new Backbone.Model({
                        title: "Invia dati via email",
                        description: "Inserisci la mail del destinatario",
                        button: 'Conferma invio'
                    });
                    sendMailEntity = Appersonam.request("mail:entity", '', 'Help me Hype Team!', 'help@hype.it');
                    sendMailEntity.save(null, {
                        success: function (data) {

                        },
                        error: function (data) {
                            Appersonam.trigger('show:error', {
                                title: 'Siamo spiacenti',
                                description: 'Si &egrave; verificato un errore durante l&#39; invio della segnalazione.<br />Controlla il tuo account di posta elettronica.'
                            }, true);
                        }
                    });
                });
                Appersonam.UserApp.trigger('show:main', helpView, 2);
            }
        };
    });
    return Appersonam.UserApp.Help.Controller;
});