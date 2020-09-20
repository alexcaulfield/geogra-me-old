import React, {Component} from 'react';
import {db} from './../fire-config'
import { USERS_COLLECTION } from './../utils'
import ErrorMessage from "./error_message";
import {Link, withRouter} from "react-router-dom";
// import {GOOGLE_MAP_URL} from './../utils';
// import Header from "./header";
import LoadingPage from "./loading_page";
// import MyMapComponent from "./map_component";
// import TravelStatsCard from './travel_stats_card';
import {Button, Icon} from 'semantic-ui-react';
import BasicHeader from "./basic_header";
import FluidMapProfile from './fluid_map_profile';

class GeneralProfile extends Component {
  state = {
    profileId: this.props.userId,
    publicProfile: false,
    isLoading: true,
    userExists: false,
    profileName: '',
    placesBeen: [],
    placesToGo: [],
    countriesBeen: 0,
    mapCenter: { // default to Boston
      lat: 42.3601,
      lng: -71.0589
    },
    pinFilters: [],
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    db.collection(USERS_COLLECTION).where("username", "==", this.state.profileId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          this.setState({
            isLoading: false,
          })
        }
        const _thisRef = this;
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          if (_thisRef.props.currentUser.email === data.email) {
            _thisRef.props.history.push('/profile');
          }
          if (data.publicProfile) {
            const newCenter = data.placesBeen.length > 0 ? data.placesBeen[0].location : _thisRef.state.mapCenter;
            console.log(data)
            _thisRef.setState({
              profileName: data.name,
              placesBeen: data.placesBeen,
              placesToGo: data.placesToGo,
              countriesBeen: data.countriesBeen.length,
              mapCenter: newCenter,
              userExists: data.username === _thisRef.state.profileId,
              isLoading: false,
              publicProfile: data.publicProfile,
            })
          } else {
            _thisRef.setState({
              userExists: data.username === _thisRef.state.profileId,
              isLoading: false,
            })
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        this.setState({
          isLoading: false,
        })
      });
  };

  setPinFilters = (e, checkbox) => {
    if (checkbox.checked) {
      this.setState(prevState => {
        return {
          pinFilters: [...prevState.pinFilters, checkbox.label]
        }
      })
    } else {
      this.setState(prevState => {
        return {
          pinFilters: prevState.pinFilters.filter(pinFilter => pinFilter !== checkbox.label)
        }
      })
    }
  }

  filterPlaces = () => {
    if (this.state.pinFilters.length === 0) {
      return [...this.state.placesBeen, ...this.state.placesToGo]
    }
    const placesBeen = this.state.placesBeen.filter(place => this.state.pinFilters.includes(place.label))
    const placesToGo = this.state.placesToGo.filter(place => this.state.pinFilters.includes(place.label))
    return [...placesBeen, ...placesToGo]
  }

  renderPageComponent = () => {
    if (Object.keys(this.props.currentUser).length === 0) {
      return (
        <>
          <BasicHeader />
          <ErrorMessage
            header='You must be logged in to access this page'
            message={
              <div style={{
                marginTop: '10px'
              }}>
                <Button
                  icon
                  labelPosition='left'
                  onClick={(e) => this.props.handleLoginClick(e, this.state.profileId)}
                >
                  <Icon name='google' />
                  Sign in with Google
                </Button>
              </div>
            }
          />
        </>
      )
    } else if (!this.state.userExists) {
      return (
        <>
          <BasicHeader />
          <ErrorMessage
            header='User does not exist'
            message={
              <>
                We couldn't find any information on this user. Please visit our {<Link to='/'>homepage</Link>}!
              </>
            }
          />
        </>
      )
    } else if (!this.state.publicProfile) {
      return (
        <>
          <BasicHeader />
          <ErrorMessage
            header='Private Profile'
            message={
              <>
                This user's profile is private, please contact them to make their profile public. Please visit our {<Link to='/'>homepage</Link>}!
              </>
            }
          />
        </>
      );
    } else if (this.state.publicProfile) {
      console.log(this.props.currentUser)
      return (
        <FluidMapProfile
          profileName={this.state.profileName}
          username={this.props.currentUser.email}
          handleLogoutClick={this.props.handleLogoutClick}
          publicProfile={this.state.publicProfile}
          onClickUpdateProfilePrivacy={this.handleUpdateProfilePrivacy}
          userProfileLink={this.state.userProfileLink}
          shouldRenderMyMap={false}
          listOfCities={this.filterPlaces()}
          shouldRenderPlacesBeen={this.state.shouldRenderPlacesBeen}
          shouldRenderPlacesToGo={this.state.shouldRenderPlacesToGo}
          deletePlace={this.deletePlace}
          moveToPlacesBeen={this.moveToPlacesBeen}
          mapCenter={this.state.mapCenter}
          countriesBeen={this.state.countriesBeen}
          shouldRenderUpdateButtons={false}
          setPinFilters={this.setPinFilters}
          pinFilters={this.state.pinFilters}
        />
        // <Grid>
        //   <Grid.Row>
        //     <Container>
        //       <Header
        //         name={this.props.currentUser.displayName}
        //         photoSrc={this.props.currentUser.photoURL}
        //         profileName={this.state.profileName}
        //         handleLogoutClick={this.props.handleLogoutClick}
        //         shouldRenderMyMap={false}
        //       />
        //     </Container>
        //   </Grid.Row>
        //   <Grid.Row>
        //     <MyMapComponent
        //       isMarkerShown
        //       googleMapURL={GOOGLE_MAP_URL}
        //       loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
        //       containerElement={<div style={{ height: `60vh`, width: `100vw`, marginLeft: `calc(-50vw + 50%)`, paddingTop: `1px` }} />}
        //       mapElement={<div style={{ height: `100%`, width: `100%` }} />}
        //       listOfCities={this.state.placesBeen}
        //       shouldRenderPlacesBeen
        //       mapCenter={this.state.mapCenter}
        //       shouldRenderUpdateButtons={false}
        //     />
        //   </Grid.Row>
        //   <Grid.Row centered>
        //     <TravelStatsCard
        //       name={`${this.state.profileName}'s`}
        //       countriesBeen={this.state.countriesBeen}
        //     />
        //   </Grid.Row>
        // </Grid>
      )
    }
  };

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <LoadingPage />
        ): (
          this.renderPageComponent()
        )}
      </>
    )
  }
}

export default withRouter(GeneralProfile);