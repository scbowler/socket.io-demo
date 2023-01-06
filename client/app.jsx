import React from 'react';
import Home from './pages/home-class';
// import Home from './pages/home-hooks';

export default class App extends React.Component {
  render() {
    return <Home name="Jim Bob" />;
  }
}
