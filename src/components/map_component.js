import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import MapInfoWindowComponent from './map_info_window_component'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <div id='map'>
    <GoogleMap
      defaultZoom={8}
      center={props.mapCenter}
    >
      { props.listOfCities.map((city) => (
        <MapInfoWindowComponent
          city={city}
          deletePlace={props.deletePlace}
          shouldRenderPlacesBeen={props.shouldRenderPlacesBeen}
          shouldRenderPlacesToGo={props.shouldRenderPlacesToGo}
          moveToPlacesBeen={props.moveToPlacesBeen}
          shouldRenderUpdateButtons={props.shouldRenderUpdateButtons}
        />
        )) }
    </GoogleMap>
  </div>
));

export default MyMapComponent;