import React from 'react'
import {Marker, InfoWindow} from "react-google-maps"
import { FaAnchor} from 'react-icons/fa'

const MapInfoWindowComponent = ({position}) => {
  return (
    <Marker position={position}>
      <InfoWindow onCloseClick={() => {}}>
        <FaAnchor />
      </InfoWindow>
    </Marker>
  )
};

export default MapInfoWindowComponent