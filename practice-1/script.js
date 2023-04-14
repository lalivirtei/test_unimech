let fileInput = document.getElementById("file-input");
let filePreview = document.getElementById("file-preview");
let fileClose = document.getElementById('file-clear');

function PreviewImage() {
  let oFReader = new FileReader();
  oFReader.readAsDataURL(fileInput.files[0]);

  oFReader.onload = function (oFREvent) {
    filePreview.src = oFREvent.target.result;
  };
}

fileInput.addEventListener('change', PreviewImage);
fileClose.addEventListener('click', function (event) {
  event.preventDefault();
  fileInput.value = '';
  filePreview.src = 'images/file-placeholder.jpg'
});


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

let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let cancelBtn = document.getElementById('modal-cancel');
let modalOpener = document.getElementById('modal-opener');

document.addEventListener('mouseup', function(e) {
  if (!modal.contains(e.target)) {
    modal.classList.remove('modal--opened');
    overlay.classList.remove('overlay--shown');
  }
});

modalOpener.onclick = () => {
  modal.classList.add('modal--opened');
  overlay.classList.add('overlay--shown');
}

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('modal--opened');
    overlay.classList.remove('overlay--shown');
  }
})

cancelBtn.onclick = function (event) {
  event.preventDefault();
  modal.classList.remove('modal--opened');
  overlay.classList.remove('overlay--shown');
}

