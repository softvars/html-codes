$.fn.carousel.Constructor.prototype.slide = function(type, next) {
    if (!$.support.transition && this.$element.hasClass('slide')) {
        this.$element.find('.item').stop(true, true); //Finish animation and jump to end.
    }
    var $active = this.$element.find('.item.active')
    var $next = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback = type == 'next' ? 'first' : 'last'
    var that = this

    if (!$next.length) {
        if (!this.options.wrap) return
        $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
        relatedTarget: relatedTarget,
        direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
        $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        $active
            .one('bsTransitionEnd', function() {
                $next.removeClass([type, direction].join(' ')).addClass('active')
                $active.removeClass(['active', direction].join(' '))
                that.sliding = false
                setTimeout(function() {
                    that.$element.trigger(slidEvent)
                }, 0)
            })
            .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else if (!$.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(slidEvent)
        if (slideEvent.isDefaultPrevented()) return
        $active.animate({
            left: (direction == 'right' ? '100%' : '-100%')
        }, 600, function() {
            $active.removeClass('active')
            that.sliding = false
            setTimeout(function() {
                that.$element.trigger('slid')
            }, 0)
        })
        $next.addClass(type).css({
            left: (direction == 'right' ? '-100%' : '100%')
        }).animate({
            left: '0'
        }, 600, function() {
            $next.removeClass(type).addClass('active')
        })
    } else {
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
}