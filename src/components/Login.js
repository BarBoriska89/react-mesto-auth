import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        props.onLogin(formValue.email, formValue.password);
        setFormValue({ username: '', password: '' });
    }

    return (
        <div className="auth">
            <div className="auth__container">

                <form className="auth__form" id="loginForm" name="loginForm" noValidate onSubmit={handleSubmit}>
                    <h2 className="auth__title">Вход</h2>
                    <div className="auth__form-section">
                        <input type="email" value={formValue.email || ''} className="auth__input auth__input_type_email" placeholder="Email" name="email"
                            id="email" minLength="2" maxLength="40" required onChange={handleChange} />
                        <span className="auth__error" id="user-email-error"></span>
                    </div>
                    <div className="auth__form-section">
                        <input type="password" value={formValue.password || ''} className="auth__input auth__input_type_password" placeholder="Пароль"
                            name="password" id="password" minLength="2" maxLength="200" required onChange={handleChange} />
                        <span className="auth__error" id="user-password-error"></span>
                    </div>
                    <button className="auth__button" type="submit" aria-label="Войти">Войти</button>
                </form>
            </div>
        </div>

    )
}
export default Login;