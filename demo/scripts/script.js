var notyf = new Notyf({delay: delay || 2000});

document.getElementById('confirm-btn')
        .addEventListener('click', function(){
          show('confirm');
        });

document.getElementById('alert-btn')
        .addEventListener('click', function(){
          show('alert');
        });

function show(type) {
  const delay = +document.getElementById('delay').value;
  const alertIcon = document.getElementById('alert-icon').value;
  const confirmIcon = document.getElementById('confirm-icon').value;
  notyf.options.delay = delay || 2000;
  if (alertIcon) {
    notyf.options.alertIcon = alertIcon;
  }
  if (confirmIcon) {
    notyf.options.confirmIcon = confirmIcon;
  }
  const message = document.getElementById('message').value;
  if (type === 'confirm') {
    notyf.confirm(message || 'Your changes have succesfully been saved');
  } else {
    notyf.alert(message || 'You have been disconnected!');
  }
}
