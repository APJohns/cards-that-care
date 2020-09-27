import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Catalogue from './modules/store/Catalogue';
import Admin from './modules/admin/Admin';
import base from '../base';
import Cart from './modules/store/Cart';

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  state = {
    cards: {},
    selectCards: {},
    tagList: ['Birthday', 'Christmas', 'Anniversary'],
    priceList: {
      'Standard': '$5'
    }
  }

  component

  componentDidMount() {
    this.ref = base.syncState(`cards`, {
      context: this,
      state: 'cards'
    });
    if (localStorage.getItem('selectedCards')) {
      this.setState({
        selectedCards: JSON.parse(localStorage.getItem('selectedCards'))
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addToCart = cardKey => {
    const selectedCards = {...this.state.selectedCards};
    selectedCards[cardKey] = this.state.cards[cardKey];
    this.setState({selectedCards});
    localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
  }

  removeFromCart = cardKey => {
    const selectedCards = {...this.state.selectedCards};
    delete selectedCards[cardKey];
    this.setState({selectedCards});
    localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
  }

  updateCard = (key, card) => {
    const cards = {...this.state.cards};
    Object.keys(card).forEach(property =>{
      cards[key][property] = card[property];
    });
    this.setState({cards});
  }

  genCards = () => {
    const cards = {...this.state.cards};
    for (let i = 1; i <= 96; i++) {
      cards[`card${i}`] = {
        fileName: `card${i}.jpeg`,
        tags: [],
        priceCategory: 'Standard',
        price: '$5'
      };
    }
    this.setState({cards});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <header className="row">
            <div className="col position-relative">
              <h1>Cards that Care</h1>
              {/* <button onClick={this.genCards}>Generate Cards</button> */}
            </div>
          </header>
          <nav className="row nav-primary">
            <div className="col-auto">
              <Link to="/cards/catalogue">Catalogue</Link>
            </div>
            <div className="col-auto">
              <Link to="/admin">Admin</Link>
            </div>
            <div className="col-auto ml-auto">
              <Link to="/cards/cart">Cart{
              (this.state.selectedCards
                && Object.keys(this.state.selectedCards).length > 0)
                && `(${Object.keys(this.state.selectedCards).length})`
              }</Link>
            </div>
          </nav>
          <main className="row">
            <Switch>
              <Route path="/cards/catalogue">
                <Catalogue
                  cards={this.state.cards}
                  addToCart={this.addToCart}
                  removeFromCart={this.removeFromCart}
                  selectedCards={this.state.selectedCards} />
              </Route>

              <Route path="/cards/cart">
                <Cart selectedCards={this.state.selectedCards}/>
              </Route>

              <Route path="/admin">
                <Admin
                  cards={this.state.cards}
                  updateCard={this.updateCard}
                  tagList={this.state.tagList}
                  priceList={this.state.priceList} />
              </Route>

              <Redirect exact from="/" to="cards/catalogue" />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
