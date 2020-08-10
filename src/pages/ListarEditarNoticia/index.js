import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FaTrash, FaEdit, FaRegSave } from 'react-icons/fa';
import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.svg';

const ListarNoticia = () => {
  const [noticias, setNoticias] = useState();
  const [editNoticia, setEditNoticia] = useState();
  const [postData, setPostData] = useState({
    titulo: '',
    conteudo: '',
    dataPublicacao: ''
  });

  const history = useHistory();

  useEffect(() => {
    api.get('noticias').then(response => {
      setNoticias(response.data);
    });
  }, []);

  useEffect(() => {
    setEditNoticia(false);
  }, []);

    
  async function handleSelectedNoticia(id) {
    const noticia = await noticias.find(noticia => noticia._id === id);

    setEditNoticia(true);
    setPostData(noticia);
  }

  async function handleUpdate(id) {

    await api.put(`noticia/${id}`, postData)
       .then(response => console.log(response))
       .catch(error => alert(error.response.data.message));
    
    history.go(0);
  }


  async function handleRemove(id) {
    if(window.confirm('Deseja realmente excluir o registro?')) {
      await api.delete(`noticia/${id}`)
       .then(response => alert('Exclusão realizada, com sucesso!'))
       .catch(error => alert(error.response.data.message));

      history.go(0);
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

      <main>
        {editNoticia ? 
          <form>
            <fieldset>
              <div className="field">
                <label htmlFor="name">Título</label>
                <input 
                  type="text"
                  name="titulo"
                  id="titulo"
                  onChange={handleInputChange}
                  value={postData.titulo}
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
                    value={postData.conteudo}
                  />
              </div>

              <button
                  onClick={() => handleUpdate(postData._id)}>
                  <span><FaRegSave/></span>
                  <strong>Salvar Edição</strong>
              </button>
            </fieldset>
          </form>
          : null
        }
        
        {noticias && noticias.length ? 
        <ul className="noticias-grid">
          {noticias.map(noticia => (
            <li key={noticia._id}>

              <h2>{noticia.titulo}</h2>
              <span>{noticia.conteudo}</span>
              <span>{new Date(noticia.dataPublicacao).toLocaleString()}</span>

              <div>
                <button
                  onClick={() => handleSelectedNoticia(noticia._id)}>
                  <FaEdit/>
                </button>

                <button 
                  onClick={() => { handleRemove(noticia._id) }}>
                    <FaTrash color='#c0392b'/>
                </button>
              </div>
            </li>
          ))} 
        </ul>
        : <h3>Não existem notícias a serem exibidas no momento!</h3>
        }
      </main>
    </div>
  );
}

export default ListarNoticia;