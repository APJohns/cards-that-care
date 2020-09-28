import React from 'react';

class CartItem extends React.Component {

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
          </div>
        </div>
      </li>
    );
  }
}

export default CartItem;