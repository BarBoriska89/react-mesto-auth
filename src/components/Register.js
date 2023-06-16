import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip ";



function Register(props) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.handleRegister(formValue.email, formValue.password);
    }

    return (
        <div className="auth">
            <InfoTooltip isSuccessfulRegistration={props.isSuccessfulRegistration} />
            <div className="auth__container">

                <form className="auth__form" id="loginForm" name="loginForm" noValidate onSubmit={handleSubmit}>
                    <h2 className="auth__title">Регистрация</h2>
                    <div className="auth__form-section">
                        <input type="email" value={formValue.email} className="auth__input auth__input_type_email" placeholder="Email" name="email"
                            id="email" minLength="2" maxLength="40" required onChange={handleChange} />
                        <span className="auth__error" id="user-email-error"></span>
                    </div>
                    <div className="auth__form-section">
                        <input type="password" value={formValue.password} className="auth__input auth__input_type_password" placeholder="Пароль"
                            name="password" id="password" minLength="2" maxLength="200" required onChange={handleChange} />
                        <span className="auth__error" id="user-password-error"></span>
                    </div>
                    <button className="auth__button" type="submit" aria-label="Войти">Зарегистрироваться</button>
                </form>
                <div className="auth__signin">
                    <p className="auth__signin_title">Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="auth__link">Войти</Link>
                </div>
            </div>
        </div>


    )
}
export default Register;