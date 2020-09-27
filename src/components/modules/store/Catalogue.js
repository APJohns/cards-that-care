import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from './Card';

class Catalogue extends React.Component {
  static propTypes = {
    cards: PropTypes.object,
    selectedCards: PropTypes.object,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    history: PropTypes.object
  };

  selectCards= e => {
    e.preventDefault();
  }

  isSelected(key) {
    return this.props.selectedCards[key] ? true : false;
  }

  render() {
    return (
      <section className="col">
        <h2>Catalogue</h2>
        <form onSubmit={this.selectCards}>
          <div className="row">
            {Object.keys(this.props.cards).map((key, i) => (
              <Card
                key={key}
                addToCart={this.props.addToCart}
                removeFromCart={this.props.removeFromCart}
                cardKey={key}
                isSelected={this.isSelected(key)}
                {...this.props.cards[key]} />
            ))}
          </div>
          <Link to="/cards/checkout">Checkout</Link>
        </form>
      </section>
    );
  }
}

export default Catalogue;