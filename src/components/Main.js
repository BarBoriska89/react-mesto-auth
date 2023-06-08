import React from "react";
import penPath from '../images/Edit-Button.svg';
import plusPath from '../images/plus.svg';
import closeIconPath from '../images/Close-Icon.png';
import api from '../utils/Api';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
   // console.log(props);


    return (
        <main>
            <section className="profile" aria-label="Профиль пользователя">
                <div className="profile__section-avatar">
                    <img src={currentUser.avatar} className="profile__avatar"
                        alt="Фото пользователя" />
                    <div className="profile__overlay" onClick={props.onEditAvatar}>
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__info-wrapper">
                        <h1 className="profile__info-name">{currentUser.name}</h1>
                        <button className="profile__info-edit-button button" type="button"
                            aria-label="Редактировать профиль" onClick={props.onEditProfile}>
                            <img src={penPath} className="profile__info-button-img"
                                alt="Изображение карандаша" />
                        </button>
                    </div>
                    <h2 className="profile__info-profession">{currentUser.about}</h2>
                </div>
                <button className="profile__add-button button" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}>
                    <img src={plusPath} className="profile__add-button-img" alt="Плюс" />
                </button>
            </section>

            <section className="elements" aria-label="Живописные места России">
                <ul className="elements__list">
                    {
                        props.cards.map((card) =>
                            <Card
                                key={card._id}
                                {...card}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                            />
                        )
                    }
                </ul>
            </section>
        </main>
    );

}

export default Main;