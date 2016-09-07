/**
 *
 * plate-edit.js
 *
 */

var PlateEdit = (function(U) {
    var private = {},
        public = {};
    public.return = function(data) {
        console.log('editing this plate', data);
        private.addToDom(data);
    };
    private.loaded = [];
    private.addToDom = function(data) {
        // TODO: Add array test
        document.getElementById('page').appendChild(private.htmlBuilder(data));
        console.log(data);
        // $('.restaurants').on('click', 'a', function() {
        //     var thisPlates = this.data_plates;
        //     if(private.loaded.indexOf('Plates') >= 0) {
        //         Plates.return(thisPlates);
        //     } else {
        //         U.loadScripts('scripts/', ['controllers/plates.js'], null, function() {
        //             Plates.return(thisPlates);
        //             private.loaded.push('Plates');
        //         });
        //     }
        // });
    };
    // http://www.w3schools.com/colors/colors_names.asp
    private.colors = [
        {
            'nickname': 'red',
            'colorname': 'red',
            'hex': '#FF0000'
        },
        {
            'nickname': 'orange',
            'colorname': 'orangered',
            'hex': '#FF4500'
        },
        {
            'nickname': 'gold',
            'colorname': 'gold',
            'hex': '#FFD700'
        },
        {
            'nickname': 'yellow',
            'colorname': 'yellow',
            'hex': '#FFFF00'
        },
        {
            'nickname': 'green',
            'colorname': 'green',
            'hex': '#008000'
        },
        {
            'nickname': 'blue',
            'colorname': 'dodgerblue',
            'hex': '#1E90FF'
        },
        {
            'nickname': 'dark blue',
            'colorname': 'midnightblue',
            'hex': '#191970'
        },
        {
            'nickname': 'purple',
            'colorname': 'darkviolet',
            'hex': '#9400D3'
        },
        {
            'nickname': 'gray',
            'colorname': 'darkgray',
            'hex': '#A9A9A9'
        },
        {
            'nickname': 'dark gray',
            'colorname': 'dimgray',
            'hex': '#696969'
        },
        {
            'nickname': 'black',
            'colorname': 'black',
            'hex': '#000000'
        }
    ];
    private.htmlBuilder = function(item) {
        var container = document.createElement('div');
        var plateform = document.createElement('form');
        var namefield = document.createElement('input');
        var pricefield = document.createElement('input');
        var colorfield = document.createElement('fieldset');
        namefield.type = 'text';
        namefield.value = item.name;
        pricefield.type = 'number';
        pricefield.step = '0.01';
        pricefield.value = item.price;
        colorfield.classList.add('color-options');
        private.colors.map(function(color) {
            var optionwrapper = document.createElement('div');
            var option = document.createElement('input');
            var optionlabel = document.createElement('label');
            var optionlabelinner = document.createElement('span');
            optionwrapper.classList.add('coloroption-wrapper');
            option.type = 'radio';
            option.value = color.hex;
            option.name = 'coloroption';
            option.id = color.colorname;
            optionlabel.htmlFor = color.colorname;
            // optionlabel.innerText = color.nickname;
            optionlabel.style.backgroundColor = color.hex;
            optionlabel.title = color.nickname;
            optionlabel.appendChild(optionlabelinner);
            optionwrapper.appendChild(option);
            optionwrapper.appendChild(optionlabel);
            colorfield.appendChild(optionwrapper);
            $(option).off('click.coloroption').on('click.coloroption', function(e) {
                console.log('e', e);
                console.log('this', this);
                console.log(document.querySelector('input[name="coloroption"]:checked').value);
            });
        });
        plateform.appendChild(namefield);
        plateform.appendChild(pricefield);
        plateform.appendChild(colorfield);
        container.classList.add('plate-edit', 'view', 'count-' + item.length);
        container.appendChild(plateform);
        // items.map(function(item, index) {
        //     var newItemWrapper = document.createElement('a');
        //     var newItemHeader = document.createElement('h2');
        //     var newItemDesc = document.createElement('p');
        //     newItemWrapper.href = '#' + index;
        //     newItemWrapper.classList.add('theme-red');
        //     newItemWrapper.data_plates = item.plates;
        //     newItemHeader.innerHTML = U.getInitials(item.name, 2);
        //     newItemHeader.classList.add('title');
        //     newItemDesc.innerHTML = item.name;
        //     newItemDesc.classList.add('description');
        //     newItemWrapper.appendChild(newItemHeader);
        //     newItemWrapper.appendChild(newItemDesc);
        //     container.appendChild(newItemWrapper);
        // });
        return container;
    };
    private.init = (function() {

    })();
    return public;
})(Utilities);