import React from 'react';

class CardManager extends React.Component {

  state = {
    fileName: '',
    tags: []
  }

  componentDidMount() {
    this.setState({
      fileName: this.props.fileName,
      tags: this.props.tags || []
    });
  }

  handleFileName = e => {
    this.setState({fileName: e.target.value})
    this.props.updateCard(
      this.props.cardKey,
      { fileName: e.target.value }
    )
  }

  handleTags = e => {
    let tags = [...this.state.tags];
    if (tags.includes(e.target.value)) {
      tags = tags.filter(t => t !== e.target.value);
    } else {
      tags.push(e.target.value)
    }
    this.setState({tags}, () => {
      this.props.updateCard(
        this.props.cardKey,
        { tags: this.state.tags }
      )
    })
  }

  render() {
    return (
      <div className="col-12 col-lg-6">
        <div className="card card-manager">
          <div className="card-body">
            <img
              className="card-image"
              src={`/assets/cards/${this.props.fileName}`}
              alt={this.props.alt} />
            <div className="card-content">
              <dl>
                <dt>ID: </dt>
                <dd>{this.props.cardKey}</dd>
              </dl>
              <div className="form-group">
                <label htmlFor={'fileName' + this.props.index} >File Name</label>
                <input
                  type="text"
                  id={'fileName' + this.props.index}
                  className="form-control"
                  value={this.state.fileName}
                  onChange={this.handleFileName} />
              </div>
              <fieldset className="form-group">
                <div className="row">
                  <legend className="col-form-label col-12 pt-0">Tags</legend>
                  {this.props.tagList.map((tag, i) => (
                    <div key={'tag' + this.props.index + '-' + i} className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={tag + this.props.index}
                          value={tag}
                          checked={this.state.tags.includes(tag)}
                          onChange={this.handleTags} />
                        <label
                          className="form-check-label"
                          htmlFor={tag + this.props.index}>
                          {tag}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardManager;