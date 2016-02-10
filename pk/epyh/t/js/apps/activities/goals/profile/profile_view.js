define(["app",
    'templates',
    "moment",
    "pickadate",
    "pickerDate",
    "pickerLng",
    "backbone.syphon"
],
    function (Appersonam, JST, moment, pickerDate, pickadate, pickerDate, pickerLng) {
        Appersonam.module("GoalsApp.Profile.Views", function (Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {
            moment.lang('it');

            Views.Form = Marionette.Layout.extend({
                template: JST['assets/js/apps/activities/goals/profile/templates/profile.html'],
                regions: {
                    formRegion: "#form-region",
                    dropdwonRegion: "#dropdown-region",
                    commandRegion: "#command-region",
                    keyboardRegion: Marionette.Region.KeyboardRegion
                },
                className: 'goal-profile-panel',
                dateFormat: 'D MMMM YYYY',
                initialize: function () {
                    this.oldCurrentAmount = this.model.get('currentAmount')
                    this.startDate = new Date().setHours(0, 0, 0, 0);
                },
                onRender: function () {

                },
                events: {
                    "click .js-submit": "submitClicked",
                    "click .amount-container": "showKeyboard",
                    'input #currentAmount-slider': 'updateCurrentAmount',
                    "click .back": "back",
                    //"keyup .ob-title": "updateTitle",
                    //"change .ob-title": "updateTitle",
                    'change [type="number"]': 'calculateAmount',
                    'change [name="endDate"]': 'dateChanged',
                    'keydown input': 'keyDownInput'
                },
                keyDownInput: function (e) {
                    var keyCode = e.keyCode;
                    if (keyCode === 13) {
                        e.preventDefault();
                        this.submitClicked(e);
                    }
                },
                updateTitle: function () {
                    var val = this.$el.find('.ob-title').text();
                    this.$el.find('#entity-title').val(val);
                },
                back: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('back');
                },
                showKeyboard: function (e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation()
                    }
                    var amount = this.$el.find('[name="total"]').val().replace(/^0+(?!$)/, '');

                    if (this.$el.find(".keyboard-container").hasClass("slideIn")) {
                        this.trigger('keyboard:close');
                    } else {
                        this.trigger('keyboard:show', '' + parseFloat(amount));
                    }
                },
                updateCurrentAmount: function (e) {
                    var sliderEl = this.$el.find('#currentAmount-slider');
                    var percentage = parseInt(sliderEl.val());
                    var total = parseFloat(this.$el.find('[name="total"]').val());
                    var CurrentAmount = Math.round(parseFloat(percentage * total / 100));
                    this.$el.find('#range-value').html(CurrentAmount); //agiorno il valore del label
                    this.$el.find('[name="currentAmount"]').val(CurrentAmount);
                    this.$el.find('#entity-currentAmount').text(CurrentAmount);
                    this.updateMoneyPerDay(); //aggiorno il daily rate  
                    this.sliderCss(percentage);
                },
                sliderCss: function (cssVal) {
                    cssVal = (cssVal / 100);
                    var sliderEl = this.$el.find('#currentAmount-slider');
                    sliderEl.css('background-image',
                        '-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + cssVal + ', #3db8de), ' + 'color-stop(' + cssVal + ', #C5C5C5)' + ')'
                        );
                },
                updateSlider: function () {
                    var currentAmount = parseFloat(this.$el.find('[name="currentAmount"]').val());
                    var total = parseFloat(this.$el.find('[name="total"]').val());
                    var percentage = 0;
                    if (total <= currentAmount && currentAmount > 0) {
                        percentage = 100;
                    } else if (currentAmount < total && total > 0) {
                        percentage = Math.round(100 * (currentAmount / total));
                    } else {
                        percentage = 0;
                    }
                    this.$el.find('#currentAmount-slider').val(percentage);
                    this.updateMoneyPerDay(); //aggiorno il daily rate}
                    this.sliderCss(percentage);
                },
                updateMoneyPerDay: function () {
                    var total = parseFloat(this.$el.find('[name="total"]').val());
                    var currentAmount = parseFloat(this.$el.find('[name="currentAmount"]').val());
                    var millisecondsEndDate = new Date(this.endDate).setHours(0, 0, 0, 0)
                    var millisecondsDifference = millisecondsEndDate - this.startDate; //numero di giorni in cui completare l'obiettivo
                    if (total > currentAmount && millisecondsDifference >= 1) {
                        var amountDifference = total - currentAmount; //totale meno soldi iniziali
                        var days = Math.round(millisecondsDifference / (1000 * 60 * 60 * 24));
                        var amountPerDay = Math.ceil((amountDifference / days) * 100) / 100;
                        this.$el.find('#daily-amount').html(amountPerDay);
                    }
                    else {
                        this.$el.find('#daily-amount').html('0');
                    }
                    var currentAmount = parseFloat(this.$el.find('[name="currentAmount"]').val());
                    var sts = this.model.get('sts');
                    if (!sts) {
                        console.log('!!!NIENTE STS!!!');
                    }
                    var diff = 0;
                    if (sts >= 0 && this.model.get('id') > 0) {
                        var diff = sts - (parseFloat(currentAmount) - parseFloat(this.oldCurrentAmount));
                        var positiveSts = diff > 0;
                    }
                    else {
                        var diff = parseFloat(this.oldCurrentAmount) - parseFloat(currentAmount) - (-1 * sts);
                        var positiveSts = diff >= 0;
                    }

                    if (positiveSts === true) {
                        this.$el.find('.sufficient-sts').show();
                        this.$el.find('.insufficient-sts').hide();
                    }
                    else {
                        this.$el.find('.sufficient-sts').hide();
                        this.$el.find('.insufficient-sts').show();
                    }

                    this.$el.find('.sts-left').html('' + Math.round(Math.abs(diff) * 100) / 100);
                },
                transformDate: function (italianFormat) {
                    return italianFormat.split('/')[2] + '-' + italianFormat.split('/')[1] + '-' + italianFormat.split('/')[0];
                },
                dateChanged: function (event, dateValue) {
                    if (this.dateSupported === 'true') {
                        var pickerValue = this.$el.find('[name="endDate"]').val()
                        if (pickerValue.indexOf('/') > -1 && pickerValue.split('/')[2].length === 4) {
                            pickerValue = this.transformDate(pickerValue);
                        }
                        this.endDate = new Date(pickerValue);
                    } else {
                        this.endDate = dateValue;
                    }
                    this.updateMoneyPerDay();
                },
                onShow: function () {
                    var self = this;
                    this.endDate = this.model.get('endDate');
                    Backbone.Syphon.deserialize(this, this.model.toJSON());
                    //var date = moment(this.endDate);
                    this.dateSupported = Appersonam.request("global:get:dateSupported");
                    if (this.dateSupported === 'false') {
                        var picker = this.$el.find('[name="endDate"]').pickadate({
                            onSet: function (context) {
                                var nativeDate = new Date(context.select);
                                var momentDate = new moment(nativeDate).format('DD/MM/YYYY');
                                self.$el.find('[name="endDate"]').val(momentDate);
                                self.dateChanged(null, nativeDate);
                            }
                        });
                        this.$el.find('[name="endDate"]').val(new moment(new Date(this.endDate)).format('DD/MM/YYYY')); //inizializzo display data di fine
                    } else {
                        this.$el.find('[name="endDate"]').val(new moment(new Date(this.endDate)).format('YYYY-MM-DD')); //inizializzo display data di fine
                    }
                     
                    this.$el.find('.js-start-date').text(new moment(new Date(this.startDate)).format(this.dateFormat)); //inizializzo display data di inizio
                    this.$el.find('#range-value').html(this.model.get('currentAmount'));

                    this.updateMoneyPerDay();
                    this.updateSlider();

                },
                setAmount: function (data) { //quando cambia un valore da tastiera
                    this.$el.find('#entity-total').html(('' + data).replace('.', ',').replace(/^0+(?!$)/, ''));
                    this.$el.find('[name="total"]').val(data);
                    this.updateSlider(); //aggiorna lo slider
                    this.updateCurrentAmount();
                },
                calculateAmount: function (e) {
                    //quando cambia un valore da tastiera
                    $(e.currentTarget).attr('size', $(e.currentTarget).val().length);

                    var value = $(e.currentTarget).val();
                    if (parseFloat(value) < 0) {
                        value = 0;
                        $(e.currentTarget).val(0);
                    }
                    this.$el.find('#entity-' + $(e.currentTarget).attr('id')).html(('' + value).replace('.', ',').replace(/^0+(?!$)/, ''));
                    this.updateSlider(); //aggiorna lo slider
                },
                submitClicked: function (e) {
                    e.preventDefault();
                    var data = Backbone.Syphon.serialize(this);
                    data.endDate = new Date(data.endDate).getTime();
                    this.trigger("form:submit", data);
                },
                onFormDataInvalid: function (errors) {
                    var $view = this.$el;
                    var clearFormErrors = function () {
                        var $form = $view.find("form");
                        $form.find(".help-inline.error").each(function () {
                            $(this).remove();
                        });
                        //$form.find(".control-group.error").each(function () {
                        //    $(this).removeClass("error");
                        //});
                    }
                    var markErrors = function (value, key) {
                        var $validatedInput = $view.find(".js-validate-element-" + key);
                        var $errorEl = $("<div>", {
                            class: "help-inline error",
                            text: value,
                            style: 'color:red;'
                        });
                        $validatedInput.after($errorEl).addClass("error");
                    }
                    clearFormErrors();
                    _.each(errors, markErrors);
                }
            });
        }, Handlebars);
        return Appersonam.GoalsApp.Profile.Views;
    });