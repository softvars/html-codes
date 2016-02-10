define(["app",
    "apps/navigation/ios/list/list_view",
    "common/confirm/profile_view",
], function(Appersonam, View, Confirm) {
    Appersonam.module("NavigationApp.List", function(List, Appersonam, Backbone, Marionette, $, _) {
        List.Controller = {
            listNavigation: function() {
                var menuItemsView = new View.MenuItemsView({
                    model: new Backbone.Model()
                });
                var userDataView = new View.UserDataView({
                    model: new Backbone.Model({
                        nickname: 'Il mio Hype'
                    })
                });
                menuItemsView.on('navigate', function(data) {
                    var trigger = data.navigationTrigger;
                    var innerTrigger = data.innerTrigger;
                    Appersonam.trigger(trigger, innerTrigger);
                });
                Appersonam.NavigationApp.on('toggle:menu', function() {
                    menuItemsView.triggerMethod("toggle:menu");
                });
                Appersonam.NavigationApp.on('update:personaldata', function(fetchedImage, nickname) {
                    //if (fetchedImage) { //attivando questo if: entrando con un utente che non ha immagine profilo, continua a vedersi l'icona dell'utente precedente
                    userDataView.model.set({
                        image: fetchedImage
                    });
                    //}
                    if (nickname) {
                        userDataView.model.set({
                            nickname: nickname
                        });
                    }
                    userDataView.render();
                });
                Appersonam.NavigationApp.on('set:menu', function(data) {
                    menuItemsView.triggerMethod('set:menu', data);
                });
                Appersonam.NavigationApp.on('reset:menu:items', function() {
                    menuItemsView.triggerMethod('reset:menu:items');
                });
                Appersonam.NavigationApp.on('corner:menu', function() {
                    menuItemsView.triggerMethod('corner:menu');
                });
                Appersonam.NavigationApp.on("set:selected", function(target, index) {
                    menuItemsView.triggerMethod('set:selected', target, index);
                });
                Appersonam.NavigationApp.on("hide:menu", function(target) {
                    menuItemsView.triggerMethod('corner:menu:out', target);
                });
                Appersonam.NavigationApp.on("show:menu", function(target) {
                    menuItemsView.triggerMethod('corner:menu:in', target);
                });
                var that = this;
                Appersonam.NavigationApp.on("exit:app", function(ask) {
                    that.exitApp(ask);
                });
                menuItemsView.on('show', function() {
                    menuItemsView.userDataRegion.show(userDataView);
                });
                Appersonam.mainMenuRegion.show(menuItemsView);
            },
            setActiveMenuItem: function(url) {
                //todo
            },
            exitApp: function(ask) {
                var self = this;
                if (ask === true) {
                    Appersonam.CommonVariables['locked'] = true;
                    var close = function() {
                        $('.panel.center').removeClass('blurred-element'); //tolgo il blur
                        Appersonam.currentApp.trigger('close:overlay', '-close-hype'); //chiudo l'overlay
                        setTimeout(function() { //dopo che il panelmanager non ha scatenato il back perché lockato, lo sblocco
                            Appersonam.CommonVariables['locked'] = false; // sblocca il tasto back
                        }, 100);
                    };

                    var backButtonListener = document.getElementById('backButton');
                    backButtonListener.addEventListener("click", function() {
                        this.removeEventListener('click', arguments.callee);
                        close();
                    }, false);

                    document.addEventListener('backbutton', function() {
                        document.removeEventListener('backbutton', arguments.callee);
                        close();
                    }, false);

                    var confirmModel = new Backbone.Model({
                        title: 'Uscita da Hype',
                        description: "Sei sicuro di voler uscire da Hype?",
                        button: 'OK',
                        className: 'information-dialog',
                        deny: 'NO'
                    });
                    var confirmPanel = new Confirm.Profile({
                        model: confirmModel
                    });
                    confirmPanel.on("cancel", function() {
                        close();
                    });
                    confirmPanel.on("close", function() {
                        close();
                    });
                    confirmPanel.on("confirm", function() {
                        navigator.app.exitApp();
                    });
                    $('.panel.center').addClass('blurred-element'); //tolgo il blur
                    Appersonam.currentApp.trigger('show:overlay', confirmPanel, '-close-hype');
                } else {
                    navigator.app.exitApp();
                }
            }
        };
    });
    return Appersonam.NavigationApp.List.Controller;
});
