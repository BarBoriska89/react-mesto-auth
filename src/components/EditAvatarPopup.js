import React from "react";
import PopupWithForm from "./PopupWithForm ";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

       const avatarRef = React.useRef();

    function handleChange() {
        
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }
    
    React.useEffect(() => {
        if (isOpen) {
            avatarRef.current.value ="";
        }
    }, [isOpen]);

    return (
        <PopupWithForm isOpen={isOpen}
            onClose={onClose}
            title={"Обновить аватар"}
            name={"edit-avatar"}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >

            <div className="popup__form-section">
                <input type="url" ref={avatarRef} placeholder="Ссылка на картинку" className="popup__input popup__input_type_place-img"
                    name="avatar-img" id="url-for-avatar-img" required onChange={handleChange} />
                <span className="popup__error" id="url-for-avatar-img-error"></span>
            </div>

        </PopupWithForm>

    );
}

export default EditAvatarPopup;