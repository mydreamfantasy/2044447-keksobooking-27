const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const AVATAR_DEFAULT = 'img/muffin-grey.svg';

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPlace = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

const renderPhoto = (file) => {
  const previewImg = document.createElement('img');
  previewImg.src = URL.createObjectURL(file);
  previewImg.alt = 'Фото жилья';
  previewImg.style.width = '100%';
  previewImg.style.height = '100%';
  previewImg.style.objectFit = 'cover';
  previewPhoto.append(previewImg);
};

const setAvatar = (file) => {
  previewAvatar.src = URL.createObjectURL(file);
};

const setRoomPhoto = (file) => {
  previewPhoto.innerHTML = '';
  renderPhoto(file);
};

const addPreview = (cb, fileChooser) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    cb(file);
  }
};

const clearPhotos = () => {
  previewPhoto.innerHTML = '';
  previewAvatar.src = AVATAR_DEFAULT;
};

const showPreview = () => {
  fileChooserAvatar.addEventListener('change', ()=>addPreview(setAvatar, fileChooserAvatar));
  fileChooserPlace.addEventListener('change', ()=>addPreview(setRoomPhoto, fileChooserPlace));
};

export { showPreview, clearPhotos };
