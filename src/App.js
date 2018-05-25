import React, { Component } from 'react';
import Routes from './routes';
import { Header } from './shared/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Header/>

        <Routes/>

      </div>
    );
  }
}


export default App;
