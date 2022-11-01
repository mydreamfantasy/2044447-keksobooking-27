const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPlace = document.querySelector('.ad-form__upload input[type=file]');
// const previewPlace = document.querySelector('.ad-form-header__preview img');


const makePreview = (fileInput, place) => {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      place.src = URL.createObjectURL(file);
    }
  });

};

makePreview (fileChooserAvatar, previewAvatar);
makePreview (fileChooserPlace);


