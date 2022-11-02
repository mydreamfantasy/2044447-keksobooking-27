const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPlace = document.querySelector('.ad-form__upload input[type=file]');
const photoPlaceContainer = document.querySelector('.ad-form__photo');

const makeNewNode = (container, phrase) => {
  const previewPhoto = container.appendChild(previewAvatar.cloneNode(true));
  previewPhoto.setAttribute('alt', phrase);
  return previewPhoto;
};

const makePreviewAvatar = (fileInput, photo) => {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      photo.src = URL.createObjectURL(file);
    }
  });
};

const makePreviewPlace = (fileInput, photoContainer, altPhrase) => {

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    const photo = makeNewNode(photoContainer, altPhrase);

    if (matches) {
      photo.src = URL.createObjectURL(file);
    }
  });

};
makePreviewAvatar (fileChooserAvatar, previewAvatar);
makePreviewPlace (fileChooserPlace, photoPlaceContainer, 'Фото жилья');


