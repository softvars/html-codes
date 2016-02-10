define(["app",
    //"common/combo/list/list_view",
    'templates'
], function (Appersonam/*, Combo*/, JST) {
    Appersonam.module("Common.Image.Profile.View", function (View, Appersonam, Backbone, Marionette, $, _) {
        View.OptionsWidget = Marionette.ItemView.extend({
            template: JST['assets/js/common/image/profile/templates/options.html'],
            events: {
                'click .js-gallery': 'gallery',
                'click .js-snap': 'snap',
                'click .js-close': 'closeClicked'
            },
            closeClicked: function (e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.close();
            },
            snap: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('item:selected', 'snap');
            },
            gallery: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('item:selected', 'gallery');
            }
        });
        View.ImageWidget = Marionette.ItemView.extend({
            template: JST['assets/js/common/image/profile/templates/grabber.html'],
            className: "image-selector-container",
            events: {
                'click a#js-select-image': 'selectImage',
                'change input[type=file]': 'imageSelected'
            },
            cordovaBase64: null,
            imageSelected: function (e) {
                if (e) {
                    e.preventDefault();
                }
                var self = this;
                if (self.cordovaBase64) {
                    var bytes = (self.cordovaBase64.length - 814) / 1.37;
                    if (bytes <= 3000000) {
                        self.trigger('image:selected', self.cordovaBase64, self.model);
                    }
                    else {
                        var error = {
                            title: 'Caricamento non riuscito',
                            description: "Selezionare un' immagine inferiore ai 3 MB"
                        };
                        Appersonam.trigger('show:error', error, true);
                    }
                } else {
                    // we use the normal way to read a file with FileReader
                    var files = e.target.files,
                    file;

                    /*if (!files || files.length == 0) return; */

                    file = files[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {
                        // ATTENTION: to have the same result than the Flash object we need to split
                        // our result to keep only the Base64 part
                        $('#preview').attr('src', e.target.result);
                        var image = e.target.result.split('base64,')[1];
                        var bytes = (image.length - 814) / 1.37;
                        if (bytes <= 3000000) {
                            self.trigger('image:selected', image, self.model);
                        }
                        else {
                            var error = {
                                title: 'Caricamento non riuscito',
                                description: "Selezionare un' immagine inferiore ai 3 MB"
                            };
                            Appersonam.trigger('show:error', error, true);
                        }
                    };
                    try {
                        fileReader.readAsDataURL(file);
                    }
                    catch (ex) {
                        LogDB.log('errore readAsDataUrl image profile => ' + ex.message);
                    }
                }
            },
            addBlur: function () {
                $('#main-content .panel-manager').addClass('blurred-element');
            },
            removeBlur: function () {
                $('#main-content .panel-manager').removeClass('blurred-element');
            },
            selectImage: function (e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                var self = this;
                if (this.options.platform === 'web') {// il ! è per test
                    this.$el.find('#file').click();
                }
                else {
                    //else mobile 
                    //var backButtonListener = document.getElementById('backButton');
                    //backButtonListener.addEventListener('click', this.backButtonHandler, false);

                    document.addEventListener('backbutton', this.backButtonHandler, false);


                    var options = new View.OptionsWidget();
                    options.on('item:selected', function (value) {
                        var onPhotoSuccess = function (base64) {
                            self.cordovaBase64 = base64;
                            self.imageSelected();
                        };
                        var onPhotoFail = function (message) {
                            self.cordovaBase64 = null;
                        };
                        if (value === 'gallery') {
                            navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                targetWidth: 1080,
                                targetHeight: 1080,
                                correctOrientation: true
                            });
                        }
                        else {
                            navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: Camera.PictureSourceType.CAMERA,
                                targetWidth: 1080,
                                targetHeight: 1080,
                                correctOrientation: true
                            });
                        }
                        options.close();
                        self.removeBlur();
                    });
                    options.on('close', function () {
                        //backButtonListener.removeEventListener("click", self.backButtonHandler);
                        document.removeEventListener('backbutton', self.backButtonHandler);
                        self.removeBlur();
                        self.close();
                        setTimeout(function () { //dopo che il panelmanager non ha scatenato il back perché lockato, lo sblocco
                            Appersonam.CommonVariables['locked'] = false; // sblocca il tasto back
                        }, 100);
                    });
                    self.addBlur();
                    Appersonam.loadingContentRegion.show(options);



                    Appersonam.CommonVariables['locked'] = true; // sblocca il tasto back  
                }
            },
            backButtonHandler: function () {
                $('.js-close').click();
            }
        });
    });
    return Appersonam.Common.Image.Profile.View;
});