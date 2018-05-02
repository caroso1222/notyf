//var Notyf = require('../../dist/notyf.min.js');


var notyf = new Notyf({delay: 5000});

document.getElementById('confirm-btn')
        .addEventListener('click', function(){
            notyf.confirm('confirming');
        });

document.getElementById('alert-btn')
        .addEventListener('click', function(){
            notyf.alert('alerting');
        });