import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class Catalogue extends React.Component {
  static propTypes = {
    cards: PropTypes.object,
    selectedCards: PropTypes.object,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    history: PropTypes.object
  };

  isSelected(key) {
    return this.props.selectedCards && this.props.selectedCards[key] ? true : false;
  }

  render() {
    return (
      <section className="col">
        <h1 className="mt-3">Catalogue</h1>
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
      </section>
    );
  }
}

export default Catalogue;