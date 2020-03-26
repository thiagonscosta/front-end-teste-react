import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AddRecipePage.css';

import axios from 'axios';
import StoreContext from '../../store/context';

import M from 'materialize-css/dist/js/materialize.min.js';


class AddRecipePage extends Component {
  static contextType = StoreContext;

  state = {
    user_id: "",
    alert: "",
    options: "",
    title: "",
    description: "",
    category: "",
    user: ""
  };

  constructor(props) {
    super(props);
    this.handleSubmitRecipe = this.handleSubmitRecipe.bind(this);
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems, {});
    });

    this.setState({
      user_id: this.context.user.id
    });

    this.getCategoriesFromApi();
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  headerConfig() {
    const context = this.context;
    const token = context.user.token;

    console.log(token)

    const config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    return config;
  }

  getCategoriesFromApi() {
    axios
      .get(
        "https://receitas.devari.com.br/api/v1/category",
        this.headerConfig()
      )
      .then(res => {
        this.setState({
          options: res.data
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmitRecipe(e) {
    e.preventDefault();

    const values = {
        title: this.state.title,
        description: this.state.description,
        category: this.state.category,
        user: this.state.user_id
    }

    axios.post('https://receitas.devari.com.br/api/v1/recipe/', values, this.headerConfig())
    .then(res => {
        this.resetForm();
        this.setState({
            alert: 'Receita salva com sucesso!'
        })
    })
    .catch(err => {
        console.log(err)
    })
  }

  resetForm() {
    this.setState({
        title: '',
        description: '',
        category: '',
    })
  }

  render() {
    return (
      <main>
        <div className="title-page">
          <Link to="/receitas">
            <span className="back-arrow">
              <i className="material-icons">arrow_back</i>
              Voltar
            </span>
          </Link>
          <h6 className="center-align title">Adicionar Receita</h6>
        </div>
        <div className="container">
          <div className="row valign-wrapper">
            <div className="col sm12 m10">
              <div className="card card-addrecipe">
                <h6 className="alert">{this.state.alert}</h6>
                <form onSubmit={this.handleSubmitRecipe}>
                  <div className="input-fild">
                    <input
                      type="text"
                      name="title"
                      placeholder="Nome da Receita"
                      onChange={this.onChangeInput}
                      value={this.state.title}
                    />
                  </div>
                  <div className="input-field">
                    <select
                      name="category"
                      value={this.state.category}
                      onChange={this.onChangeInput}
                      className="browser-default"
                    >
                      <option>Selecione uma categoria</option>
                      {Object.keys(this.state.options).map(elem => (
                        <option
                          key={this.state.options[elem].id}
                          value={this.state.options[elem].id}
                        >
                          {this.state.options[elem].name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h5>Descrição</h5>
                  </div>
                  <div className="input-field">
                    <textarea
                      name="description"
                      onChange={this.onChangeInput}
                      value={this.state.description}
                    ></textarea>
                  </div>
                  <div className="input-field valign-wrapper">
                    <button type="submit" className="submit-recipe">
                      Criar Receita
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
}

export default AddRecipePage;