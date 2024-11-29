import React from "react";
import { Link } from "react-router-dom";
import './Layout.css';

function Layout({ PageTitle, children }) {
    return(
        <>
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <Link to='/' className="header__link">Просмотр<br /> проектов</Link>
                    <Link to='/' className="header__link">Создание проекта</Link>
                    <Link to='/' className="header__link header__link--black">Выход</Link>
                </div>
            </div>
        </header>
        <main>
            <div className="container">
                <h1 className="page-title">{ PageTitle }</h1>
                {children}
            </div>
        </main>
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <h2 className="footer__watermark">
                        Разработано командой лидеры для компании ФИЦ
                    </h2>
                </div>
            </div>
        </footer>
        </>
    );
}

export default Layout;