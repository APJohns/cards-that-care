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

  getPrice = e => {
    if (this.props.priceCategory === 'Custom') {
      return this.props.price;
    }
  }

  render() {
    const addButton = <button type="button" className="card-action add" onClick={() => this.props.addToCart(this.props.cardKey)}>Add to Cart</button>

    const removeButton = <button type="button" className="card-action remove" onClick={() => this.props.removeFromCart(this.props.cardKey)}>Remove</button>

    return (
      <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2 my-3">
        <div className="card">
          <div className="card-body">
            <div className="card-price">
              ${this.props.price}
            </div>
            <div className="card-image">
              {this.props.isSelected &&
                <div className="card-overlay">
                  <div className="checkmark"></div>
                </div>
              }
              <img
                src={`/assets/cards/${this.props.fileName}`}
                alt={this.props.alt}
                loading="lazy" />
            </div>
            <div className="card-content">
              {this.props.tags &&
                <ul className="tag-list">
                  {this.props.tags.map((tag, i) =>(
                    <li
                      key={`tag-${this.props.cardKey}-${i}`}
                      className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              }
            </div>
            { this.props.isSelected ? removeButton : addButton }
          </div>
        </div>
      </div>
    );
  }
}

export default Card;