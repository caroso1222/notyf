var notyf;
var notyfNotifications = [];

document.getElementById('success-btn').addEventListener('click', function () {
  show('success');
});

document.getElementById('error-btn').addEventListener('click', function () {
  show('error');
});

document.getElementById('dismiss-all-btn').addEventListener('click', function () {
  dismissAll();
});

document.getElementById('custom-btn').addEventListener('click', function () {
  const customId = document.getElementById('custom-id').value;
  show(customId);
});

document.getElementById('init-btn').addEventListener('click', function () {
  init();
});

document.getElementById('dismiss-btn').addEventListener('click', function () {
  const idx = document.getElementById('dismiss-idx').value;
  dismiss(idx);
});

// events

document.getElementById('click-listener-btn').addEventListener('click', function () {
  const notif = notyf.success('Click me');
  notif.on('click', () => print('clicked'));
});

document.getElementById('dismiss-listener-btn').addEventListener('click', function () {
  const notif = notyf.success({ message: 'Dismiss me', dismissible: true });
  notif.on('dismiss', () => print('dismissed'));
});

function init() {
  if (notyf) {
    try {
      document.querySelector('.notyf-announcer').remove();
      document.querySelector('.notyf').remove();
    } catch (e) {}
  }
  const code = JSON.parse(document.getElementById('code').value || '{}');
  notyf = new Notyf(code);
}

function dismiss(idx) {
  notyf.dismiss(notyfNotifications[idx]);
  notyfNotifications.splice(idx, 1);
}

function dismissAll() {
  notyf.dismissAll();
  notyfNotifications.length = 0;
}

function print(msg) {
  document.getElementById('print-output').textContent = msg;
}

function show(type) {
  const message = document.getElementById('message').value;
  const options = JSON.parse(document.getElementById('code').value || '{}');
  let input = message || options;
  let notification;
  // if message is non null then call notyf with the message
  // otherwise open the notyf with the config object
  if (type === 'success') {
    notification = notyf.success(input);
  } else if (type === 'error') {
    notification = notyf.error(input);
  } else {
    const opts = Object.assign({}, { type }, { message: input });
    notification = notyf.open(opts);
  }
  notyfNotifications.push(notification);
}
