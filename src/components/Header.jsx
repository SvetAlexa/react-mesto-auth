import { Routes, Route, Link } from 'react-router-dom'
import Logo from '../images/logo.svg'

export default function Header() {
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
            </Routes>
        </header>
    )
}