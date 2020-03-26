import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RecipesPage.css';
import no_image_w300 from '../../assets/images/no_image_w300.png';

import axios from 'axios';
import StoreContext from '../../store/context';

class RecipesPage extends Component {
    static contextType = StoreContext;

    state = { 
        recipes: '',
    }

    componentDidMount() {
        this.getRecipesFromApi();
    }

    getRecipesFromApi() {
        const context = this.context;
        const token = context.user.token;
        
        const config = {
            headers: {
                Authorization: `Token ${token}`
            }
        };

        axios.get('https://receitas.devari.com.br/api/v1/recipe', config)
            .then(res => {
                this.setState({
                    recipes: res.data
                });
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <main>
                <div className="title-page">
                    <h6 className="center-align title">Receitas</h6>
                </div>
                <div className="container">
                    <div className="row">
                        {
                            Object.keys(this.state.recipes).map((rec, i) => (
                                <div className="col s12 m4" key={i}>
                                    <div className="card card-recipe">
                                        <div className="card-image">
                                            {
                                                !this.state.recipes[rec].category.image &&
                                                <img src={no_image_w300}></img>
                                            }
                                            <img src={this.state.recipes[rec].category.image}></img>
                                            <span className="card-title">{this.state.recipes[rec].title}</span>
                                        </div>
                                        <div className="card-content">
                                            <p>{this.state.recipes[rec].description}</p>
                                        </div>
                                        <div className="right-align action">
                                            <Link to={`/receita/${this.state.recipes[rec].id}`}>
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
        );
    }
}
// const RecipesPage = () => {
//     const { user } = useContext(StoreContext);

//     useEffect (() => {
//         console.log('user', user)
//     })

//     return (
//         <main>
//             <div className="title-page">
//                 <h6 className="center-align title">Receitas</h6>
//             </div>
//         </main>
//     )
    
// }

export default RecipesPage;