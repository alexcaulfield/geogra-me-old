import React, {Component} from 'react';
import './App.css';
import LandingPage from './components/landing_page'
import LoginPage from './components/login'
import LoadingPage from './components/loading_page'
import Footer from "./components/footer"
import {fireApp, db} from './fire-config'
import * as firebase from 'firebase'
import { USERS_COLLECTION } from './utils'

class App extends Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: {},
  }
  
  componentDidMount() {
    fireApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoggedIn: true,
          isLoading: false,
          user
        })
      } else {
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  createUsername = (displayName) => {
    return displayName.split(' ')[0] + Math.floor((Math.random() * 100000) + 1);
  }

  handleSignInButtonClick = e => {
    e.preventDefault()
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    fireApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      fireApp.auth().signInWithPopup(googleProvider).then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        this.setState({
          isLoggedIn: true,
          isLoading: false,
          user
        })
        // insert user into DB if they don't already exist
        const docRef = db.collection(USERS_COLLECTION).doc(user.email)
        docRef.get().then((doc) => {
          if (!doc.exists) {
            // insert into user collection
            docRef.set({
              name: user.displayName,
              email: user.email,
              username: this.createUsername(user.displayName),
              placesBeen: [],
              placesToGo: [],
              countriesBeen: [],
              publicProfile: false,
            })
          }
        }).catch((error) => console.log("Error getting document:", error))
      }).catch(function(error) {
        const {code, message, email} = error
        console.log(`Error logging in with code ${code} for user ${email} with message ${message}`)
      });
    })
  }

  handleSignOutButtonClick = e => {
    e.preventDefault()
    fireApp.auth().signOut().then(() => {
      this.setState({
        isLoggedIn: false,
        user: {}
      })
    }).catch(function(error) {
      console.log(error)
    });
  }

  componentToRender = () => {
    const {
      isLoggedIn,
      isLoading,
      user,
    } = this.state;

    if (isLoading) {
      return <LoadingPage />
    } else if (isLoggedIn && !!user) {
      return (
        <LandingPage
          userObject={user}
          handleLogoutClick={e => this.handleSignOutButtonClick(e)}
        />
      );
    } else {
      return (
        <LoginPage
          handleLoginClick={e => this.handleSignInButtonClick(e)}
        />
      )
    }
  }

  render() {
    return (
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
          {this.componentToRender()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
