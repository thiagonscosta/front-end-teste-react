import React, { Component } from 'react';
import {
    Link,
    BrowserRouter,
    useHistory
} from 'react-router-dom';
import StoreContext from '../../store/context';

import './Header.css';

import M from 'materialize-css/dist/js/materialize.min.js';

export class Header extends Component {
  static contextType = StoreContext;

  state = {
    user: '',
  }

  componentDidMount () {
    document.addEventListener('DOMContentLoaded', () => {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    });
  }

  userLogout() {
    this.setState({
      user: null
    });

    this.props.history.push('/');
  }

  render () {
    return (
      <header>
        <nav className="nav-header">
          <div className="container">
            <a href="#!" className="brand-logo">
              <span className="title-1">Dev</span>
              <span className="title-2">food</span>
            </a>

            { this.context.user && 
              <a
                href="/"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="material-icons">menu</i>
              </a>
            }

            { this.context.user && 
              <ul className="right hide-on-med-and-down nav-links">
                <li>
                  <Link to="/receitas">Receitas</Link>
                </li>
                <li>
                  <Link to="/minhas_receitas">Minhas Receitas</Link>
                </li>
                <li>
                  <Link to="/adicionar_receita">Adicionar Receitas</Link>
                </li>
                <li>
                  <div className="link-account">
                    <Link to="/minha_conta">
                      <span>{this.context.user.name}</span>
                      <img
                        src={this.context.user.image}
                        alt="avatar"
                        className="responsive-img avatar"
                      />
                    </Link>
                    <div className="divisor"></div>
                  </div>
                </li>
                <li>
                  <Link 
                    to="/"
                    onClick={this.userLogout}
                  >
                    Sair
                  </Link>
                </li>
              </ul>
            }
          </div>
        </nav>
        <div className="blue-stripe"></div>
          
        {this.context.user && 
          <ul className="sidenav" id="mobile-demo">
            <div className="side-header">
              <div className="side-logo">
                <span className="title-1 side-title">Dev</span>
                <span className="title-2 side-title">food</span>
              </div>
            </div>
            <div className="blue-stripe"></div>
            <li>
              <div className="avatar-wrapper valign-wrapper">
                <img 
                  className="sidenav-avatar" 
                  src={this.context.user.image}
                  alt="user avatar"/>
              </div>
            </li>
            <li>
              <Link to="/receitas">
                Receitas
              </Link>
            </li>
            <li>
              <Link to="/minhas_receitas">
                Minhas Receitas
              </Link>
            </li>
            <li>
              <Link to="/adicionar_receita">
                Adicionar Receita
              </Link>
            </li>
            <li>
              <Link to={"#"}>

              </Link>
            </li>
          </ul>
        }
      </header>
    );
  }
}

export default Header;