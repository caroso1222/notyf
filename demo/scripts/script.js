//var Notyf = require('../../dist/notyf.min.js');


var notyf = new Notyf();

document.getElementById('confirm-btn')
        .addEventListener('click', function(){
            notyf.confirm('confirming');
        });

document.getElementById('alert-btn')
        .addEventListener('click', function(){
            notyf.alert('confirming');
        });