define(["app",
    'templates',
 "moment",
"d3",
'backbone.hammer'], function (Appersonam, JST, moment, d3,hammer) {

    Appersonam.module("UserApp.Stats.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {

        moment.lang('it');

        

        /*localizzazione per d3 - sui time scale però serve fx manuale perché usa mapping interno*/
        var d3_itaFormatters = d3.locale({
            decimal: ",",
            thousands: ".",
            grouping: [3],
            currency: ["€", ""],
            dateTime: "%a %b %e %X %Y",
            date: "%m/%d/%Y",
            time: "%H:%M:%S",
            periods: ["AM", "PM"],
            days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
            shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
            months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
            shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
        });
        d3.time.format = d3_itaFormatters.timeFormat;
        d3.format = d3_itaFormatters.numberFormat;

        var scroll;
        var lastScroll;
        var touchend;
        var lineChartData;
        var barChartData;
        var xScale;
        var graphWidth;

        Handlebars.registerHelper('in_out_mese', function () {
            //type,date,totalAmount
            var tipo = (this.type === 'outcomesResume' ? 'Uscite ' : 'Entrate ');
            var mese = moment(new Date(this.date)).format('MMMM YYYY');
            return tipo + ' ' + mese;
        });

        View.Layout = Marionette.Layout.extend({
            template: JST['assets/js/apps/user/stats/templates/layout.html'],
            regions: {
                commandsRegion: "#commands-region",
                chartRegion: "#chart-region",
                pieRegion: "#pie-region",
                inOutRegion: "#in-out-region"
            },
            events: {
                'click .back': 'back'
            },
            back: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('back');
            },
            addBlur: function () {
                this.$el.addClass('blurred-element');
            },
            removeBlur: function () {
                this.$el.removeClass('blurred-element');
            }
        });

        View.CommandsView = Marionette.ItemView.extend({
            initialize: function () {
                this.startDate = moment().date(1);
                this.endDate = moment().add('months', 1).date(1).subtract('days', 1);
            },
            template: JST['assets/js/apps/user/stats/templates/commands.html'],
            events: {
                'click a.js-month': 'change'
            },
            change: function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(e.currentTarget).data('action') === 'add') {
                    this.startDate.add('months', 1);
                    this.endDate.add('months', 2).date(1).subtract('days', 1);
                }
                else {
                    this.startDate.subtract('months', 1);
                    this.endDate = moment(new Date(this.startDate.year(), this.startDate.month(), 1));
                    this.endDate.add('months', 1).subtract('days', 1);
                }
                this.trigger('date:changed', this.startDate.format('MM/DD/YYYY'), this.endDate.format('MM/DD/YYYY'));
                if (this.startDate.format('MMMM YYYY') === moment(new Date()).format('MMMM YYYY')) {
                    this.$el.find('.js-month.next').hide();
                } else {
                    this.$el.find('.js-month.next').show();
                }

            },
            setMonthName: function () {
                var monthName = moment(this.startDate).format('MMMM YYYY');
                this.$el.find('.js-monthname').text(monthName);
            },
            onShow: function () {
                var monthName = this.startDate.format('MMMM YYYY');
                this.$el.find('.js-monthname').text(monthName);
                //qui solo all'apertura delle statistiche del mese corrente
                this.$el.find('.js-month.next').hide();
            },
        });

        View.InOutView = Marionette.ItemView.extend({

            onShow: function () {
                this.showBarChart();
            },
            template: JST['assets/js/apps/user/stats/templates/in_out.html'],
            showBarChart: function () {

                var container = this.$el.find("#barchart");
                var curDate = moment();
                var outBalanceData = this.model.get('data');
                barChartData = outBalanceData;

                var scala = $('#in-out-region .graph .y.axis');
                var linea = $('#in-out-region .graph .linea-div');
                var box = $('#in-out-region .graph');

                container.empty();

                var svgContainer = d3.select("#barchart").append("svg");

                var itaTimeFormatter = function (date) {
                    // http://runnable.com/Um0fYqDLgQlNAAXE/use-moment-js-to-format-time
                    //return moment(date).format("ddd D");
                    return moment(date).format("D");
                };
                var voidFormatter = function (date) {
                    return '';
                };
                var dayFormatter = function (weekNum, date) {
                    return moment(date).format("ddd") + ' ' + moment(date).format("D");
                };
                var dayNumFormatter = function (date) {
                    return moment(date).format("D");
                };
                function getDate(d) {
                    return new Date(d);
                }
                function getMaxAmount(arr) {
                    //return _.max(arr, function (point) { return point.value; });
                    return _.max(arr, function (point) { return point[1]; });
                }
                function getRationalMaxAmout(amt) {
                    if (amt < 5) {
                        return 5;
                    }
                    else if (amt < 10) {
                        return 10;
                    }
                    else if (amt < 20) {
                        return 20;
                    }
                    else if (amt < 50) {
                        return 50;
                    }
                    else if (amt < 100) {
                        return 100;
                    }
                    else if (amt < 250) {
                        return 250;
                    }
                    else if (amt < 500) {
                        return 500;
                    }
                    else {
                        return 1000;
                    }
                }

                // get max and min dates - this assumes data is sorted
                var minDate = getDate(outBalanceData[0][0]);
                var maxDate = getDate(outBalanceData[outBalanceData.length - 1][0]);
                //var mergedData = _.union(incomesData, outcomesData, outBalanceData);
                //grafici troppo alti per pochi euro al giorno
                var maxAmount = getRationalMaxAmout(getMaxAmount(outBalanceData)[1]);
                //var maxAmount = 250;//massimo ricaribile giorno

                //var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                //var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                var margin = { top: 20, right: 0, bottom: 20, left: 30 };
                //width = container.width() - margin.left - margin.right;
                var height = container.height() - margin.top - margin.bottom;

                //svgContainerHover.attr('style','position:fixed;margin-top:-'+(container.height()-10)+';height:'+(container.height() - 10)+';').attr('class','top');
                svgContainer.attr('style','width:'+(width+graphWidth + (width/15))+'px;');
                //container.attr('style','overflow-x:auto;overflow-y:hidden;');

                //xScale = d3.time.scale().domain([minDate, maxDate]).range([0, graphWidth]);
                //var xScale = d3.time.scale().domain([minDate, maxDate]).ticks(d3.time.week, 1).range([0, width]);
                var yScale = d3.scale.linear().domain([0, maxAmount]).range([height, 0]);

                // http://alignedleft.com/tutorials/d3/axes
                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .tickSize(0)//elimino anche i tick di inizio/fine
                    .ticks(d3.time.day, 1)
                    .tickFormat(voidFormatter);

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .ticks(0)//tolgo i tick
                    .tickSize(0)//elimino anche i tick di inizio/fine
                    .orient("left");

                /* blocchi sfondo per fine settimana */
                /* aggiunti prima di tutto perché devo essere di sfondo */
                /*
                svgContainer.selectAll("rect.weekend")
                    .data(outBalanceData.filter(function (d) {
                        var isSaturday = (moment(d[0]).isoWeekday() === 6)
                        if (isSaturday) {
                            return true
                        }
                    }))
                    .enter()
                    .append("rect")
                    .attr('class', 'weekend')
                    .attr("x", function (d, i) {
                        return xScale(new Date(d[0])) - 1;
                    })
                    .attr("y", function (d, i) {
                        return -10;
                    })
                    .attr('width', function (d, i) {
                        var weekendStart = moment(d[0]);
                        var weekendEnd = moment(d[0]).add(2, 'day');

                        var startPoint = xScale(weekendStart.toDate());
                        var endPoint;

                        if (weekendEnd.month() !== weekendStart.month()) {
                            endPoint = xScale(weekendStart.add(1, 'day').toDate());
                        } else {
                            endPoint = xScale(weekendEnd.toDate());
                        }

                        return endPoint - startPoint;
                    })
                    .attr("height", function (d, i) {
                        return 130;
                    });
                */

                // aggiunge il testo dell'ordinata
                scala.append('MAX '+maxAmount+' €');

                // renderizza l'ascissa
                svgContainer.append("g")
                    .attr("class", "x axis")
                    .call(xAxis)
                    .attr("transform", "translate("+width/2+"," + (height + 1) + ")")
                    .style("text-anchor", "end");

                /* linee verticali entrate/uscite */
                svgContainer.append('g')
                    .attr('class','data')
                    .attr("transform", "translate("+width/2+",0)")
                    .selectAll("rect")
                    .data(outBalanceData)
                    .enter().append("rect")
                    .attr("x", function (d, i) {
                        return xScale(new Date(d[0])) - 6;
                    })
                    .attr("y", function (d, i) {
                        return yScale(d[1]) - 0.6;
                    })
                    .attr("width", 12)
                    //.attr('rx',2)
                    //.attr('ry',2)
                    .attr("height", function (d, i) {
                        return height - yScale(d[1]);
                    });
                /*
                                d3.select("#barchart") //stile per tick grandi
                                    .selectAll(".x.axis .tick line")
                                    .filter(function(d, i){ 
                                        return (i % 6) === 0; })
                                    .attr("y2", -26);
                                d3.select("#barchart") //stile per tick piccoli
                                    .selectAll(".x.axis .tick line")
                                    .filter(function(d, i){ 
                                        return (i % 6) !== 0; })
                                    .attr("y2", -5);
                */
                d3.select("#barchart") //tick piccoli (tutti)
                    .selectAll(".x.axis .tick line")
                    .attr("y2", 5);

                d3.select("#barchart") // tick giornalieri
                    .selectAll(".x.axis .tick text")
                    .attr("y", 10)
                    .text(function (d, i) {
                        return dayFormatter(i, d);
                    })
                    .selectAll(".x.axis .tick text tspan")
                    .text(function (d, i) {
                        return dayFormatter(i, d);
                    });

                // Renderizza la linea centrale
                linea.attr('style','height:'+height+'px;');
                    
                // si collega lo scroll 
                container.on('scroll',scroll);
                //container.on('touchend',touchend);
                //Hammer(svgContainer[0]).on('drag',scroll);
                Hammer(svgContainer[0]).on('release',touchend);

                // -- Si mostrano i dati nella casella corretta
                // si settano inizialmente i dati dei due riquadri
                var nday = parseInt((width/2) / tickDistance);

                $('#chart-region .graph .graph-date').text(function(a) {
                    var d = lineChartData[nday][0];
                    return moment(d).format("D MMMM");
                });
                $('#chart-region .graph .graph-value').text(function() {
                    return lineChartData[nday][1] + " €";
                });
                if(curDate.isAfter(moment(lineChartData[nday][0]))) {
                    $('#chart .graph-box').fadeIn();
                }
                box.find('.graph-date').text(function(a) {
                    var d = lineChartData[nday][0];
                    return moment(d).format("D MMMM");
                });
                var valore;
                if(nday != 0) {
                    valore = barChartData[nday][1];
                }
                else {
                    valore = 0;
                }

                if(valore != 0) {
                    box.fadeIn();
                    valore =valore.toFixed(2); 
                
                    box.find('.graph-value').text(function() {
                        return valore + " €";
                    });
                }

                // -- Ci si sposta sul primo giorno vicino 
                touchend();
            }
        });

        View.ChartView = Marionette.ItemView.extend({
            template: JST['assets/js/apps/user/stats/templates/chart.html'],
            className: "stats-wrapper",
            initialize: function () {
                var self = this;
                if (!this.model.get('date')) {
                    this.model.set({ date: new Date() });
                }
                this.model.on('change', function () {
                    self.render();
                    self.showGraph();
                });
            },
            showGraph: function () {

                /* genazione dati
                var saldoMatrix = [];
                var day = new Date(1412114400000);
                for (var i = 0; i < 31; i++) {
                    saldoMatrix[i] = [day.getTime(), i+i];
                    day.setDate(day.getDate()+1);
                };
                JSON.stringify(saldoMatrix);
                */
                var container = $('#chart');
                var curDate = moment();
                //var incomesData = this.model.get('incomes');
                var balanceData = this.model.get('balance');
                lineChartData = balanceData;
                 /*_.filter(
                    this.model.get('balance'), 
                    function(dayBal){ 
                        return ( curDate.isBefore(dayBal[0], 'days') 
                            || curDate.isSame(dayBal[0], 'days') 
                        ); 
                    });*/
                //var outcomesData = this.model.get('outcomes');

                container.empty();

                var svgContainer = d3.select("#chart").append("svg");

                var scala = $('#chart-region .graph .y.axis');
                var linea = $('#chart-region .graph .linea-div');
                var box = $('#chart-region .graph');

                var itaTimeFormatter = function (date) {
                    // http://runnable.com/Um0fYqDLgQlNAAXE/use-moment-js-to-format-time
                    //return moment(date).format("ddd D");
                    return moment(date).format("D");
                };
                var voidFormatter = function (date) {
                    // http://runnable.com/Um0fYqDLgQlNAAXE/use-moment-js-to-format-time
                    //return moment(date).format("ddd D");
                    return '';
                };
                var dayWeekFormatter = function (dayNum, date) {
                    return moment(date).format("ddd") + ' ' + moment(date).format("D");
                };
                var dayFormatter = function(dayNum,date) {
                    return moment(date).format("D");
                }
                function getDate(d) {
                    return new Date(d);
                }
                function getMaxAmount(arr) {
                    //return _.max(arr, function (point) { return point.value; });
                    return _.max(arr, function (point) { return point[1]; });
                }
                function getRationalMaxAmout(amt) {
                    if (amt < 75) {
                        return 75;
                    } else if (amt < 250) {
                        return 250;
                    } else if (amt < 500) {
                        return 500;
                    } else {
                        return 1000;
                    }
                }

                // get max and min dates - this assumes data is sorted
                var minDate = getDate(balanceData[0][0]);
                var maxDate = getDate(balanceData[balanceData.length - 1][0]);
                //var mergedData = _.union(incomesData, outcomesData, balanceData);

                //grafici troppo alti per    euro al giorno
                var maxAmount = getRationalMaxAmout(getMaxAmount(balanceData)[1]);
                //var maxAmount = 1000;//massimo saldo carta

                //var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                //var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                var margin = { top: 10, right: 10, bottom: 20, left: 10 };
                width = container.width() - margin.right - margin.left; // 10 di padding iniziale
                var height = container.height() - margin.top - margin.bottom;

                // grandezza del grafico = grandezza fisica * numero di settimane trascorse tra le due date
                graphWidth = width * parseInt((maxDate.getDate() - minDate.getDate()) / 7);
                tickDistance = (graphWidth / (maxDate.getDate() - minDate.getDate()));

                //svgContainerHover.attr('style','position:fixed;margin-top:-'+(container.height()-10)+';height:'+(container.height() - 10)+';');
                svgContainer.attr('style','width:'+(width+graphWidth + (width/15))+'px;');

                xScale = d3.time.scale().domain([minDate, maxDate]).range([0, graphWidth ]);
                //var xScale = d3.time.scale().domain([minDate, maxDate]).ticks(d3.time.week, 1).range([0, width]);
                var yScale = d3.scale.linear().domain([0, maxAmount]).range([height, 0]);

                var lineFunction = d3.svg.line()
                    .interpolate('monotone') // line smoothing,
                    .x(function (d) { return xScale(getDate(d)); })
                    .y(function (d) { return yScale(d.value); });

                var balanceFunction = d3.svg.line()
                    //.interpolate('monotone') // line smoothing,
                    .x(function (d) { return xScale(new Date(d[0])); })
                    .y(function (d) { return yScale(d[1]); });

                // http://alignedleft.com/tutorials/d3/axes
                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .tickSize(0)//elimino anche i tick di inizio/fine
                    .ticks(d3.time.day, 1)
                    .tickFormat(voidFormatter);

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .ticks(0)//tolgo i tick
                    .tickSize(0)//elimino anche i tick di inizio/fine
                    .orient("left");

                // Renderizza l'ascisse in grafica
                svgContainer.append("g")
                    .attr("class", "x axis")
                    .call(xAxis)
                    .attr("transform", "translate("+width/2+"," + height + ")")
                    .style("text-anchor", "end");

                // Renderizzano le ordinate in grafica
                scala.append('MAX '+maxAmount+' €');

                // renderizza il grafico
                svgContainer.append("path")
                    .attr("transform", "translate("+width/2+",0)")
                    .attr("d", balanceFunction(_.filter(
                        balanceData,
                        function (dayBal) {
                            return (curDate.isAfter(dayBal[0], 'days')
                                || curDate.isSame(dayBal[0], 'days')
                            );
                        })
                    ))
                    .attr("stroke", "#282941")
                    .attr("stroke-width", 2)
                    .attr("fill", "none")
                    .attr('class','data');

                // renderizza i cerchi
                svgContainer.append('g')
                    .attr('class','circles')
                    .attr("transform", "translate("+width/2+",0)")
                    .selectAll(".point")
                    .data(balanceData)
                    .enter().append("circle")
                    .filter(function (d, i) {
                        return curDate.isAfter(d[0], 'days');
                    })
                    .attr("fill", function (d, i) { return "#000000"; })
                    //.attr('stroke', '#282941')
                    //.attr('stroke-width', '2')
                    .attr("cx", function (d, i) { return xScale(new Date(d[0])); })
                    .attr("cy", function (d, i) { return yScale(d[1]); })
                    .attr("r", function (d, i) { return 3 });
                
                // Renderizza la linea centrale
                linea.attr('style','height:'+height+'px;');

                // Attiva lo scroll orizzontale
                lastScroll = 0;
                scroll = function() {
                    var tx = container.scrollLeft(); 
                    if(lastScroll == tx) {
                        tx =  $('#barchart').scrollLeft();
                    }
                    lastScroll = tx;

                    var box = $('#chart-region .graph .graph-box');
                    var nday = parseInt(tx / tickDistance);
                    // testo del giorno
                    box.find('.graph-date').text(function(a) {
                        var d = lineChartData[nday][0];
                        return moment(d).format("D MMMM").toUpperCase();
                    });
                    // testo del valore
                    box.find('.graph-value').text(function() {
                        return (lineChartData[nday][1] + " €").replace('.',',');
                    });
                    // se la giornata di oggi e' superata allora si nasconde il giorno corrente.
                    if(curDate.isBefore(moment(lineChartData[nday][0]))) {
                        box.hide();
                    }
                    else {
                        box.show();
                    }

                    // -- Scroll del grafico associato

                    var graphBox = $('#in-out-region .graph .graph-box');

                    // testo del giorno
                    graphBox.find('.graph-date').text(function(a) {
                        var d = lineChartData[nday][0];
                        return moment(d).format("D MMMM").toUpperCase();
                    });
                    // testo del valore se il grafico e' incomes o outcomes
                    var valore;
                    if(nday != 0) {
                        valore = barChartData[nday][1];
                    }
                    else {
                        valore = 0;
                    }

                    if(valore != 0) {
                        graphBox.show();

                        valore =valore.toFixed(2); 
                    
                        graphBox.find('.graph-value').text(function() {
                            return (valore + " €").replace('.',',');
                        });
                    }
                    else {
                        // si nasconde l'elemento
                        graphBox.hide();
                    }

                    if(tx != $('#barchart').scrollLeft())
                        $('#barchart').scrollLeft(tx);
                    else 
                        $('#chart').scrollLeft(tx);

                };
                touchend = function() {
                    var tx = container.scrollLeft(),
                    nday = parseInt(tx / tickDistance),
                    finalX = tx;

                    if(nday * tickDistance + (tickDistance / 2) > tx) {
                        // scroll al livello basso
                        finalX = nday * tickDistance;
                        // si aumenta di 1 la dimensione per non rientrare nel giorno prima per sbaglio
                        finalX += 1;
                    }
                    else {
                        // scroll alto
                        finalX = (nday + 1) * tickDistance;
                        finalX += 1; 
                        // si aumenta di 1 per non rientrare nel giorno prima per sbaglio
                    }

                    // ti fa partire la transizione
                    container.stop().animate({scrollLeft: finalX },200);
                    if(parseInt(finalX) == lastScroll) {
                        $('#barchart').scrollLeft(finalX);
                    }

                };
                //Hammer(svgContainer[0]).on('drag',scroll);
                container.on('scroll',scroll);
                Hammer(svgContainer[0]).on('release tap',touchend);
                //container.on('touchend',touchend);

                d3.select("#chart") //stile per tick grandi
                    .selectAll(".x.axis .tick line")
                    .filter(function (d, i) {
                        return (i % 6) === 0;
                    })
                    .attr("y2", -26);
                d3.select("#chart") //stile per tick piccoli
                    .selectAll(".x.axis .tick line")
                    .filter(function (d, i) {
                        return (i % 6) !== 0;
                    })
                    .attr("y2", -6);
                d3.selectAll(".x.axis .tick text")
                    .append('tspan')
                    .attr('y, 25')
                d3.select("#chart") // tick giornalieri
                    .selectAll(".x.axis .tick text")
                    .attr("y", 10)
                    .text(function (d, i) {
                        return dayWeekFormatter(i, d);
                    })
                    .selectAll(".x.axis .tick text tspan")
                    .text(function (d, i) {
                        return dayFormatter(i, d);
                    });

                // move to current data
                if(curDate.format('MM/YYYY') == moment(lineChartData[0][0]).format('MM/YYYY')) {
                    container.scrollLeft(tickDistance * parseInt(curDate.format('D') - 1));

                    // si appende il cerchio sul giorno attuale
                    svgContainer.select('.circles')
                        .append("circle")
                        .attr("fill", function (d, i) { return "#ffffff"; })
                        .attr('stroke', '#282941')
                        .attr('stroke-width', '2')
                        .attr("cx", function (d, i) {  return xScale(new Date(lineChartData[curDate.format('D') - 1][0])); })
                        .attr("cy", function (d, i) { return yScale(lineChartData[curDate.format('D') - 1][1]); })
                        .attr("r", function (d, i) { return 3 });
                }
            },
            onShow: function () {
                this.showGraph();
            },
            events: {
                'click div.js-show-pie': 'showPie',
            },
            showPie: function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (!$(e.currentTarget).hasClass('active')) {
                    var pieTarget = $(e.currentTarget).data('target');
                    this.trigger('show:pie', pieTarget);
                    $('div.js-show-pie').toggleClass('active');
                }
            }
        });

        View.PieViewItem = Marionette.ItemView.extend({
            template: JST['assets/js/apps/user/stats/templates/list_item.html'],
            tagName: "li",
            attributes: function () {
                // Return model data
                return {
                    class: this.model.get('categoryName').replace(/([^a-zA-Z0-9])/g, '_')
                };
            }
        });

        View.PieView = Marionette.CompositeView.extend({
            template: JST['assets/js/apps/user/stats/templates/pie.html'],
            itemView: View.PieViewItem,
            itemViewContainer: "ul",
            //className: 'modal-dialog stats-dialog',
            events: {
                'click a.js-close': 'closeClicked',
                'click .pie-details li': 'listElClicked'
            },
            buildItemView: function (item, ItemView) {
                item.set('clz', this.collection.indexOf(item));//per colore barretta nella lista
                var view = new ItemView({
                    model: item
                });
                return view;
            },
            closeClicked: function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.close();
            },
            listElClicked: function (e) {
                var clickedLi = $(e.currentTarget)[0];
                var jqClickedLi = $('li.' + clickedLi.className.replace(' ', '.'));
                var selectedClassName = 'selected';
                //console.log('listElClicked');
                if (jqClickedLi.hasClass('selected')) {
                    jqClickedLi.removeClass('selected');
                    this.$el.find('path#' + clickedLi.classList[0]).attr('class', '');
                } else {
                    //tolgo tutti i selected da tutti i path
                    this.$el.find('path.' + selectedClassName).attr('class', '');
                    //tolgo tutti i selected da tutti i li
                    this.$el.find('.pie-details li').removeClass(selectedClassName);
                    //aggiunto classe selected al path corrispondente
                    this.$el.find('#' + clickedLi.classList[0]).attr('class', selectedClassName);
                    //aggiunto classe selected a li corrente
                    this.$el.find('li.' + clickedLi.classList[0]).addClass(selectedClassName);
                }

            },
            initialize: function () {
                this.reds = ['#4A363E', '#8A5145', '#B7424B', '#E9474E', '#EE746D', '#F39B90', '#FAD0C7'];
                this.greens = ['#23444C', '#3E726A', '#57977D', '#76BF90', '#98CDA7', '#B5DABE', '#DCEDE0'];
            },
            onRender: function () {
                //console.log('pio');
            },
            renderPie: function () {
                var container = this.$el.find("#pie");
                container.empty();
                var selectedClassName = 'selected';
                var self = this;
                var pieClick = function itemClicked() {
                    //alert('pie clicked');
                    var curLi = self.$el.find('.' + ('' + this.id).replace(/#/, ''));
                    if (curLi.hasClass('selected')) {
                        self.$el.find('path#' + this.id).attr('class', '');
                        self.$el.find('.' + ('' + this.id).replace(/#/, '')).removeClass(selectedClassName);
                    } else {
                        //var curEl = d3.select(this);
                        //tolgo tutti i selected da tutti i path
                        self.$el.find('path.' + selectedClassName).attr('class', '');
                        //tolgo tutti i selected da tutti i li
                        self.$el.find('.pie-details li').removeClass(selectedClassName);
                        //aggiunto classe selected a path corrente
                        self.$el.find('#' + this.id).attr('class', selectedClassName);
                        //aggiunto classe selected a li corrispondente
                        self.$el.find('.' + this.id.replace(/#/, '')).addClass(selectedClassName);
                    }
                };
                var classNameCleaner = function (str) {
                    return str.replace(/([^a-zA-Z0-9])/g, '_');
                };
                var totalAmount = this.model.get('totalAmount');
                //var totalAmount = this.model.get('totalAmount');
                var counter = 0; //TODO: resettare ad ogni avvio

                //var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                //var height = 500;

                //versione "responsive"
                var sideMargin = 40; //riduzione dimensioni cerchio
                var width = parseInt(d3.select('#pie').style('width'), 10) - sideMargin;
                var height = parseInt(d3.select('#pie').style('height'), 10) - sideMargin;

                var radius = Math.min(width, height) / 2;
                if (this.model.get('type') === 'incomesResume') {
                    var colorScale = d3.scale.ordinal().range(this.greens);
                }
                else {
                    var colorScale = d3.scale.ordinal().range(this.reds);
                }
                var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(radius - 40);
                var pie = d3.layout.pie().sort(null).value(function (d) {
                    return d.amount;
                });
                var donutContainer = d3.select("#pie").append("svg");
                //.attr("width", width/2)
                //.attr("height", height/1.3);
                var items = this.collection.toJSON();
                var lenght = items.length;
                if (length > 5) {
                    lenght = 5;
                }
                items = items.slice(0, lenght);
                var g = donutContainer.selectAll(".arc")
                    .data(pie(items))
                    .enter().append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .attr('id', function (d) { return classNameCleaner(d.data.categoryName); })
                    .style("fill", function (d) { return colorScale(counter++); })
                    .on("click", pieClick);

                g.append("text")
                    .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .style("text-anchor", "middle")
                    .text(function (d) { return d.amount; });

            },
            onShow: function () {
                this.renderPie();
            }
        });

    }, Handlebars);
    return Appersonam.UserApp.Stats.View;
});