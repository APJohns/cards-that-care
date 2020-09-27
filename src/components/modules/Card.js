import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

class Card extends React.Component {
  static propTypes = {
    card: PropTypes.shape({
      fileName: PropTypes.string
    }),
    cardID: PropTypes.string,
    isSelected: PropTypes.bool,
    addCard: PropTypes.func,
    removeCard: PropTypes.func
  };

  handleCheck = e => {
    e.currentTarget.checked ?
      this.props.addCard(this.props.cardID)
      : this.props.removeCard(this.props.cardID);
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