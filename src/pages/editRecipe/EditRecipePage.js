import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './EditRecipePage.css';

import axios from 'axios';
import StoreContext from '../../store/context';

import M from 'materialize-css/dist/js/materialize.min.js';


class AddRecipePage extends Component {
  static contextType = StoreContext;

  state = {
    user_id: "",
    options: "",
    title: "",
    description: "",
    category: "",
    user: "",
    alert: "",
  };

  constructor(props) {
    super(props);
    this.handleEditRecipe = this.handleEditRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
  }

  componentDidMount() {

    document.addEventListener("DOMContentLoaded", function() {
      let elems = document.querySelectorAll("select");
      let instances = M.FormSelect.init(elems, {});
    });

    document.addEventListener('DOMContentLoaded', function () {
      let elems = document.querySelectorAll('.modal');
      let instances = M.Modal.init(elems, {});
    });

    this.setState({
      user_id: this.context.user.id,
    });

    this.getCategoriesFromApi();
    this.getRecipeFromApi();
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  headerConfig() {
    const context = this.context;
    const token = context.user.token;
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
        this.headerConfig(),
        console.log(this.headerConfig())
      )
      .then(res => {
        this.setState({
          options: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRecipeFromApi() {
    const recipe_id = this.props.match.params.id;

    console.log('recipe id', recipe_id);

    axios.get(`https://receitas.devari.com.br/api/v1/recipe/${recipe_id}`,
        this.headerConfig()
      )
      .then(res => {
        this.setState({
          title: res.data.title,
          description: res.data.description,
          category: res.data.category
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleDeleteRecipe() {
    const recipe_id = this.props.match.params.id;

    axios.delete(`https://receitas.devari.com.br/api/v1/recipe/${recipe_id}`, this.headerConfig())
      .then(res => {
        this.backPage();
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleEditRecipe() {
    const recipe_id = this.props.match.params.id;

    const values = {
        title: this.state.title,
        description: this.state.description,
        category: this.state.category,
    }

    console.log(values)

    axios.patch(`https://receitas.devari.com.br/api/v1/recipe/${recipe_id}/`, values, this.headerConfig())
    .then(res => {
        this.setState({
          alert: 'Receita editada com sucesso!',
        });
        setTimeout(() => {
          this.backPage(); 
        }, 40000);
    })
    .catch(err => {
        console.log(err)
    })
  }

  backPage() {
    this.props.history.goBack();
  }

  render() {
    return (
      <main>
        <div className="title-page">
          <Link to="/minhas_receitas">
            <span className="back-arrow">
              <i className="material-icons">arrow_back</i>
              Voltar
            </span>
          </Link>
          <h6 className="center-align title">Editar Receita</h6>
        </div>
        <div className="container">
          <div className="row valign-wrapper">
            <div className="col sm12 m10">
              <div className="card card-addrecipe">
                <h6 className="center-align alert">{this.state.alert}</h6>
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
                  <div className="btn-wrapper">
                    <a type="submit" className="btn-delete modal-trigger" href="#modal-delete">
                      Deletar 
                    </a>
                    <a type="submit" className="btn-edit modal-trigger" href="#modal-edit">
                      Editar 
                    </a>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div id="modal-delete" className="modal">
          <div className="modal-content">
            <h6>Deseja deletar esta receita?</h6>
          </div>
          <div className="modal-footer">
            <button 
              className="modal-close waves-effect waves-green btn-flat modal-action"
            >
              Cancelar
            </button>
            <button 
              className="modal-close waves-effect waves-green btn-flat modal-action"
              onClick={this.handleDeleteRecipe}
            >
              Deletar
            </button>
          </div>
        </div>

        <div id="modal-edit" className="modal">
          <div className="modal-content">
            <h6>Deseja salvar as alterações?</h6>
          </div>
          <div className="modal-footer">
            <button 
              className="modal-close waves-effect waves-green btn-flat modal-action"
            >
              Cancelar
            </button>
            <button 
              className="modal-close waves-effect waves-green btn-flat modal-action"
              onClick={this.handleEditRecipe}
            >
              Salvar
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default AddRecipePage;