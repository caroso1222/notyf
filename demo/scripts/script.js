var notyf = new Notyf({delay: 2000});

document.getElementById('confirm-btn')
        .addEventListener('click', function(){
            notyf.confirm('Your changes have succesfully been saved');
        });

document.getElementById('alert-btn')
        .addEventListener('click', function(){
            notyf.alert('You have been disconnected!');
        });