import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import {cities} from './../mock_data/cities';
import { getRandomCityLocation } from './../utils'
import MapInfoWindowComponent from './map_info_window_component'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.listOfCities.length > 0 ? props.listOfCities[0].location : getRandomCityLocation(cities)}
  >
    { props.listOfCities.map((city) => (<MapInfoWindowComponent city={city} />)) }
  </GoogleMap>
))

export default MyMapComponent;