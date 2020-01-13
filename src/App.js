import React, {Component} from 'react';
import './App.css';
import LandingPage from './ui/landing_page'
import LoginPage from './ui/login'

class App extends Component {
  state = {
    isLoggedIn: false
  }
  
  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? <LandingPage /> : <LoginPage />}
      </div>
    );
  }
}

export default App;
