import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import './cart.scss';

class Cart extends React.Component {
  static propTypes = {
    selectedCards: PropTypes.object,
    removeFromCart: PropTypes.func
  };

  state = {
    donation: 0
  }

  getTotalCardCost = () => {
    return Object.values(this.props.selectedCards)
      .reduce((accumulator, current) =>
        ( accumulator + current.price ),
      0);
  }

  getTotalCost = () => {
    return this.getTotalCardCost() + this.state.donation;
  }

  handleDonation = e => {
    if (/^(\s*|[\d.]+)$/.test(e.target.value)) {
      this.setState({donation: e.target.value});
    }
  }

  render() {
    return (
      <section className="col">
        {this.props.selectedCards && Object.keys(this.props.selectedCards).length > 0 ?
          <div className="row h-100">
            <div className="col-sm-6 col-lg-7 col-xl-8 pt-3">
              <h1>Cart</h1>
              <ul className="row">
                {Object.keys(this.props.selectedCards).map(key => (
                  <CartItem
                    key={key}
                    cardKey={key}
                    removeFromCart={this.props.removeFromCart}
                    {...this.props.selectedCards[key]} />
                ))}
              </ul>
              <h2>Info</h2>
              <p>You will not be charged on completion of your order. Online payment is coming soon. In the meantime, your order information will be sent to us and payment options are detailed below.</p>
              <h3>Payment Options</h3>
              <ul className="list">
                <li>Donate directly to the <a href="https://donate.pmc.org/">Pan-Mass Challenge using ID SJ0126</a>. Mention Cards that Care in the note to rider.</li>
                <li>Venmo, include username in notes and we'll send you a payment request.</li>
              </ul>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" className="form-control" required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" className="form-control" required />
                </div>
                <div className="form-group col-lg-6">
                  <label htmlFor="notes">Notes</label>
                  <textarea id="notes" className="form-control" placeholder="I.e. Venmo username, or other payment method." />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="donation">Additional Donation</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input type="number" id="donation" className="form-control" value={this.state.donation} onChange={this.handleDonation} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-5 col-xl-4 pt-3 order-summary">
              <h2>Order Summary</h2>
              <dl>
                <div className="d-flex align-items-center mt-3">
                  <dt className="font-">
                    {Object.keys(this.props.selectedCards).length} Card{Object.keys(this.props.selectedCards).length > 1 && 's'}
                  </dt>
                  <div className="flex-fill row-line"></div>
                  <dd>${this.getTotalCardCost()}</dd>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <dt>Additional Donation</dt>
                  <div className="flex-fill row-line"></div>
                  <dd>${this.state.donation || 0}</dd>
                </div>
                <div className="d-flex justify-content-between mt-5">
                  <dt className="font-weight-semi-bold">Total</dt>
                  <dd>${this.getTotalCost()}</dd>
                </div>
              </dl>
            </div>
          </div>
          :
          <p className="mt-3">
            Looks like you haven't picked out any cards yet. Go back to the catalogue and find your favorites.
          </p>
        }
      </section>
    );
  }
}

export default Cart;