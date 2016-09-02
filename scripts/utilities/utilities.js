/**
 *
 * Utitilies: loaders.js
 *
 */

var Utilities = {
    loadScripts: function(dir, scriptsArray, optionalData, optionalCallback, optionalType) {
        // TODO: Add array test
        scriptsArray.map(function(script) {
            function success(data) {
                console.log('Loaded: ', dir + script);
                if(optionalCallback) {
                    optionalCallback(data);
                }
            }
            $.ajaxSetup({ cache: false });
            $.ajax({
                dataType: optionalType || 'script',
                url: dir + script,
                data: optionalData || null,
                success: success
            });
        });
    },
    getInitials: function(string, wordLimit) {
        var words = string.split(' ', wordLimit);
        var initials = [];
        words.map(function(word) {
            initials.push(word.split('', 1)[0]);
        });
        return initials.join('');
    }
};