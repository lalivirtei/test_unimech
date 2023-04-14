let iconicInputs = document.querySelectorAll('.input--iconic');
let urlExpr = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&/=]*)/gi;
let regex = new RegExp(urlExpr);

function resetInputIcons(el) {
  el.classList = 'input input--iconic';
}

iconicInputs.forEach(item => {
  item.addEventListener('input', (event) => {
    let el = event.target;

    if (el.value.includes('vk.com')) {
      resetInputIcons(el);
      el.classList.add('input--vk');

    } else if (el.value.includes('ok.ru')) {
      resetInputIcons(el);
      el.classList.add('input--ok');

    } else if (el.value.includes('facebook.com')) {
      resetInputIcons(el);
      el.classList.add('input--fb');

    } else if (el.value.includes('instagram.com')) {
      resetInputIcons(el);
      el.classList.add('input--ig');

    } else if (el.value.includes('www.youtube.com')) {
      resetInputIcons(el);
      el.classList.add('input--yt');

    } else if (el.value.match(regex)) {
      resetInputIcons(el);
      el.classList.add('input--web');

    } else {
      resetInputIcons(el);
    }
  })
});

