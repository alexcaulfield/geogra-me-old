import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.listOfCities[0].location}
  >
    { props.listOfCities.map((city) => (<Marker position={city.location} />)) }
  </GoogleMap>
))

export default MyMapComponent;