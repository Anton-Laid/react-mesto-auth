import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';

function Header({ email, onSingOut }) {
  const [show, setShow] = useState(false);
  const pathname = useLocation();
  const navigate = useNavigate();

  function handleShow() {
    setShow(!show);
  }

  const burgerClassName = show
    ? 'header__burger-nav-active'
    : 'header__burger-nav';

  function exit() {
    navigate('/sing-in', { replace: true });
    onSingOut();
  }

  return (
    <>
      {show && (
        <div className="header__bar">
          <p className="header__bar-email">{email}</p>
          <button onClick={exit} className="header__bar-button" to={'/sign-in'}>
            Выйти
          </button>
        </div>
      )}
      <header className="header">
        <div className="header__logo" />
        {pathname.pathname === '/sing-up' && (
          <Link className="header__title-button" to={'/sing-in'}>
            Войти
          </Link>
        )}
        {pathname.pathname === '/sing-in' && (
          <Link className="header__title-button" to={'/sing-up'}>
            Регистрация
          </Link>
        )}
        {pathname.pathname === '/' && (
          <>
            <div className="header__burger" onClick={handleShow}>
              <div className={burgerClassName} />
            </div>
            <div className="header__burger-box">
              <p className="header__burger-email">{email}</p>
              <button onClick={exit} className="header__burger-button">
                Выйти
              </button>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
