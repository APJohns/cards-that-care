import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  static propTypes = {
    card: PropTypes.shape({
      fileName: PropTypes.string
    }),
    cardKey: PropTypes.string,
    isSelected: PropTypes.bool,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func
  };

  handleCheck = e => {
    e.currentTarget.checked ?
      this.props.addToCart(this.props.cardKey)
      : this.props.removeFromCart(this.props.cardKey);
  }

  render() {
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <div className="card">
          <label className="mb-0">
            <input
              type="checkbox" className="card-checkbox"
              checked={this.props.isSelected}
              onChange={this.handleCheck} />
            <span className="sr-only">Label</span>
            <div className="card-body">
              <div className="card-overlay">
                <div className="checkmark"></div>
              </div>
              <img
                className="card-image"
                src={`/assets/cards/${this.props.fileName}`}
                alt={this.props.alt} />
            </div>
          </label>
        </div>
      </div>
    );
  }
}

export default Card;