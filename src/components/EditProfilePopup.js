import React from "react";
import PopupWithForm from "./PopupWithForm ";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("Имя");
    const [description, setDescription] = React.useState("Род деятельности");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: name,
            about: description,
        });
    }

    React.useEffect(() => {
        if (isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [isOpen, currentUser]);


    return (
        <PopupWithForm isOpen={isOpen}
            onClose={onClose}
            title={"Редактировать профиль"}
            name={"edit-profile"}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >

            <div className="popup__form-section">
                <input type="text" value={name} className="popup__input popup__input_type_name" name="user-name"
                    id="user-name" minLength="2" maxLength="40" required onChange={handleNameChange} />
                <span className="popup__error" id="user-name-error"></span>
            </div>
            <div className="popup__form-section">
                <input type="text" value={description} className="popup__input popup__input_type_profession"
                    name="user-job" id="user-job" minLength="2" maxLength="200" required onChange={handleDescriptionChange} />
                <span className="popup__error" id="user-job-error"></span>
            </div>

        </PopupWithForm>


    );
}
export default EditProfilePopup;