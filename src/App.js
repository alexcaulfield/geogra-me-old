import React, {useState, useEffect} from 'react';
import './App.css';
import LandingPage from './ui/landing_page'
import LoginPage from './ui/login'
import Footer from "./ui/footer"
import {fireApp, db} from './fire-config'
import * as firebase from 'firebase'
import { USERS_COLLECTION } from './utils'
import {
  Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    fireApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setUser(user)
      }
    })
  }, [])

  const createUsername = (displayName) => {
    return displayName.split(' ')[0] + Math.floor((Math.random() * 100000) + 1);
  }

  const handleSignInButtonClick = e => {
    e.preventDefault()
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    fireApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      fireApp.auth().signInWithPopup(googleProvider).then(result => {
        // The signed-in user info.
        var user = result.user;
        setIsLoggedIn(true)
        setUser(user)
        history.push('/profile')
        // insert user into DB if they don't already exist
        const docRef = db.collection(USERS_COLLECTION).doc(user.email)
        docRef.get().then((doc) => {
          if (!doc.exists) {
            // insert into user collection
            docRef.set({
              name: user.displayName,
              email: user.email,
              username: createUsername(user.displayName),
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

  const handleSignOutButtonClick = e => {
    e.preventDefault()
    fireApp.auth().signOut().then(() => {
      setIsLoggedIn(false)
      setUser({})
    }).catch(function(error) {
      console.log(error)
    });
  }

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
        <Router history={history}>
          <Switch>
            <Route
              path='/'
              exact
            >
              <LoginPage handleLoginClick={e => handleSignInButtonClick(e)} />
            </Route>
            <Route
              path='/profile'
              render={() => 
                isLoggedIn ? (
                  <LandingPage
                    userObject={user}
                    handleLogoutClick={e => handleSignOutButtonClick(e)}
                  />
                ) : (
                  <Redirect to={{ pathname: "/", }} />
                )
              }
            />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
