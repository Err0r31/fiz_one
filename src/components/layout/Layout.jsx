import React from "react";
import { Link } from "react-router-dom";
import './Layout.css';
import logoTeam from '../../assets/img/logo/logo-team.svg';
import logoCompany from '../../assets/img/logo/logo-company.svg';

function Layout({ PageTitle, children }) {
    return (
        <>
            <header className="header">
                <div className="header__wrapper">
                    <div className="header__logo">
                        <img className="header__logo-image logo-company" src={logoCompany} alt="Логотип компании"></img>
                        <img className="header__logo-image logo-team" src={logoTeam} alt="Логотип команды Лидеры"></img>
                    </div>
                    <div className="header__nav">
                        <Link to='/' className="header__link">Просмотр<br /> проектов</Link>
                        <Link to='create-project/' className="header__link">Создание проекта</Link>
                        <Link to='/' className="header__link header__link--black">Выход</Link>
                    </div>
                </div>
            </header>
            <main>
                <h1 className="page-title">{PageTitle}</h1>
                {children}
            </main>
            <footer className="footer">
                <div className="footer__wrapper">
                    <h2 className="footer__watermark">
                        Разработано командой лидеры для компании ФИЦ
                    </h2>
                </div>
            </footer>
        </>
    );
}

export default Layout;