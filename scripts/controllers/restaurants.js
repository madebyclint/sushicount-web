/**
 *
 * restaurants.js
 *
 */

var Restaurants = (function(U) {
    var private = {},
        public = {};
    private.loaded = [];
    private.addToDom = function(data) {
        // TODO: Add array test
        document.getElementById('page').appendChild(private.htmlBuilder(data));
        $('.restaurants').on('click', 'a', function() {
            var thisPlates = this.data_plates;
            if(private.loaded.indexOf('Plates') >= 0) {
                Plates.return(thisPlates);
            } else {
                U.loadScripts('scripts/', ['controllers/plates.js'], null, function() {
                    Plates.return(thisPlates);
                    private.loaded.push('Plates');
                });
            }
        });
    };
    private.htmlBuilder = function(items) {
        var container = document.createElement('div');
        container.classList.add('restaurants', 'view', 'count-' + items.length);
        items.map(function(item, index) {
            var newItemWrapper = document.createElement('a');
            var newItemHeader = document.createElement('h2');
            var newItemDesc = document.createElement('p');
            newItemWrapper.href = '#' + index;
            newItemWrapper.classList.add('theme-red');
            newItemWrapper.data_plates = item.plates;
            newItemHeader.innerHTML = U.getInitials(item.name, 2);
            newItemHeader.classList.add('title');
            newItemDesc.innerHTML = item.name;
            newItemDesc.classList.add('description');
            newItemWrapper.appendChild(newItemHeader);
            newItemWrapper.appendChild(newItemDesc);
            container.appendChild(newItemWrapper);
        });
        return container;
    };
    private.init = (function() {
        /* Load restaurants.json */
        U.loadScripts('scripts/', ['data/restaurants.json'], null, private.addToDom, 'json');
    })();
    return public;
})(Utilities);