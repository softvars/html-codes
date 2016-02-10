define(["app",
    "apps/navigation/android/list/list_view",
    "common/confirm/profile_view",
], function(Appersonam, View, Confirm) {
    Appersonam.module("NavigationApp.List", function(List, Appersonam, Backbone, Marionette, $, _) {
        List.Controller = {
            listNavigation: function() {
                var that = this;
                var fetchingCachedFinancial = Appersonam.request("global:get:object", 'financial');
                $.when(fetchingCachedFinancial).done(function(cachedFinancial) {
                    var menuItemsView = new View.MenuItemsView({
                        model: new Backbone.Model()
                    });
                    if (cachedFinancial.userSettings) {
                        var nickname = cachedFinancial.userSettings.nickname;
                        var image = cachedFinancial.userSettings.imageBase64;
                    } else {
                        var image = '';
                        var nickname = 'Il mio Hype';
                    }
                    var userDataView = new View.UserDataView({
                        model: new Backbone.Model({
                            image: image,
                            nickname: nickname
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
                    Appersonam.NavigationApp.on('corner:menu', function() {
                        menuItemsView.triggerMethod('corner:menu');
                    });
                    Appersonam.NavigationApp.on('reset:menu:items', function() {
                        menuItemsView.triggerMethod('reset:menu:items');
                    });
                    Appersonam.NavigationApp.on("set:selected", function(target) {
                        menuItemsView.triggerMethod('set:selected', target);
                    });
                    Appersonam.NavigationApp.on("hide:menu", function(target) {
                        menuItemsView.triggerMethod('corner:menu:out', target);
                    });
                    Appersonam.NavigationApp.on("show:menu", function(target) {
                        menuItemsView.triggerMethod('corner:menu:in', target);
                    });
                    Appersonam.NavigationApp.on("exit:app", function(ask, target) {
                        that.exitApp(ask, target);
                    });
                    menuItemsView.on('render', function() {
                        menuItemsView.userDataRegion.show(userDataView);
                    });
                    Appersonam.mainMenuRegion.show(menuItemsView);
                });
            },
            exitApp: function(ask, target) {
                var self = this;
                if (ask === true) {
                    if (!target) {
                        target = '.panel.center';
                    }
                    Appersonam.CommonVariables['locked'] = true;
                    //this.backButtonListener = document.getElementById('backButton');
                    this.close = function() {
                        document.removeEventListener('backbutton', self.close);
                        //self.backButtonListener.removeEventListener('click', self.close);
                        $(target).removeClass('blurred-element'); //tolgo il blur
                        Appersonam.currentApp.trigger('close:overlay', '-close-hype'); //chiudo l'overlay
                        setTimeout(function() { //dopo che il panelmanager non ha scatenato il back perché lockato, lo sblocco
                            Appersonam.CommonVariables['locked'] = false; // sblocca il tasto back
                        }, 100);
                    };

                    //this.backButtonListener.addEventListener("click", this.close, false);

                    document.addEventListener('backbutton', this.close, false);

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
                        self.close();
                    });
                    confirmPanel.on("confirm", function() {
                        navigator.app.exitApp();
                    });
                    $(target).addClass('blurred-element'); //aggiungo il blur
                    Appersonam.currentApp.trigger('show:overlay', confirmPanel, '-close-hype');
                } else {
                    navigator.app.exitApp();
                }
            },
            setActiveMenuItem: function(url) {
                //todo
            }
        };
    });
    return Appersonam.NavigationApp.List.Controller;
});
