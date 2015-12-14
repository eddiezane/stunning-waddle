import React, { Component } from 'react';

function vote(type, id) {
  let method = undefined;

  if (type === 'INC') {
    method = 'upvote';
  } else if (type === 'DEC') {
    method = 'downvote';
  }

  // TODO: Don't hardcode this
  fetch('http://localhost:3000/api/' + method, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id)
  })
  .then(res => res.json())
  .then(json => console.log(json));
}

export default ({ id, url, score }) => {
  return (
    <div>
      <p>Score: {score ? score : 0}</p>
      <button onClick={() => vote('INC', {id})}>+</button>
      <button onClick={() => vote('DEC', {id})}>-</button>
      <img src={url} />
    </div>
  );
}
