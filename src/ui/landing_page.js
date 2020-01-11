import React, {Component} from 'react';
import MyMapComponent from './map_component';
import {cities} from './../mock_data/cities';
import { Text } from "@chakra-ui/core";
import Autocomplete from 'react-google-autocomplete';

class LandingPage extends Component {
  state = {
    locationToAdd : ''
  }
  
  render() {
    return(
      <>
        <Text fontSize="4xl">Welcome to geogra.me</Text>

        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAP0_ajmK7u1vZUz5JwHBPDPmgxKyvP6eU&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          listOfCities={cities}
        />

        <Text fontSize="4xl">Where have you been?</Text>

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