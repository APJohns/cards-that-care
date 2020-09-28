import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import './cart.scss';

class Cart extends React.Component {
  static propTypes = {
    selectedCards: PropTypes.object
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
    if (/^[\d.]+$/.test(e.target.value) || e.target.value === '') {
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
                  <CartItem key={key} {...this.props.selectedCards[key]} />
                ))}
              </ul>
              <h2>Info</h2>
              <p>You will not be charged on completion of your order. Online payment is coming soon. In the meantime, your order will be sent to us and we will be in touch about payment.</p>
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
                  <textarea id="notes" className="form-control" placeholder="I.e. Venmo username, or other preffered payment method." required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="donation">Additional Donation</label>
                  <div className="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">$</div>
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
          <p>
            Looks like you haven't picked out any cards yet. Go back to the catalogue and find your favorites.
          </p>
        }
      </section>
    );
  }
}

export default Cart;