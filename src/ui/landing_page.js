import React, {Component} from 'react';
import MyMapComponent from './map_component';
import TravelStatsCard from './travel_stats_card';
import UiHeader from './header';
import Autocomplete from "./autocomplete";
import { Header, Button, Grid, Icon } from 'semantic-ui-react';
import {db} from './../fire-config'
import { USERS_COLLECTION } from './../utils'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {isMobile} from 'react-device-detect';
import * as firebase from 'firebase'

class LandingPage extends Component {
  state = {
    locationToAdd: '',
    searchQuery: '',
    placesBeen: [],
    placesToGo: [],
    countriesBeen: 0,
    // pull user data from db based on email
    userDocIdentifier: this.props.userObject.email,
    beenToButtonClicked: true,
    wantToGoButtonClicked: false,
    shouldRenderPlacesBeen: true,
    shouldRenderPlacesToGo: false,
    publicProfile: this.props.userObject.publicProfile,
  }

  componentDidMount() {
    this.renderMapData()
  }

  renderMapData = () => {
    db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).get().then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        this.setState({
          placesBeen: data.placesBeen,
          placesToGo: data.placesToGo,
          countriesBeen: data.countriesBeen.length,
        })
      } else {
        console.log(`there was an error in fetching data for user ${this.state.userDocIdentifier}`)
      }
    }).catch((error) => console.log("Error getting document:", error))
  }

  handleAddLocationToDB = () => {
    let locationObj = {}
    geocodeByAddress(this.state.locationToAdd)
      .then(results => {
        locationObj = results[0];
        return getLatLng(results[0])
      })
      .then(({ lat, lng }) => {
        let objToAdd = {};
        const locationSplit = this.state.locationToAdd.split(', ')
        const country = locationSplit[locationSplit.length - 1]
        if (this.state.beenToButtonClicked) {
          objToAdd = {
            placesBeen: firebase.firestore.FieldValue.arrayUnion({
              name: this.state.locationToAdd,
              location: {
                lat,
                lng,
              },
              placeId: locationObj.place_id,
            }),
            countriesBeen: firebase.firestore.FieldValue.arrayUnion(country),
          }
        } else if (this.state.wantToGoButtonClicked) {
          objToAdd = {
            placesToGo: firebase.firestore.FieldValue.arrayUnion({
              name: this.state.locationToAdd,
              location: {
                lat,
                lng,
              },
              placeId: locationObj.place_id,
            })
          }
        }
        db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).update(objToAdd)
        .then(() => {
          this.renderMapData()
          this.setState({
            locationToAdd: '',
            searchQuery: '',
          })
        }).catch((error) => {
          console.log(`error saving document ${error}`)
        })
      });
  }


  handleUpdateProfilePrivacy = (e) => {
    e.preventDefault()
    const currentPublicProfileSetting = this.state.publicProfile
    db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).update({
      publicProfile: !currentPublicProfileSetting
    })
      .then(response => {
        this.setState({
          publicProfile: !currentPublicProfileSetting
        })
      })
      .catch(error => console.log('unable to update user profile setting'))
  }

  deletePlace = (placeToDelete, placeToGo, placeBeen) => {
    if (placeBeen) {
      const updatedPlacesBeen = this.state.placesBeen.filter(place => place.name !== placeToDelete.name)
      db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).update({
        placesBeen: updatedPlacesBeen
      })
        .then(response => {
          this.setState({
            placesBeen: updatedPlacesBeen
          })
        })
        .catch(error => console.log(error))
    } else if (placeToGo) {
      const updatedPlacesToGo = this.state.placesToGo.filter(place => place.name !== placeToDelete.name)
      db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).update({
        placesToGo: updatedPlacesToGo
      })
        .then(response => {
          this.setState({
            placesToGo: updatedPlacesToGo
          })
        })
        .catch(error => console.log(error))
    }
  }

  moveToPlacesBeen = (placeToMove, placeToGo, placeBeen) => {
    const locationSplit = placeToMove.name.split(', ')
    const country = locationSplit[locationSplit.length - 1]
    this.deletePlace(placeToMove, placeToGo, placeBeen)
    const objToAdd = {
      placesBeen: firebase.firestore.FieldValue.arrayUnion({
        name: placeToMove.name,
        location: {
          lat: placeToMove.location.lat,
          lng: placeToMove.location.lng,
        },
        placeId: placeToMove.placeId ? placeToMove.placeId : '',
      }),
      countriesBeen: firebase.firestore.FieldValue.arrayUnion(country),
    }
    db.collection(USERS_COLLECTION).doc(this.state.userDocIdentifier).update(objToAdd)
      .then(() => {
        this.renderMapData()
      }).catch((error) => {
      console.log(`error saving document ${error}`)
    })
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

  handleTextChange = (e, { searchQuery, value }) => {
    this.setState({
      searchQuery,
      locationToAdd: value
    })
  }

  handleInputChange = (e, dropdown) => {
    this.setState({
      locationToAdd: dropdown.searchQuery
    })
  }

  
  render() {
    const { handleLogoutClick, userObject } = this.props
    return(
      <>
        <UiHeader
          name={userObject.displayName}
          photoSrc={userObject.photoURL}
          handleLogoutClick={handleLogoutClick}
          publicProfile={this.state.publicProfile}
          onClickUpdateProfilePrivacy={this.handleUpdateProfilePrivacy}
        />
        <div style={{
          marginTop: '30px'
        }}>
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAq-bT8CcgFTuTQZjkjLCRFSawl4k9jJ_Q&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `700px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            listOfCities={this.state.shouldRenderPlacesBeen ? this.state.placesBeen : this.state.placesToGo}
            shouldRenderPlacesBeen={this.state.shouldRenderPlacesBeen}
            shouldRenderPlacesToGo={this.state.shouldRenderPlacesToGo}
            deletePlace={this.deletePlace}
            moveToPlacesBeen={this.moveToPlacesBeen}
          />

          <div style={{
            marginTop: '40px'
          }}>
            <Grid columns={3} divided>
              <Grid.Row>
                {!isMobile &&
                  <Grid.Column>
                    <div style={{
                      paddingLeft: '20%'
                    }}>
                      <TravelStatsCard
                        name={userObject.displayName}
                        countriesBeen={this.state.countriesBeen}
                      />
                    </div>
                  </Grid.Column>
                }

                <Grid.Column width={isMobile ? 16 : 5}>
                  <Header as='h2'>Add a Place to Your Map</Header>

                  <Autocomplete
                    value={this.state.locationToAdd}
                    onChange={this.handleTextChange}
                    onSearchChange={this.handleInputChange}
                  />

                  <Grid>
                    <Grid.Column width={2} />
                    <Grid.Column width={6}>
                      <Button.Group>
                        <Button
                          active={this.state.beenToButtonClicked}
                          onClick={this.handleBeenToClick}
                        >
                          Been To
                        </Button>
                        <Button.Or />
                        <Button
                          active={this.state.wantToGoButtonClicked}
                          onClick={this.handleWantToGoClick}
                        >
                          Want To Go!
                        </Button>
                      </Button.Group>
                    </Grid.Column>
                    <Grid.Column width={2} />
                    <Grid.Column width={5}>
                      <Button onClick={this.handleAddLocationToDB}>
                        Add <Icon name='map marker' />
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>

                {!isMobile &&
                  <Grid.Column>
                    <div style={{
                      paddingTop: '5%'
                    }}>
                      <Button.Group>
                        <Button
                          active={this.state.shouldRenderPlacesBeen}
                          onClick={this.handleSeePlacesBeen}
                        >
                          Show Places Been
                        </Button>
                        <Button.Or text='Or' />
                        <Button
                          active={this.state.shouldRenderPlacesToGo}
                          onClick={this.handleSeePlacesToGo}
                        >
                          Show Places to Go
                        </Button>
                      </Button.Group>
                    </div>
                  </Grid.Column>
                }
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </>
    )
  }
}

export default LandingPage;