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