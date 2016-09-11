/**
 *
 * app.js
 *
 */


"use strict";

(function($, window) {
    $(document).ready(function() {
        /* Load utilities.js */
        $.getScript('scripts/utilities/utilities.js', function(data) {
            console.log('Loaded: ', 'utilities/utilities.js');
            Utilities.routeTo();
        });

        /* Handlers */


    });
})(jQuery, window);