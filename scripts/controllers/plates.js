/**
 *
 * plates.js
 *
 */

var Plates = (function(U) {
    var private = {},
        public = {};
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
            var editLink = document.createElement('a');
            var editSvg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 20" version="1.1" x="0px" y="0px" aria-labelledby="title desc"><title>Edit</title><desc>Edit pencil icon.</desc><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill="#000000"><path d="M6,3.21203613 L9.55212402,3.23175049 L9.55212402,1.7399828 L8.93365479,1 L6.71679688,1 L6,1.73998278 L6,3.21203613 Z M6,4 L9.55000019,4 L9.55000019,13 L7.7750001,15.2194824 L6,13 L6,4 Z" transform="translate(7.776062, 8.109741) rotate(-327.000000) translate(-7.776062, -8.109741) "/></g></g><text x="0" y="31" fill="#000000" font-size="5px" font-weight="bold" font-family="\'Helvetica Neue\', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Futishia</text><text x="0" y="36" fill="#000000" font-size="5px" font-weight="bold" font-family="\'Helvetica Neue\', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>edit';
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
            editLink.classList.add('button-edit');
            editLink.href = '#';
            editLink.innerHTML = editSvg;
            newItemDesc.classList.add('description');
            newItemWrapper.appendChild(countWrapper);
            newItemWrapper.appendChild(newItemDesc);
            newItemWrapper.appendChild(editLink);
            container.appendChild(newItemWrapper);

            $(countAdd).off('click.add').on('click.add', function(e) {
                private.changeCounter.add(this, e, item);
            });
            $(countSubtract).off('click.subtract').on('click.subtract', function(e) {
                private.changeCounter.subtract(this, e, item);
            });
            $(editLink).off('click.edit').on('click.edit', function(e) {
                if(private.loaded.indexOf('PlateEdit') >= 0) {
                    PlateEdit.return();
                } else {
                    U.loadScripts('scripts/', ['controllers/plate-edit.js'], null, function() {
                        PlateEdit.return(item);
                        private.loaded.push('PlateEdit');
                    });
                }
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
    public.init = function(data) {
        console.log('plates data', data);
        private.addToDom(data);
    };
    return public;
})(Utilities);