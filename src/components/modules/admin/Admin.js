import React from 'react';
import CardManager from './CardManager';

class Admin extends React.Component {

  state = {
    tagList: ['Birthday', 'Christmas', 'Anniversary']
  }

  render() {
    return (
      <section className="col">
        <h2>Admin</h2>
        <div className="row">
          {Object.keys(this.props.cards).map((key, i) => (
            <CardManager
              key={key}
              cardKey={key}
              tagList={this.state.tagList}
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