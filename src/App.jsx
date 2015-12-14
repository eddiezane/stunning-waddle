import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './Image.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { images: [] };
  }

  componentWillMount() {
    fetch('http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=penguins')
    .then(res => res.json())
    .then(json => {
      let images = {};
      json.data.map(image => {
        let id = image.id;
        let url = image.images.fixed_height.url;
        images[id] = {id, url};
      });

      return Promise.all(Object.keys(images).map(imageId => {
        return this.getImageScore(imageId).then(scoreJson => {
          images[imageId].score = scoreJson.score;
        });
      }))
      .then(() => Object.keys(images).map(id => images[id]));
    })
    .then(images => {
      console.log(images);
      this.setState({ images });
    });
  }

  getImageScore(id) {
    return new Promise((resolve, reject) => {
      // TODO: Don't hard code this
      fetch(`http://localhost:3000/api/score?id=${id}`)
        .then(res => res.json())
        .then(json => {
          resolve(json);
        })
        .catch(err => reject(err));
    });
  }

  render() {

    let images = this.state.images.map((image, index) => {
      return <Image {...image} key={index}/>;
    });

    return (
      <div>
        <h1>Stunning Waddle!</h1>
        {images}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
