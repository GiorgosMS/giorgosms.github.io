"use strict";

/* jQuery Extensions for Publications Page
 * Modernized 2024
 */

// Equal height plugin
(function($) {
    $.fn.equalHeight = function() {
        let tallest = 200;
        
        this.each(function() {
            const thisHeight = $(this).height();
            if (thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        
        this.each(function() {
            $(this).height(tallest);
        });
        
        return this;
    };
})(jQuery);

// Case-insensitive :icontains selector
jQuery.expr[":"].icontains = function(elem, i, match) {
    return jQuery(elem).text().toUpperCase().indexOf(match[3].toUpperCase()) >= 0;
};
