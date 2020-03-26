import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StoreContext from '../../store/context';
import './MyRecipesPage.css';

import no_image_w300 from '../../assets/images/no_image_w300.png';

class MyRecipesPage extends Component {
    static contextType = StoreContext;

    state = {
        my_recipes: '',
        alert: ''
    }

    componentDidMount() {
        const context = this.context;
        const token = context.user.token;
        const user_id = context.user.id;

        const config = {
            headers: {
                Authorization: `Token ${token}`
            }
        };

        axios.get(`https://receitas.devari.com.br/api/v1/recipe?user=${user_id}`, config)
            .then(res => {
                this.setState({
                    my_recipes: res.data
                });
                
                if(this.state.my_recipes.length == 0) {
                    this.setState({
                        alert: 'Você não possui receitas cadastradas.'
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render () {
        return (
            <main>
                <div className="title-page">
                    <h6 className="center-align title">Minhas Receitas</h6>
                </div>

                <div className="container">
                    <div className="row">
                        {
                            this.state.my_recipes.length == 0 &&
                                <div className="notice-wrapper">
                                    <h5 className="no-recipes-notice">
                                        { this.state.alert }
                                    </h5>
                                </div>
                        }

                        {
                            this.state.my_recipes.length > 0 && 
                                Object.keys(this.state.my_recipes).map((rec, i) => (
                                <div className="col s12 m4" key={i}>
                                    <div className="card card-recipe">
                                        <div className="card-image">
                                            {
                                                !this.state.my_recipes[rec].category.image &&
                                                <img src={no_image_w300}></img>
                                            }
                                            <img src={this.state.my_recipes[rec].category.image}></img>
                                            <span className="card-title">{this.state.my_recipes[rec].title}</span>
                                        </div>
                                        <div className="card-content">
                                            <p>{this.state.my_recipes[rec].description}</p>
                                        </div>
                                        <div className="right-align action">
                                            <Link to={`/editar_receita/${this.state.my_recipes[rec].id}`}>
                                                Ver Receita
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                           
                    </div>
                </div>
            </main>
        )
    }
}

export default MyRecipesPage;