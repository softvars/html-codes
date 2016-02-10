define(["app",
    "apps/p2p/contacts/profile/profile_view",
    "common/confirm/profile_view",
    "common/input/view"
], function(Appersonam, View, Confirm, Input) {
    Appersonam.module("P2pApp.Contacts.Profile", function(Profile, Appersonam, Backbone, Marionette, $, _) {
        Profile.Controller = {

            editEntity: function(entity, mode, transferOnly) {
                var self = this;
                var formEntity = Appersonam.request("edit:personal", entity.toJSON());
                formEntity.set({
                    transferOnly: transferOnly
                });
                var inputEmailViews = new Array();
                var inputPhoneViews = new Array();
                self.inputViews = new Array();
                self.inputViews['email'] = inputEmailViews;
                self.inputViews['phone'] = inputPhoneViews;
                var view;
                view = new View.Form({
                    model: formEntity,
                    mode: mode
                });
                var addInput = function(self, target, index, type, value, placeholder, view) { //funzione necessaria per aggiungere più email o numeri di telefono, per ora non usata
                    self.inputViews[target].push(new Input.InputWidget({
                        model: new Backbone.Model({
                            name: '',
                            target: target,
                            type: type,
                            placeholder: placeholder,
                            value: value,
                            confirmButon: false,
                            deleteButon: true,
                            instant: true,
                            style: 1,
                        })
                    }));
                    self.inputViews[target][index].on('confirm', function(value, target) {
                        view.setValue(value, target, index);
                    });
                    self.inputViews[target][index].on('delete', function() {
                        view.setValue('', target, index);
                    });
                    view.append(target, self.inputViews[target][index], index);
                };
                view.on("email:add", function(target, index, type, value, placeholder) {
                    addInput(self, target, index, type, value, placeholder, view);
                });

                view.on("phone:add", function(target, index, type, value, placeholder) {
                    addInput(self, target, index, type, value, placeholder, view);
                });

                view.on("back", function() {
                    Appersonam.P2pApp.trigger('nav:back', 'p2p', 1);
                });

                view.on("corner:menu", function() {
                    Appersonam.NavigationApp.trigger('corner:menu');
                });
                view.on("una:tantum", function(data) {
                    var errors = formEntity.validate(data, null);
                    if (errors) {
                        view.triggerMethod("form:data:invalid", errors);
                    } else {
                        entity.set(data, {
                            silent: false
                        });
                    }
                    view.model.clear({
                        silent: true
                    }).set({
                        email: "",
                        phoneNumber: "",
                        type: "personal",
                        transferOnly: transferOnly
                    }, {
                        silent: false
                    });
                    $('#panel_1').bind("webkitTransitionEnd", function() {
                        view.render();
                        $('#panel_1').unbind("webkitTransitionEnd");
                    });
                });
                view.on('delete:contact', function(destroyModel) { //entity fa parte di una lista di entità miste, quindi non ha la url per essere eliminata
                    var deleteContactEntity = Appersonam.request("edit:personal", destroyModel.toJSON());
                    var confirmModel = new Backbone.Model({
                        title: "Stai per eliminare questo contatto",
                        description: "Questo contatto verrà rimosso dalla tua lista personale.",
                        button: 'Conferma eliminazione',
                        className: 'confirmation-dialog-danger',
                    });
                    var confirmPanel = new Confirm.Profile({
                        model: confirmModel
                    });
                    Appersonam.P2pApp.trigger('show:overlay', confirmPanel, '-delete-contact');
                    view.addBlur();
                    confirmPanel.on('cancel', function() {
                        view.removeBlur();
                        Appersonam.P2pApp.trigger('close:overlay', '-delete-contact');
                    });
                    confirmPanel.on('confirm', function() {
                        deleteContactEntity.set('id', deleteContactEntity.get('id').replace('my-', ''))
                        deleteContactEntity.destroy({
                            success: function(result) {
                                if (!result.get('ErrorMessage')) {
                                    Appersonam.request('tracking:log:event', 'custom_contact_deleted');
                                    view.removeBlur();
                                    Appersonam.P2pApp.trigger('close:overlay', '-delete-contact');
                                    entity.set({
                                        deleted: true
                                    }, {
                                        silent: false
                                    });

                                } else {
                                    self.Layout.removeBlur();
                                    Appersonam.P2pApp.trigger('close:overlay');
                                }
                            },
                            error: function(result) {
                                self.Layout.removeBlur();
                                Appersonam.P2pApp.trigger('close:overlay');
                            }
                        });
                    });
                });

                view.on("form:submit", function(data) {
                    if (formEntity.get('id')) {
                        formEntity.set({
                            id: formEntity.get('id').replace('my-', '')
                        });
                    }
                    var destination = data.destination;
                    delete data.destination;
                    var selected = formEntity.get('selected');
                    //elementi che servono per la gestione delle collezioni ma che non vanno sul server
                    formEntity.unset('type');
                    formEntity.unset('selected');
                    formEntity.unset('selectedAliasIndex');
                    formEntity.unset('destination');
                    formEntity.unset('image');
                    formEntity.unset('transferOnly');
                    formEntity.unset('imageValue');
                    formEntity.unset('imageId');
                    formEntity.unset('hyper');
                    formEntity.unset('hypeId');

                    formEntity.set(data, {
                        silent: true
                    });
                    var saveResult = formEntity.save(data, {
                        serviceDestination: 'NEW',
                        success: function(result) {
                            data.type = 'personal';
                            data.destination = destination;
                            data.selected = selected;
                            data.id = 'my-' + result.get('id');
                            entity.clear({
                                silent: true
                            });
                            entity.set(data, {
                                silent: false
                            });
                            view.model.clear({
                                silent: true
                            }).set({
                                email: "",
                                phoneNumber: "",
                                type: "personal",
                                transferOnly: transferOnly
                            }, {
                                silent: false
                            });
                            Appersonam.request('tracking:log:event', 'custom_contact_created');
                            $('#panel_1').bind("webkitTransitionEnd", function() {
                                view.render();
                                $('#panel_1').unbind("webkitTransitionEnd");
                            });
                        },
                        error: function(result) {}
                    });
                    if (saveResult === false) {
                        view.triggerMethod("form:data:invalid", formEntity.validationError);
                    }
                });
                var page = 2;
                if (transferOnly === true) {
                    page = 1;
                }
                Appersonam.P2pApp.trigger('show:main', view, page);
            },
        };
    });
    return Appersonam.P2pApp.Contacts.Profile.Controller;
});
