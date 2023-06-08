
 const keyForClose = 'Escape';
 const formEditProfile = document.forms.editForm;
 const formAddPlace = document.forms.addPlaceForm;
 const formEditAvatar = document.forms.editAvatarForm;
 const formsForValidate = Array.from(document.querySelectorAll('.popup__form'));
 const validators = {};
 const optionsApi = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: '9615b71d-c66b-4314-b250-e7089bed6442',
        'Content-Type': 'application/json'
    },
  };  
  export default optionsApi;