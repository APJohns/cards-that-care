import React from 'react';
import CardManager from './CardManager';

class Admin extends React.Component {

  render() {
    return (
      <section className="col mt-3">
        <h1>Admin</h1>
        <div className="row">
          {Object.keys(this.props.cards).map((key, i) => (
            <CardManager
              key={key}
              cardKey={key}
              tagList={this.props.tagList}
              priceList={this.props.priceList}
              index={i}
              updateCard={this.props.updateCard}
              {...this.props.cards[key]} />
          ))}
        </div>
      </section>
    );
  }
}

export default Admin;