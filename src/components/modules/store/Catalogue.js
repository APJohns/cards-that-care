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

  state = {
    cardsPage: [],
    currentPage: 1,
    pageSize: 12,
    startIndex: 0,
    endIndex: 12,
    isPrevDisabled: true,
    numPages: 1
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        cardsPage: Object.keys(this.props.cards).slice(this.state.startIndex, this.state.endIndex),
        numPages: Math.ceil(Object.keys(this.props.cards).length / this.state.pageSize)
      });
    }
  }

  isSelected(key) {
    return this.props.selectedCards && this.props.selectedCards[key] ? true : false;
  }

  nextPage = () => {
    if (this.state.startIndex + this.state.pageSize <= Object.keys(this.props.cards).length) {
      const startIndex = this.state.startIndex + this.state.pageSize;
      const endIndex = this.state.endIndex + this.state.pageSize;
      this.setState({
        currentPage: this.state.currentPage + 1,
        startIndex,
        endIndex,
        cardsPage: Object.keys(this.props.cards).slice(startIndex, endIndex)
      });
    }
  }

  prevPage = () => {
    if (this.state.startIndex - this.state.pageSize >= 0) {
      const startIndex = this.state.startIndex - this.state.pageSize;
      const endIndex = this.state.endIndex - this.state.pageSize;
      this.setState({
        currentPage: this.state.currentPage - 1,
        startIndex,
        endIndex,
        cardsPage: Object.keys(this.props.cards).slice(startIndex, endIndex)
      });
    }
  }

  render() {
    return (
      <section className="col">
        <h1 className="mt-3">Catalogue</h1>
        <p>All profits made before October 1st go to the Pan-Mass Challenge. After October 1st, profits will be donated directly to Dana-Farber.</p>
        <div className="row">
          {this.state.cardsPage.map((key, i) => (
            <Card
              key={key}
              addToCart={this.props.addToCart}
              removeFromCart={this.props.removeFromCart}
              cardKey={key}
              isSelected={this.isSelected(key)}
              {...this.props.cards[key]} />
          ))}
        </div>
        <div className="row align-items-center">
          <p className="col-auto ml-auto">Page {this.state.currentPage} of {this.state.numPages}</p>
          <nav className="col-auto" aria-label="Card pagination">
            <ul className="pagination">
              <li className={'page-item' + (this.state.currentPage === 1 && ' disabled')}>
                <button onClick={this.prevPage} className="page-link" aria-disabled={this.state.currentPage === 1}>Previous</button>
              </li>
              {/* TODO: dynamically create these */}
              {/* <li className="page-item"><button className="page-link">{this.state.currentPage - 1}</button></li>
              <li className="page-item active" aria-current="page">
                <button className="page-link" href="#">{this.state.currentPage} <span className="sr-only">(current)</span></button>
              </li>
              <li className="page-item"><button className="page-link">{this.state.currentPage + 1}</button></li>
              <li className="page-item"><button className="page-link">{this.state.currentPage + 2}</button></li> */}
              <li className={'page-item' + (this.state.currentPage === this.state.numPages && ' disabled')}>
                <button onClick={this.nextPage} className="page-link" aria-disabled={this.state.currentPage === this.state.numPages}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    );
  }
}

export default Catalogue;