import React, {Component} from 'react';
import MyMapComponent from './map_component';
import {cities} from './../mock_data/cities';
import { Header } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';
import { Button } from 'semantic-ui-react'
import {fireApp, db} from './../fire-config'
import { USERS_COLLECTION } from './../utils'

class LandingPage extends Component {
  state = {
    locationToAdd: '',
    placesBeen: [],
    // pull user data from db based on email
    userDocIdentifier: this.props.userObject.email
  }

  componentDidMount() {
    db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).get().then((doc) => {
      if (doc.exists) {
        this.setState({
          placesBeen: doc.data().placesBeen
        })
      } else {
        console.log(`there was an error in fetching data for user ${this.state.userDocIdentifier}`)
      }
    }).catch((error) => console.log("Error getting document:", error))
  }
  
  render() {
    const { handleLogoutClick, userObject } = this.props
    console.log(userObject) 
    console.log(this.state.placesBeen)
    return(
      <>
        <Header as='h1'>Welcome to geogra.me {userObject.displayName}</Header>
        {/* Add user image? */}
        <Button onClick={handleLogoutClick}>Sign Out</Button>

        {this.state.placesBeen &&
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAP0_ajmK7u1vZUz5JwHBPDPmgxKyvP6eU&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            listOfCities={cities}
          />
        }


        <Header as='h2'>Where have you been?</Header>

        <Autocomplete
          style={{width: '90%'}}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
          types={['(regions)']}
        />
      </>
    )
  }
}

export default LandingPage;