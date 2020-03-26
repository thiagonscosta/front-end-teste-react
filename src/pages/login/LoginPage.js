import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'; 
import StoreContext from '../../store/context';

import axios from 'axios';

import "./LoginPage.css";

function initialState() {
  return {username: '', password: ''};
}

const LoginPage = () => {
  const history = useHistory();
  const [values, setValues] = useState(initialState);
  const { setUser } = useContext(StoreContext);

  function onChangeInput(e) {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  async function onSubmitLogin(e) {
    e.preventDefault();
    axios.post('https://receitas.devari.com.br/authentication/', values)
      .then(res => {
        setUser(res.data);
        history.push('/receitas');
      })
      .catch(err => {
        console.log(err);
      });    
  }

  return (
    <main>
      <div className="title-page">
        <h6 className="center-align title">Entre em sua conta</h6>
      </div>
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s12 m6">

            <div className="card card-form-login">
              <form id="form-login" onSubmit={onSubmitLogin}>
                <label>
                  E-mail
                  <input
                    type="email"
                    name="username"
                    placeholder="exemplo@email.com"
                    onChange={onChangeInput}
                    value={values.username}
                  ></input>
                </label>
                <label>
                  Senha
                  <input
                    type="password"
                    name="password"
                    onChange={onChangeInput}
                    value={values.password}
                  ></input>
                </label>
                <div className="right-align">
                  <button 
                    type="submit"
                    className="btn-enter z-depth-2 "
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;



