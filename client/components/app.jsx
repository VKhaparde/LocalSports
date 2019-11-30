
import React from 'react';
import Header from './header';
import Footer from './footer';
import GoogleMaps from './google-maps';
// import Favorites from './favorites';
import Favorites from './favorites';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    const test = 'soccer';
    this.userSearch(test);
  }

  userSearch(test) {
    fetch('/api/search')
      .then(json => json.json())
      .then(data => this.setState({
        events: data
      }))
      .catch(error => console.error('Error', error));
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Switch />
          <Route path='/search' exact
            component={() => <GoogleMaps props={this.state.search}/>}/>
          <Favorites />
          <Footer events={this.state}/>
        </div>
      </Router>
    );
  }
}
