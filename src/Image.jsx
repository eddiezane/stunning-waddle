import React, { Component } from 'react';

export default class Image extends Component {
  vote = (type, id) => {
    let handleUpdateScore = this.props.handleUpdateScore;
    let method = undefined;

    if (type === 'INC') {
      method = 'upvote';
    } else if (type === 'DEC') {
      method = 'downvote';
    }

    // TODO: Don't hardcode this
    // fetch('http://localhost:3000/api/' + method, {
    fetch(`http://ez-api.ngrok.io/api/${method}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      handleUpdateScore(json);
    });
  }

  render() {
    let { id, url, score } = this.props;

    return (
      <div>
        <p>Score: {score ? score : 0}</p>
        <button onClick={() => this.vote('INC', {id})}>+</button>
        <button onClick={() => this.vote('DEC', {id})}>-</button>
        <img src={url} />
      </div>
    );
  }
}
