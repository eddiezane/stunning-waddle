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
        return image.images.fixed_height.url;
      })
      this.setState({ images })
    });
  }

  render() {

    let images = this.state.images.map((image, index) => {
      return <Image image={image} key={index}/>;
    })

    return (
      <div>
        <h1>Stunning Waddle!</h1>
        {images}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
