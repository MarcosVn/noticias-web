import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../services/auth'
import { FiSearch, FiLogOut, FiUser, FiPlusCircle} from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';

const Home = () => {
  const username = localStorage.getItem('username');

  return (
    <div id="page">
      <div className="content">
        <header>
          <img src={logo} alt="NoticiasWeb"/>
          <span>NotíciasWeb</span>
          { username ? 
              <span>Olá, { username }</span>
              : null
          }
        </header>

        <main>
          <h1>Gerenciamento de Notícias</h1>
          <p>Faça a autenticação ou crie já sua conta para fazer o gerenciamento das notícias</p>
          
          {
            isAuthenticated() ?
            <a href="/" onClick={logout}>
              <span><FiLogOut /></span>
              <strong>Deslogar</strong> 
            </a>

            : <Link to="/login">
              <span><FiUser /></span>
              <strong>Autenticar ou Criar Conta</strong> 
            </Link>
          }
          
          <Link to="/cadastrar-noticia">
            <span><FiPlusCircle /></span>
            <strong>Cadastrar Notícia</strong>
          </Link>
          <Link to="/listar-editar-noticia">
            <span><FiSearch /></span>
            <strong>Pesquisar e Editar Notícias</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Home;