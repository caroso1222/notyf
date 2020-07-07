if (false) {
  // activate only when testing the demo
  var notyfDemo = new Notyf();

  document.getElementById('success-btn-demo').addEventListener('click', function () {
    show('success');
  });

  document.getElementById('error-btn-demo').addEventListener('click', function () {
    show('error');
  });

  function show(type) {
    const message = document.getElementById('message').value;
    if (type === 'success') {
      notyfDemo.success(message || 'Your changes have succesfully been saved');
    } else if (type === 'error') {
      notyfDemo.error(message || 'You have been disconnected!');
    } else {
      notyfDemo.open({ type, message: message || 'This is a custom notification' });
    }
  }
}
