var notyf;

document.getElementById('success-btn')
        .addEventListener('click', function(){
          show('success');
        });

document.getElementById('error-btn')
        .addEventListener('click', function(){
          show('error');
        });

document.getElementById('custom-btn')
        .addEventListener('click', function(){
          const customId = document.getElementById('custom-id').value;
          show(customId);
        });

document.getElementById('init-btn')
        .addEventListener('click', function(){
          init();
        });

function init() {
  if (notyf) {
    document.querySelector('.notyf').remove();
    document.querySelector('.notyf-announcer').remove();
  }
  const code = JSON.parse(document.getElementById('code').value || '{}');
  notyf = new Notyf(code);
}

function show(type) {
  const message = document.getElementById('message').value;
  const options = JSON.parse(document.getElementById('code').value || '{}');
  let input = message || options;
  // if message is non null then call notyf with the message
  // otherwise open the notyf with the config object
  if (type === 'success') {
    notyf.success(input);
  } else if (type === 'error') {
    notyf.error(input);
  } else {
    const opts = Object.assign({}, {type}, {message: input});
    notyf.open(opts);
  }
}
