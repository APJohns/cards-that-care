import React from 'react';

class CartItem extends React.Component {

  handleRemove = () =>{
    this.props.removeFromCart(this.props.cardKey);
  }

  render() {
    return (
      <li className="col-6 col-md-4 col-lg-3 col-xl-2 my-3">
        <div className="card">
          <div className="card-body">
            <div className="card-price">
              ${this.props.price}
            </div>
            <div className="card-image">
              <img
                src={`/assets/cards/${this.props.fileName}`}
                alt={this.props.alt} />
            </div>
            <button type="button" className="card-action remove" onClick={this.handleRemove}>Remove</button>
          </div>
        </div>
      </li>
    );
  }
}

export default CartItem;