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