import React from 'react';
import './App.css';
import Footer from './components/footer';
import { BrowserRouter as Router} from 'react-router-dom';
import AppRouting from "./components/app_routing";

const App = () => (
  <div
    className="App"
    style={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    }}
  >
    <div style={{
      flex: 1,
    }}>
      <Router>
        <AppRouting />
      </Router>
    </div>
    <Footer />
  </div>
);

export default App;
