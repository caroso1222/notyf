//var Notyf = require('../../dist/notyf.min.js');


var notyf = new Notyf({delay: 5000});

document.getElementById('confirm-btn')
        .addEventListener('click', function(){
            notyf.confirm('Your request has been sent');
        });

document.getElementById('alert-btn')
        .addEventListener('click', function(){
            notyf.alert('You have been disconnected');
        });