import { Routes, Route, Link } from 'react-router-dom'
import Logo from '../images/logo.svg'

export default function Header({ email, onSignOut }) {
    return (
        <header className="header page__container-header">
            <img className="header__logo" src={Logo} alt="логотип Место Россия" />
            <Routes>
                <Route path='/sign-up' element={
                    <Link to="/sign-in" className="header__nav">Войти</Link>}
                />
                <Route path='/sign-in' element={
                    <Link to="/sign-up" className="header__nav">Регистрация</Link>}
                />
                <Route path='/' element={
                    <div className='header__info-container'>
                        <p className='header__info-user'>{email}</p>
                        <button className='header__button-logout' onClick={onSignOut}>Выйти</button>
                    </div>
                }
                />
            </Routes>
        </header>
    )
}