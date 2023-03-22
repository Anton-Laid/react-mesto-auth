import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Login({ onLogin, handleShowInfoMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      password,
      email,
    });
  };

  function onHavigeteRegister() {
    navigate('/sing-up', { replace: true });
  }

  return (
    <>
      <Header title="Регистрация" onClick={onHavigeteRegister} isOpen={false} />
      <form className="authorization__conteiner" onSubmit={handleSubmit}>
        <h1 className="authorization__title">Вход</h1>

        <input
          id="form-email"
          name="inputEmail"
          className="authorization__input"
          type="email"
          required
          placeholder="Email"
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="form-opened-account"
          name="inputOpened"
          className="authorization__input"
          type="password"
          required
          placeholder="Пароль"
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="authorization__button">Войти</button>
      </form>
    </>
  );
}

export default Login;

// const defaultValue = {
//   email: '',
//   password: '',
// };
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');

// const [inputs, setInputs] = useState(defaultValue);
// const navigate = useNavigate();

// function handleChange(event) {
//   const value = event.target.value;
//   const name = event.target.name;
//   setInputs((state) => ({ ...state, [name]: value }));
// }

// const handleSubmit = (e) => {
//   e.preventDefault();
//   authorize(inputs)
//     .then((res) => {
//       if (res.token) localStorage.setItem('token', res.poken);
//       resetForm();
//       onLogin();
//       navigate('/');
//     })
//     .catch((err) => {
//       handleShowInfoMessage({
//         text: 'Что-то пошло не так! Попробуйте еще раз.',
//         isSuccess: false,
//       });
//     });
// };

// function resetForm() {
//   setInputs({ ...defaultValue });
// }

// const onHavigeteRegister = () => {
//   navigate('/');
// };

// function onLogin({ password, email }) {
//   auth
//     .authorize({ password, email })
//     .then((res) => {
//       console.log(res.token);
//       localStorage.setItem('token', res.token);
//       setLoggedIn(true);
//       setEmail(res.data.email);
//       navigate('/', { replace: true });
//     })
//     .catch(() => {
//       setInfoTooltip(true);
//       setMessage({
//         imgPath: unionFalse,
//         text: 'Что-то пошло не так! Попробуйте ещё раз.',
//       });
//     });
// }
