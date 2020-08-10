import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiPlusCircle } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/logo.svg';

const CriarNoticia = () => {
  const [postData, setPostData] = useState({
    titulo: '',
    conteudo: '',
    dataPublicacao: new Date()
  });

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    await api.post('noticia', postData)
             .then(response => console.log(response))
             .catch(err => console.log(err));

    history.push('/listar-editar-noticia');
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
        <h1>Cadastro de Notícia</h1>

        <fieldset>
          <div className="field">
            <label htmlFor="name">Título</label>
            <input 
              type="text"
              name="titulo"
              id="titulo"
              onChange={handleInputChange}
              />
          </div>

          <div className="field">
            <label htmlFor="conteudo">Conteúdo</label>
              <textarea 
                rows="8"
                type="text"
                name="conteudo"
                id="conteudo"
                onChange={handleInputChange}
                />
          </div>

          <div className="field">
            <label htmlFor="data">Data de Publicação</label>
              <input 
                type="date"
                name="dataPublicacao"
                id="dataPublicacao"
                onChange={handleInputChange}/>
          </div>         
        </fieldset>

        <button type="submit">
          <span><FiPlusCircle/></span>
          <strong>Cadastrar Notícia</strong>
        </button>
      </form>
    </div>
  );
}

export default CriarNoticia;