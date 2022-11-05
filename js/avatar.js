const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPlace = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

const makeNewNode = (file) => {
  const previewImg = document.createElement('img');
  previewImg.src = URL.createObjectURL(file);
  previewImg.alt = 'Фото жилья';
  previewImg.style.width = '100%';
  previewImg.style.height = '100%';
  previewImg.style.objectFit = 'cover';
  previewPhoto.append(previewImg);
};

const addPrewiewAvatar = () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
};

const removePreviewImg = () => {
  if (previewPhoto.children.length > 0) {
    previewPhoto.children[0].remove();
  }
};

const addPrewiewPhoto = () => {
  removePreviewImg();

  const file = fileChooserPlace.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    makeNewNode(file);
  }
};

const showPrewiew = () => {
  fileChooserAvatar.addEventListener('change', addPrewiewAvatar);
  fileChooserPlace.addEventListener('change', addPrewiewPhoto);
};

export { showPrewiew, previewPhoto, previewAvatar };
