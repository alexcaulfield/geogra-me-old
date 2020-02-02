import React, {Component} from 'react';
import MyMapComponent from './map_component';
import { Header, Dropdown, Button } from 'semantic-ui-react';
import {db} from './../fire-config'
import { USERS_COLLECTION } from './../utils'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import * as firebase from 'firebase'

class LandingPage extends Component {
  state = {
    locationToAdd: '',
    placesBeen: [],
    // pull user data from db based on email
    userDocIdentifier: this.props.userObject.email,
    beenToButtonClicked: false,
    wantToGoButtonClicked: false,
  }

  componentDidMount() {
    this.renderMapData()
  }

  renderMapData = () => {
    db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).get().then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        this.setState({
          placesBeen: data.placesBeen
        })
      } else {
        console.log(`there was an error in fetching data for user ${this.state.userDocIdentifier}`)
      }
    }).catch((error) => console.log("Error getting document:", error))
  }

  handleAddLocationToDB = () => {
    geocodeByAddress(this.state.locationToAdd)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        let objToAdd = {};
        if (this.state.beenToButtonClicked) {
          objToAdd = {
            placesBeen: firebase.firestore.FieldValue.arrayUnion({
              name: this.state.locationToAdd,
              location: {
                lat,
                lng
              }
            })
          }
        } else if(this.state.wantToGoButtonClicked) {
          objToAdd = {
            placesToGo: firebase.firestore.FieldValue.arrayUnion({
              name: this.state.locationToAdd,
              location: {
                lat,
                lng
              }
            })
          }
        }
        db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).update(objToAdd)
        .then(() => {
          this.renderMapData()
          this.setState({
            locationToAdd: ''
          })
        }).catch((error) => {
          console.log(`error saving document ${error}`)
        })
      });
  }

  handleBeenToClick = () => {
    this.setState({
      beenToButtonClicked: true,
      wantToGoButtonClicked: false,
    })
  }

  handleWantToGoClick = () => {
    this.setState({
      beenToButtonClicked: false,
      wantToGoButtonClicked: true,
    })
  }

  handleInputChange = (value) => {
    this.setState({
      locationToAdd: value
    })
  }

  handlePlaceSelect = value => {
    this.setState({
      locationToAdd: value
    })
    this.handleAddLocationToDB()
  }

  
  render() {
    const { handleLogoutClick, userObject } = this.props
    return(
      <>
        <Header as='h1'>Welcome to geogra.me {userObject.displayName}</Header>
        {/* Add user image? */}
        <Button onClick={handleLogoutClick}>Sign Out</Button>

        {this.state.placesBeen &&
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAq-bT8CcgFTuTQZjkjLCRFSawl4k9jJ_Q&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            listOfCities={this.state.placesBeen}
          />
        }


        <Header as='h2'>Where have you been?</Header>

        <PlacesAutocomplete
          value={this.state.locationToAdd}
          onChange={this.handleInputChange}
          onSelect={this.handlePlaceSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                    );
                  })}
                </div>
              </div>
          )}
        </PlacesAutocomplete>

        <Button.Group>
          <Button onClick={this.handleBeenToClick}>Been To</Button>
          <Button.Or />
          <Button onClick={this.handleWantToGoClick}>Want To Go!</Button>
        </Button.Group>
      </>
    )
  }
}

export default LandingPage;