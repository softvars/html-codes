define(["app",
    "templates"
], function (Appersonam, JST, syphon, moment) {
    Appersonam.module("Login.Walkthrough.View", function (View, Appersonam, Backbone, Marionette, $, _, Handlebars) {
        View.Dynamic = Marionette.ItemView.extend({
            template: JST['assets/js/apps/login/walkthrough/templates/dynamic.html'],
            className: 'dynamic-walkthrough',
            id: 'walkthrough-container',
            events: {
                'click .js-close': 'closeClicked'
            },
            closeClicked: function () {
                this.close();
                Appersonam.request("global:initialize:object", 'hide', 'walkthrough');
            },
            onShow: function () {
                this.slider();
            },

            //BY DNSEE, io non c'entro
            slider: function (target) {
                var target = $('#walkthrough').get(0),
                    wrapper = $(target).find('.wrapper'),
                    slides = wrapper.children(),
                    slide_length = slides.length,
                    slide_index_active = 0;
                // Slider engine
                function changeSlide() {
                    var translation = -$(window).width() * slide_index_active;
                    wrapper.css({ transform: 'translate3d(' + translation + 'px, 0px, 0px)' });
                    $('.pagination .bullet').removeClass('active').eq(slide_index_active).addClass('active');
                    if(slide_index_active > 2){
                        $('.pagination').addClass('hidden');
                    }else{
                        $('.pagination').removeClass('hidden');
                    }
                }
                // Hammer Gestures
                var h = Hammer(target).on("dragstart", function (event) {
                    var direction = event.gesture.direction;
                    if (direction === 'left' && slide_index_active + 1 < slide_length) {
                        slide_index_active++;
                    } else if (direction === 'right' && slide_index_active - 1 >= 0) {
                        slide_index_active--;
                    }
                    changeSlide();
                });
                // Resize watcher
                $(window).on('resize', changeSlide);
                // Transitions callbacks
                wrapper.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                    slides.removeClass('active').eq(slide_index_active).addClass('active');
                    //Reset on first slide
                    if (slide_index_active === 0) {
                        slides.find('.message.opaque').removeClass('on');
                    } else {
                        slides.find('.message.opaque').addClass('on');
                    }
                });
            }
        });
        View.Static = Marionette.ItemView.extend({
            template: JST['assets/js/apps/login/walkthrough/templates/static.html'],
            className: 'static-walkthrough',
            id: 'walkthrough-container',
            events: {
                'click .wt-navigate': 'navigate',
                'click .js-close': 'closeClicked'
            },
            initialize: function () {
                this.currentPage = 1;
            },
            closeClicked: function () {
                this.close();
                Appersonam.request("global:initialize:object", 'hide', 'walkthrough');
            },
            onShow: function () {
                this.$el.find('.wt-page').hide();
                this.$el.find('#wt-page_1').show();
                this.$el.find('.prev').hide();
            },
            //BY DNSEE, io non c'entro
            navigate: function (e) {
                e.preventDefault();
                var currentTarget = $(e.currentTarget);
                if ((currentTarget.hasClass('prev') && this.currentPage > 1) || (currentTarget.hasClass('next') && this.currentPage < 4)) {
                    this.$el.find('.wt-page').hide();
                    this.$el.find('.bullet').removeClass('active');
                    this.$el.find('.wt-navigate').show();
                    if (currentTarget.hasClass('prev')) {
                        this.currentPage--;
                    }
                    else {
                        this.currentPage++;
                    }
                    if (this.currentPage < 2) {
                        this.$el.find('.prev').hide();
                    }
                    else if (this.currentPage > 3) {
                        this.$el.find('.pagination').hide(); 
                    }
                    //else {
                    //    this.$el.find('.prev').removeClass('off');
                    //}
                    this.$el.find('#wt-page_' + this.currentPage).show();
                    this.$el.find('.wt-step_' + this.currentPage).addClass('active');
                }
            }
        });
    });
    return Appersonam.Login.Walkthrough.View;
});