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
      let images = json.data.map(image => {
        let id = image.id;
        let url = image.images.fixed_height.url;
        return { id, url }
      });

      return new Promise((resolve, reject) => {
        let promises = [];

        images.forEach(image => {
          promises.push(this.getImageScore(image.id));
        });

        Promise.all(promises)
        .then(scores => {
          scores.forEach(score => {
            images.forEach(image => {
              if (image.id == score.id) {
                image.score = score.score;
              }
            });
          });
          resolve(images);
        });
      });
    })
    .then(images => {
      this.setState({ images });
    })
  }

  getImageScore(id) {
    return new Promise((resolve, reject) => {
      // TODO: Don't hard code this
      // fetch(`http://localhost:3000/api/score?id=${id}`)
      fetch(`http://ez-api.ngrok.io/api/score?id=${id}`)
        .then(res => res.json())
        .then(json => {
          resolve(json);
        })
        .catch(err => reject(err));
    });
  }

  handleUpdateScore = ({id, score}) => {
    let images = this.state.images.map(image => {
      if (image.id == id) {
        return {...image, score};
      } else {
        return image;
      }
    });

    this.setState({ images });
  }

  render() {
    
    let images = this.state.images;

    images = images.sort((a, b) => {
      return b.score - a.score;
    })

    let sortedImages = images.map((image, index) => {
      return <Image {...image} key={index} handleUpdateScore={this.handleUpdateScore} />;
    });

    return (
      <div>
        <h1>Stunning Waddle!</h1>
        {sortedImages}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
