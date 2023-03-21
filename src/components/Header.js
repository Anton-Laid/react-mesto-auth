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

{
  /**
   * по какой причине я так сделал?
   * по хорошему я бы сделал еще один класс например,
   * HeaderBar где было бы всплывающее окно, сделал отдельный хедр для регистрации и входа,
   * так как на разрешении 320px нет бара и если я все оставил как есть, то в разделе регистрации/входа
   * был бы бургер, но в чек листе должен быть только один Header, так и сделал.
   * С нетерпением жду вашего мнения по поводу этого.
   * Может я зациклился на одном и не вижу как можно сделать по другому.
   */
  /* <>
{show && (
  <div className="">
    <p className="header__email">{email}</p>
    <button onClick={isOpen} className="header__included" to={'/sign-in'}>
      Выйти
    </button>
  </div>
)}
<header className="header">
  <a href="#" className="header__logo" />
  {pathname === '/sing-up' && (
    <Link className="header__included" to={'/sing-in'}>
      Войти
    </Link>
  )}
  {pathname === '/sing-in' && (
    <Link className="header__included" to={'/sing-up'}>
      Регистрация
    </Link>
  )}
  {pathname === '/' && (
    <>
      <button onClick={handleShow} className="" />
      <div className="">
        <p className="current-user__email">{email}</p>
        <button
          onClick={isOpen}
          className="current-user__logout"
          to={'/sign-in'}
        >
          Выйти
        </button>
      </div>
    </>
  )}
</header>
</> */
}

// function HeaderOne() {

// return (
// <>
// {show && (
//   <div className={`${show ? 'header__bar-active' : ''} header__bar`}>
//     <li className="header__email">{email}</li>
//     <li className="header__included" onClick={onClick}>
//       {title}
//     </li>
//   </div>
// )}

// <header className="header">
//   <div className="header__logo"></div>
//   <nav className="header__nav">
//     <ul className="header__box">
//       <li className="header__email">{email}</li>
//       <button className="header__included" onClick={onClick}>
//         {title}
//       </button>
//     </ul>
//   </nav>
//   {isOpen ? (
//     <div
//       className={`header__burger ${show ? 'active' : ''}`}
//       onClick={handleeShow}
//     >
//       <span></span>
//     </div>
//   ) : (
//     ''
//   )}
// </header>
// </>
// );
// }
