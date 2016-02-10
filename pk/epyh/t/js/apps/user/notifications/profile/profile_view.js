define(["app",
        'templates'
],
    function (Appersonam, JST) {
        Appersonam.module("Userapp.NotificationProfile.Views", function (Views, Appersonam, Backbone, Marionette, $, _, Handlebars) {
            Views.Form = Marionette.Layout.extend({
                template: JST['assets/js/apps/user/notifications/profile/templates/profile.html'],
                regions: {
                    formRegion: "#form-region",
                    optionsRegion: '#options-region',
                    //keyboardRegion: '#keyboard-region'
                },
                initialize: function () {
                    this.triggersObjectTree = this.options.triggersObjectTree;
                },
                events: {
                    "click .js-submit": "submitClicked",
                    'click a.subject': 'subjectClicked',
                    'click a.back': 'back',
                    'input #amount': 'setAmount'
                },
                back: function (e) {
                    e.preventDefault();
                    this.trigger('back');
                },
                addBlur: function () {
                    this.$el.addClass('blurred-element');
                },
                removeBlur: function () {
                    this.$el.removeClass('blurred-element');
                },
                onShow: function () {
                    var indicator, subIndicator, operator, value;
                    if (this.model.get('id')) {
                        this.data = this.model.get('data');
                    }
                    else {
                        this.data = ['category', '1', '>', '0'];
                    }
                    this.populate();
                },
                //showKeyboard: function (value) {
                //    var value = value.replace(/^0+(?!$)/, '');
                //    this.trigger('keyboard:show', value);
                //},

                setAmount: function (e) {
                    value = $(e.currentTarget).val();
                    if (value.length < 1) {
                        value = '0';
                    }
                    this.data[this.data.length - 1] = '' + parseFloat(value.replace(',', '.'));
                    this.$el.find('.' + (this.data.length - 1)).text(value);
                },

                populate: function () {
                    //this.keyboardRegion.close();
                    var i = 0;
                    var state = 0;
                    while (this.data[i] !== undefined) {
                        var value = this.data[i];
                        var triggerObject = this.triggersObjectTree[state];
                        if (triggerObject) {
                            if (Object.keys(triggerObject)[0] === 'numeric') {
                                this.$el.find('.' + i).text(this.data[i]);
                                this.$el.find('.' + i).attr('data-status', '1000');
                                //this.$el.find('.' + i).addClass('numeric');
                            } else {
                                var text = triggerObject[value].description;
                                this.$el.find('.' + i).text(text);
                                this.$el.find('.' + i).attr('data-status', state);
                                //this.$el.find('.' + i).removeClass('numeric');
                                state = triggerObject[value].state; //stato next del grafo
                            }
                        }
                        i = i + 1;
                    }
                    this.$el.find('.subject.mark').show();
                    while (4 - i > 0) {
                        this.$el.find('.' + i).hide();
                        i++;
                    }
                    this.$el.find('#amount').val('');
                    this.stripItalic();
                },
                stripItalic: function () {
                    this.$el.find('.subject ').each(function (key, value) {
                        var innerContent = value.innerText;
                        value.innerHTML = innerContent;
                    });
                },

                firstElement: function (object) {
                    for (var item in object) return item;
                },

                subjectClicked: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $('.notification-instructions').remove();
                    //this.keyboardRegion.close();
                    var level = $(e.currentTarget).data('level');
                    var state = e.currentTarget.dataset.status;
                    if (state === '1000') {
                        //var value = this.data[this.data.length - 1];
                        //this.showKeyboard('' + value);
                        this.$el.find('#amount').focus();
                    } else {
                        var value = this.data[level];
                        var optionsList = this.getOptionsByState(state); //lista di opzioni da popolare in base al soggetto
                        this.trigger('subject:selected', this.toArray(optionsList), level, state, value);
                    }
                },

                toArray: function (json) {
                    var result = [];
                    var keys = Object.keys(json);
                    keys.forEach(function (key) {
                        result.push($.extend({
                            'key': key
                        }, json[key]));
                    });
                    return result;
                },

                getOptionsByState: function (level) {
                    var objectTree = this.triggersObjectTree[level];
                    if (this.triggersObjectTree[1] === undefined) {
                        delete (objectTree['goal']);
                    }
                    if (objectTree['numeric']) {
                        console.log('numeric');
                    }
                    else {
                        return objectTree;
                    }
                },

                submitClicked: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger("model:save", this.data);
                },
                updateMenu: function (key, level, state) {
                    this.data[level] = key;
                    this.data = this.data.slice(0, level + 1);
                    while (this.data[level] !== undefined) {
                        var value = this.data[level];
                        var triggerObject = this.triggersObjectTree[state];
                        if (Object.keys(triggerObject)[0] === 'numeric') {
                            //this.$el.find('.' + level).text(0);
                            this.data[level] = 0;
                        } else if (Object.keys(triggerObject)[0] === 'happens') {
                            //this.$el.find('.' + level).text('avviene');
                        } else {
                            var text = triggerObject[value].description;
                            //this.$el.find('.' + level).data('state', state);
                            state = triggerObject[value].state; //prossimo stato
                            //this.$el.find('.' + level).text(text);
                            if (state !== 1000) { //
                                var nextStateContent = this.getOptionsByState(state);
                                this.data[level + 1] = this.firstElement(nextStateContent);
                                if (!nextStateContent) { //se sono arrivato alla fine dell'albero
                                    this.data[level + 1] = 0;
                                }
                            }
                        }
                        level = level + 1;
                    }
                    this.emptyUselessElements(level);
                    this.populate();
                },
                emptyUselessElements: function (level) {
                    while (level < 4) {
                        this.$el.find('.' + level).empty();
                        level = level + 1;
                    }
                }
            });

            Views.OptionsListItem = Marionette.ItemView.extend({
                template: JST['assets/js/apps/user/notifications/profile/templates/list_item.html'],
                tagName: 'li',
                className: 'combo-item',
                events: {
                    'click a.js-choice': 'choiceClicked'
                },
                onShow: function () {
                    //con questo pezzo non si vedono le opzioni. Da indagare
                    /*this.$el.find('i').each(function (key, value) {
                        var innerContent = value.innerText;
                        $(value).parent().html('<i>' + innerContent + '</i>');
                    });*/
                },
                choiceClicked: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var key = $(e.currentTarget).data('key');
                    this.trigger('choice:selected', key);
                }
            });

            Views.OptionsList = Marionette.CompositeView.extend({
                itemView: Views.OptionsListItem,
                itemViewContainer: '.combo-list',
                className: 'modal-dialog combo-selection ',
                template: JST['assets/js/apps/user/notifications/profile/templates/list.html'],
                events: {
                    'click .js-close': 'closeClicked'
                },
                closeClicked: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('close:choices');
                },
                initialize: function () {
                    this.level = this.options.level;
                    this.state = this.options.state;
                    this.listenTo(this.collection, "reset", function () {
                        this.appendHtml = function (collectionView, itemView, index) {
                            collectionView.$el.append(itemView.el);
                        }
                    });
                    this.on("itemview:choice:selected", function (itemview, key) {
                        this.trigger('choice:selected', key, this.level, this.state);
                    });
                },
                buildItemView: function (item, ItemView) {
                    if (item.get('key') === this.options.value) {
                        item.set({
                            className: 'selected'
                        });
                    }
                    var view = new ItemView({
                        model: item,
                        value: this.options.value
                    });
                    return view;
                },
            });
        }, Handlebars);
        return Appersonam.Userapp.NotificationProfile.Views;
    });