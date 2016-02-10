define(["app"], function (Appersonam) {
    Appersonam.module("UserApp.Stats", function (Stats, Appersonam, Backbone, Marionette, $, _) {
        Stats.Controller = {
            showEntity: function (startDate, endDate) {
                var self = this;
                require(["apps/user/stats/show_view", "entities/stats"], function (View) {
                    self.statsLayout = new View.Layout();
                    var pieView = new View.PieView();
                    var inOutView = new View.InOutView();
                    var fetchingEntity = Appersonam.request("stats:entity", startDate, endDate);
                    $.when(fetchingEntity).done(function (entity) {
                        var commandsView = new View.CommandsView();
                        entity.set({ date: startDate });

                        var chartView = new View.ChartView({ model: entity });

                        chartView.on('show:pie', function (target) {

                            pieView.collection.reset(entity.get(target).chartDataItems, { silent: true });
                            var totalAmount = entity.get(target).totalAmount;
                            var type = target;
                            pieView.model.set({ type: type, totalAmount: totalAmount }, { silent: true });
                            pieView.render();
                            pieView.renderPie();//serve a tracciare il grafico

                            type = type.replace('Resume', '');
                            inOutView.model = new Backbone.Model({ type: type, data: entity.get(type) });

                            inOutView.render();
                            inOutView.showBarChart();
                        });
                        commandsView.on('date:changed', function (startDate, endDate) {
                            fetchingEntity = Appersonam.request("stats:entity", startDate, endDate);
                            $.when(fetchingEntity).done(function (entity) {
                                entity.set({ date: startDate });
                                chartView.model.set(entity.toJSON());
                                commandsView.setMonthName();
                                self.updateSubViews(entity, pieView, inOutView, chartView);
                                self.statsLayout.pieRegion.show(pieView);
                                self.statsLayout.inOutRegion.show(inOutView);
                            });
                        });

                        self.statsLayout.on("back", function () {
                            Appersonam.UserApp.trigger("nav:back", 'user', 1);
                        });

                        self.statsLayout.on("show", function () {
                            self.updateSubViews(entity, pieView, inOutView, chartView);
                            self.statsLayout.commandsRegion.show(commandsView);
                            self.statsLayout.chartRegion.show(chartView);
                            self.statsLayout.pieRegion.show(pieView);
                            self.statsLayout.inOutRegion.show(inOutView);
                        });

                        Appersonam.UserApp.trigger('show:main', self.statsLayout, 2);
                    });
                });
            },
            updateSubViews: function (entity, pieView, inOutView, chartView) {
                var pieCollection = new Backbone.Collection(entity.get('incomesResume').chartDataItems);
                var pieModel = new Backbone.Model({ date: entity.get('date'), totalAmount: entity.get('incomesResume').totalAmount, type: 'incomesResume' });
                pieView.collection = pieCollection;
                pieView.model = pieModel;


                var inOutViewModel = new Backbone.Model({ data: entity.get('incomes'), type: 'incomes' });
                inOutView.model = inOutViewModel;

            }
        }
    });
    return Appersonam.UserApp.Stats.Controller;
});
