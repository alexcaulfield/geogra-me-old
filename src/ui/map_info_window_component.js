import React, {useState} from 'react'
import {Marker, InfoWindow} from "react-google-maps"
import { Card, Button } from 'semantic-ui-react'

const splitCity = fullName => {
  const namePieces = fullName.split(', ')
  if (namePieces.length > 1) {
    return [namePieces[0], namePieces[namePieces.length - 1]]
  }
  return [fullName, '']
}

const InfoWindowCard = ({city, country, deletePlace, cityObj}) => (
  <Card>
    <Card.Content>
      <Card.Header>{city}</Card.Header>
      {country && <Card.Meta>{country}</Card.Meta>}
      <Card.Description>
        This is a fun place to go
      </Card.Description>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button content='Delete this place' icon='delete' onClick={() => deletePlace(cityObj)} />
        </div>
      </Card.Content>
    </Card.Content>
  </Card>
);

const MapInfoWindowComponent = ({city, deletePlace}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityName, country] = splitCity(city.name)

  const getPlaceData = () => {
    setIsOpen(true)
  }

  return (
    <Marker
      position={city.location}
      onClick={getPlaceData}
    >
      {isOpen && (
        <InfoWindow onCloseClick={() => {setIsOpen(false)}}>
          <InfoWindowCard
            city={cityName}
            country={country}
            deletePlace={deletePlace}
            cityObj={city}
          />
        </InfoWindow>
      )}
    </Marker>
  )
};

export default MapInfoWindowComponent