/**
 *
 * plates.js
 *
 */

var Plates = (function(U) {
    var private = {},
        public = {};
    public.return = function(data) {
        private.addToDom(data);
    };
    private.loaded = [];
    private.addToDom = function(data) {
        // TODO: Add array test
        document.getElementById('page').innerHTML = '';
        document.getElementById('page').appendChild(private.htmlBuilder(data));
    };
    private.htmlBuilder = function(items) {
        var container = document.createElement('div');
        container.classList.add('plates', 'view', 'count-' + items.length);
        items.map(function(item, index) {
            console.log('Plates: ' + index, item);
            var newItemWrapper = document.createElement('div');
            var countWrapper = document.createElement('div');
            var countWrapperInner = document.createElement('div');
            var startingCount = 0;
            var count = document.createElement('h2');
            var subtotal = document.createElement('h2');
            var countControl = document.createElement('div');
            var countAdd = document.createElement('a');
            var countAddHitArea = document.createElement('span');
            var countSubtract = document.createElement('a');
            var countSubtractHitArea = document.createElement('span');
            var newItemDesc = document.createElement('p');
            newItemWrapper.href = '#' + index;
            newItemWrapper.classList.add('theme-red', 'plate');
            newItemWrapper.data_plates = item.plates;
            count.innerHTML = '<span>' + startingCount + '</span>';
            count.classList.add('title', 'count');
            subtotal.innerHTML = (item.price * startingCount).toFixed(2);
            subtotal.classList.add('title', 'subtotal');
            countWrapper.classList.add('count-wrapper');
            countWrapperInner.classList.add('inner');
            countWrapper.appendChild(count);
            countWrapperInner.appendChild(countControl);
            countWrapperInner.appendChild(subtotal);
            countWrapper.appendChild(countWrapperInner);
            countControl.classList.add('count-control');
            countAdd.classList.add('count-add');
            countAdd.href = "#";
            countAdd.innerHTML = '+';
            countSubtract.classList.add('count-subtract');
            countSubtract.href = "#";
            countSubtract.innerHTML = '—';
            countControl.appendChild(countAdd);
            countControl.appendChild(countSubtract);
            newItemDesc.innerHTML = item.name + ' @ $' + item.price;
            newItemDesc.classList.add('description');
            newItemWrapper.appendChild(countWrapper);
            newItemWrapper.appendChild(newItemDesc);
            container.appendChild(newItemWrapper);

            $(countAdd).off('click.add').on('click.add', function(e) {
                e.preventDefault();
                private.changeCounter.add(this, e, item);
            });
            $(countSubtract).off('click.subtract').on('click.subtract', function(e) {
                e.preventDefault();
                private.changeCounter.subtract(this, e, item);
            });
        });
        return container;
    };
    private.changeCounter = {
        add: function(element, event, item) {
            var thisPlate = $(element).closest('.plate');
            var thisCount = thisPlate.find('.count span');
            var thisSubtotal = thisPlate.find('.subtotal');
            var thisPrice = thisPlate.find('.price');
            var thisVal = parseInt(thisCount.html());
            var thisSubtotalVal = parseInt(thisSubtotal.html());
            var thisPriceVal = parseFloat(item.price);
            var plateImage = '•';
            thisVal++;
            for(var i = 1; i < thisVal; i++) {
                plateImage += '•';
            }
            thisPlate.find('.count').html(plateImage + '<span>' + thisVal + '</span>');
            thisSubtotal.html((thisVal * thisPriceVal).toFixed(2));
        },
        subtract: function(element, event, item) {
            var thisPlate = $(element).closest('.plate');
            var thisCount = thisPlate.find('.count span');
            var thisSubtotal = thisPlate.find('.subtotal');
            var thisPrice = thisPlate.find('.price');
            var thisVal = parseInt(thisCount.html());
            var thisSubtotalVal = parseInt(thisSubtotal.html());
            var thisPriceVal = parseFloat(item.price);
            var plateImage = '';
            if(thisVal > 0) {
                thisVal--;
            } else {
                thisVal = 0;
            }
            for(var i = thisVal; i > 0; i--) {
                plateImage += '•';
            }
            thisPlate.find('.count').html(plateImage + '<span>' + thisVal + '</span>');
            thisSubtotal.html((thisVal * thisPriceVal).toFixed(2));
        }
    };
    private.init = (function() {

    })();
    return public;
})(Utilities);