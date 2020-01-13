import React, {Component} from 'react';
import MyMapComponent from './map_component';
import {cities} from './../mock_data/cities';
import { Header } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';

class LandingPage extends Component {
  state = {
    locationToAdd : ''
  }
  
  render() {
    return(
      <>
        <Header as='h1'>Welcome to geogra.me</Header>

        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAP0_ajmK7u1vZUz5JwHBPDPmgxKyvP6eU&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          listOfCities={cities}
        />

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