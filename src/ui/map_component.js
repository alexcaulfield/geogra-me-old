import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {cities} from './../mock_data/cities';
import { getRandomCityLocation } from './../utils'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.listOfCities.length > 0 ? props.listOfCities[0].location : getRandomCityLocation(cities)}
  >
    { props.listOfCities.map((city) => (<Marker position={city.location} />)) }
  </GoogleMap>
))

export default MyMapComponent;