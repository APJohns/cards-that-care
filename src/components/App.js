import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Catalogue from './modules/Catalogue';
import Admin from './modules/Admin';
import base from '../base';
import Checkout from './modules/Checkout';

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  state = {
    cards: {},
    selectCards: {}
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

  addCard = cardKey => {
    const selectedCards = {...this.state.selectedCards};
    selectedCards[cardKey] = this.state.cards[cardKey];
    this.setState({selectedCards});
    localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
  }

  removeCard = cardKey => {
    const selectedCards = {...this.state.selectedCards};
    delete selectedCards[cardKey];
    this.setState({selectedCards});
    localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
  }

  render() {
    return (
      <div className="container-fluid">
        <header className="row">
          <div className="col">
            <h1>Cards that Care</h1>
          </div>
        </header>
        <main className="row">
          <BrowserRouter>
            <Switch>
              <Route path="/cards/catalogue">
                <Catalogue
                  cards={this.state.cards}
                  addCard={this.addCard}
                  removeCard={this.removeCard}
                  selectedCards={this.state.selectedCards} />
              </Route>

              <Route path="/cards/checkout">
                <Checkout selectedCards={this.state.selectedCards}/>
              </Route>

              <Route path="/admin">
                <Admin cards={this.state.cards} />
              </Route>

              <Redirect exact from="/" to="cards/catalogue" />
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    );
  }
}

export default App;
