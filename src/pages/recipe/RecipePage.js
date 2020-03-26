import React, {
    Component,
} from 'react';
import { Link } from 'react-router-dom';
import no_image_w300 from '../../assets/images/no_image_w300.png';
import './RecipePage.css';
import axios from 'axios';

import StoreContext from '../../store/context';

class RecipePage extends Component {
    static contextType = StoreContext;

    state = {
        recipe: '',
        category: '',
    }

    componentDidMount() {
        this.getRecipeFromApi();
    }

    getRecipeFromApi() {
        const context = this.context;
        const token = context.user.token;
        const recipe_id = this.props.match.params.id;

        const config = {
            headers: {
                Authorization: `Token ${token}`
            }
        };

        axios.get(`https://receitas.devari.com.br/api/v1/recipe/${recipe_id}`, config)
            .then(res => {
                this.setState({
                    recipe: res.data
                });
                this.setState({
                    category: this.state.recipe.category
                })
                console.log(res.data.category)

            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <main>
                <div className="title-page">
                    <Link to="/">
                        <span className="back-arrow">
                            <i className="material-icons">arrow_back</i>
                            Voltar
                        </span>
                    </Link>
                    <h6 className="center-align title">{this.state.recipe.title}</h6>
                </div>
                <div className="container">
                    <div className="row valign-wrapper">
                        <div className="col s12 m10">
                            <div className="card">
                                <div className="card-image">
                                    <div className="card-image">
                                        {
                                            !this.state.category.image &&
                                            <img src={no_image_w300}></img>
                                        }
                                        <img src={this.state.category.image}></img>
                                        <span className="card-title">{this.state.category.name}</span>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <p>{this.state.recipe.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

}

 
export default RecipePage;