import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

class Cart extends React.Component {
  static propTypes = {
    selectedCards: PropTypes.object
  };

  render() {
    return (
      <section className="col">
        <h2>Cart</h2>
        {this.props.selectedCards && Object.keys(this.props.selectedCards).length > 0 ?
          <>
            <ul>
              {Object.keys(this.props.selectedCards).map(key => (
                <CartItem key={key} {...this.props.selectedCards[key]}>{key}</CartItem>
              ))}
            </ul>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control" />
            </div>
          </>
          :
          <p>
            Looks like you haven't picked out any cards yet. Go back to the catalogue and find your favorites.
          </p>
        }
      </section>
    );
  }
}

export default Cart;