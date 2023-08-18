import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from '../utils/auth';

export default function Register({ onLogin }) {
 
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (evt) => {
       const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });    
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { email, password } = formValue;
        auth.register(email, password)
            .then((data) => {
                console.log(data)
                navigate('/sign-in', { replace: true });
            })
            .catch((err) => {
                console.error(`Произошла ошибка: ${err}`)
            })
    }

    return (
        <div className="sign">
            <h2 className="sign__title">Регистрация</h2>
            <form className="sign__form" name="register-form" noValidate onSubmit={handleSubmit}>
                <ul className="sign__input-list">
                    <li className="sign__input-item">
                        <input className="sign__input" type="email" value={formValue.email} name="email" placeholder="Email"
                            onChange={handleChange} />
                    </li>
                    <li className="sign__input-item">
                        <input className="sign__input" type="password" value={formValue.password} name="password" placeholder="Пароль"
                            onChange={handleChange} />
                    </li>
                </ul>
                <button className="sign__button sign__button_type_register" type="submit" name="submit">Зарегистрироваться</button>
            </form>
            <div className="sign__redirect-container">
                <p className="sign__redirect-title">Уже зарегистрированы? </p>
                <Link to="/sign-in" className="sign__redirect-link">Войти</Link>
            </div>
        </div>
    )
}