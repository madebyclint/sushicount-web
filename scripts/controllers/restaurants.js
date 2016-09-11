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
        $('.restaurants').on('click', 'a', function(e) {
            Utilities.routeTo('plates', e, this.data_plates);
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
    public.init = function() {
        /* Load restaurants.json */
        U.loadScripts(['scripts/data/restaurants.json'], null, private.addToDom, 'json', 'Restaurants');
    };
    return public;
})(Utilities);