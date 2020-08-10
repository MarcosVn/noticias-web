import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiLogIn, FiUserPlus } from 'react-icons/fi';

import { login } from '../../services/auth';
import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';

const Login = () => {
  const [buttonState, setButtonState] = useState();
  const [postData, setPostData] = useState({
    usuario: '',
    senha: '',
  });

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    if(buttonState === 'autenticar') {
      await api
              .post('login', postData)
              .then(response => {
                  login(response.data.token, postData.usuario);
                  history.push('/');
              })
              .catch(error => alert(error.response.data.message));
    } else {
      await api
              .post('register', postData)
              .then(response => {
                alert('Usuário cadastrado com sucesso! Clique em Login');
                history.push('/login');
              })
              .catch(error => alert(error.response.data.message));
    }    
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    
    setPostData({ ...postData, [name]: value });
  }  

  return (
    <div id="page">
      <header>
        <img src={logo} width="30" height="30" alt="NoticiasWeb"/>
        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Faça o login ou crie sua conta!</h1>

        <fieldset>
          <div className="field">
            <label htmlFor="name">Usuário</label>
            <input 
              type="text"
              name="usuario"
              id="usuario"
              onChange={handleInputChange}
            />
          </div>

          <div className="field">
            <label htmlFor="conteudo">Senha</label>
            <input 
              type="password"
              name="senha"
              id="senha"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>

        <div id="submit-button">
          <button 
            type="submit"
            onClick={() => setButtonState('autenticar')}
            >
            <span><FiLogIn/></span>
            <strong>Login</strong>
          </button>
          <button 
            type="submit"
            onClick={() => setButtonState('criar')}
            >  
            <span><FiUserPlus/></span>
            <strong>Criar Conta</strong> 
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;