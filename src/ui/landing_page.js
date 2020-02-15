import React, {Component} from 'react';
import MyMapComponent from './map_component';
import TravelStatsCard from './travel_stats_card';
import { Header, Dropdown, Button } from 'semantic-ui-react';
import {db} from './../fire-config'
import { USERS_COLLECTION } from './../utils'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import * as firebase from 'firebase'

class LandingPage extends Component {
  state = {
    locationToAdd: '',
    placesBeen: [],
    placesToGo: [],
    // pull user data from db based on email
    userDocIdentifier: this.props.userObject.email,
    beenToButtonClicked: false,
    wantToGoButtonClicked: false,
    shouldRenderPlacesBeen: true,
    shouldRenderPlacesToGo: false,
    countries: []
  }

  componentDidMount() {
    this.renderMapData()
    this.getCountryData()
  }

  renderMapData = () => {
    db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).get().then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        this.setState({
          placesBeen: data.placesBeen,
          placesToGo: data.placesToGo,
        })
      } else {
        console.log(`there was an error in fetching data for user ${this.state.userDocIdentifier}`)
      }
    }).catch((error) => console.log("Error getting document:", error))
  }

  getCountryData = () => {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => {
          return response.json()
        }).then(response => {
          this.setState({
            countries: response.map(country => country.name)
          })
    })
  }

  getCountryNumber = () => {
    return 20;
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

  handleSeePlacesToGo = () => {
    this.setState({
      shouldRenderPlacesBeen: false,
      shouldRenderPlacesToGo: true,
    })
  }

  handleSeePlacesBeen = () => {
    this.setState({
      shouldRenderPlacesBeen: true,
      shouldRenderPlacesToGo: false,
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

        <Button.Group>
          <Button positive onClick={this.handleSeePlacesBeen}>Show Places Been</Button>
          <Button.Or text='Or' />
          <Button onClick={this.handleSeePlacesToGo}>Show Places to Go</Button>
        </Button.Group>

        {this.state.placesBeen &&
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAq-bT8CcgFTuTQZjkjLCRFSawl4k9jJ_Q&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            listOfCities={this.state.shouldRenderPlacesBeen ? this.state.placesBeen : this.state.placesToGo}
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

        <TravelStatsCard
          name={userObject.displayName}
          dateJoined={userObject.signUpDate}
          countriesBeen={this.getCountryNumber()}
        />
      </>
    )
  }
}

export default LandingPage;