/**
 *
 * Utitilies: loaders.js
 *
 */

var Utilities = {
    getInitials: function(string, wordLimit) {
        var words = string.split(' ', wordLimit);
        var initials = [];
        words.map(function(word) {
            initials.push(word.split('', 1)[0]);
        });
        return initials.join('');
    },
    loadScripts: function(scriptsArray, optionalData, optionalCallback, optionalType, storeLocal) {
        // TODO: Add array test
        scriptsArray.map(function(script) {
            function success(data) {
                console.log('Loaded: ', script);
                if(optionalCallback) {
                    optionalCallback(data);
                }
                if(storeLocal && storeLocal !== '') {
                    Utilities.storeLocal(storeLocal, data);
                }
            }
            $.ajaxSetup({ cache: false });
            $.ajax({
                dataType: optionalType || 'script',
                url: script,
                data: optionalData || null,
                success: success
            });
        });
    },
    loadView: function(method, scripturl, event, optionalData) {
        Utilities.loadScripts([scripturl], null, function(data) {
            if(typeof(window[method].init) === 'function') {
                window[method].init(optionalData);
            }
        });
    },
    routeTo: function(optionalPage, optionalEvent, localStorageObj, localStorageProperty) {
        var hash = window.location.hash;
        var hashval = hash ? hash.split('/')[0].slice(1) : false;
        var name = '';
        var localData = function(key, prop, useHashPropVal) {
            if(localStorage && localStorage[key]) {
                var lk = JSON.parse(localStorage[key]);
                for(var i=0, len=lk.length; i<len; i++) {
                    name = useHashPropVal ? lk[i].name.replace(/\s/g, '').toLowerCase() : lk[i].name;
                    if(name === prop) {
                        console.log('success!!!', lk[i]);
                        return lk[i].plates;
                    }
                    console.log('continue', lk[i]);
                }
                return localStorage[key];
            } else {
                return null;
            }
        };
        if(hashval && hashval !== 'restaurants') {
            Utilities.loadView(Utilities.toCamelCase('plates'), 'scripts/controllers/' + 'plates' + '.js', optionalEvent, localData('Restaurants', 'bluecsushi', true));
            return false;
        }
        if(optionalEvent) {
            optionalEvent.preventDefault();
        }
        if(!(optionalPage && optionalPage !== '')) {
            // Default to restaurants view
            page = (window.location.hash ? window.location.hash.slice(1) : 'restaurants').toLowerCase();
            window.location.hash = page;
        } else {
            page = optionalPage.toLowerCase();
            window.location.hash = page + '/' + optionalEvent.currentTarget.hash.substr(1);
        }
        Utilities.loadView(Utilities.toCamelCase(page), 'scripts/controllers/' + page + '.js', optionalEvent, localData(localStorageObj, localStorageProperty));
    },
    storeLocal: function(name, obj) {
        console.log('storing ' + name, obj);
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            // console.log('localStorage enabled');
            localStorage.setItem(name, JSON.stringify(obj));
            // localStorage.clear();
            // Store
            // localStorage.setItem("lastname", "Smith");
            // // Retrieve
            // document.getElementById("result").innerHTML = localStorage.getItem("lastname");
        } else {
            alert('Sorry! No Web Storage support..');
        }
    },
    toCamelCase: function(string) {
        // inspired from http://www.angulartutorial.net/2015/04/covert-string-to-camel-case-using.html
        var split = string.split(' ');

        //iterate through each of the "words" and capitalize them
        for (var i = 0, len = split.length; i < len; i++) {
         split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
        }

        return split.join(' ');
    }
};