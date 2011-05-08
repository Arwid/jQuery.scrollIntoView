/*!
 * $.fn.scrollIntoView - similar to the default browser scrollIntoView
 * The default browser behavior always places the element at the top or bottom of its container. 
 * This override is smart enough to not scroll if the element is already visible.
 *
 * Copyright 2011 Arwid Bancewicz
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * @date 8 May 2011
 * @author Arwid Bancewicz http://arwid.ca
 * @version 0.1
 */
 (function($) {
    $.fn.scrollIntoView = function(duration, easing, complete) {
        // The arguments are optional.
        // The first argment can be false for no animation or a duration.
        // The first argment could also be a map of options.
        // Refer to http://api.jquery.com/animate/.
        var opts = $.extend({},
        $.fn.scrollIntoView.defaults);

        // Get options
        if ($.type(duration) == "object") {
            $.extend(opts, duration);
        } else if ($.type(duration) == "number") {
            $.extend(opts, {
                duration: duration,
                easing: easing,
                complete: complete
            });
        } else if (duration == false) {
            opts.smooth = false;
        }

        // should only be used for one element
        if (this.size() != 1) {
            return this;
        }

        this.each(function() {
            var pEl = this.parentNode;
            var pY = pEl.scrollTop;
            var pH = pEl.clientHeight;
            var elY = this.offsetTop;
            var elH = this.offsetHeight;
            if ((elY + elH) > (pY + pH)) {
                // scroll down
                if (opts.smooth) animateScroll($(pEl), elY + elH - pH);
                else pEl.scrollTop = elY + elH - pH;
            } else if (elY < pY) {
                // scroll up
                if (opts.smooth) animateScroll($(pEl), elY);
                else pEl.scrollTop = elY;
            }
        });

        function animateScroll(el, scrollTo) {
            el.stop().animate({
                scrollTop: scrollTo
            },
            opts);
        }
        return this;
    };

    $.fn.scrollIntoView.defaults = {
        smooth: true,
        duration: null,
        easing: $.easing && $.easing.easeOutExpo ? 'easeOutExpo': null,
        // Note: easeOutExpo requires jquery.effects.core.js
        // 			 otherwise jQuery will default to use 'swing'
        complete: $.noop(),
        step: null,
        specialEasing: null
    };

})(jQuery);