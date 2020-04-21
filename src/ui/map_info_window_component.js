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

const InfoWindowCard = ({city, country}) => (
  <Card>
    <Card.Content>
      <Card.Header>{city}</Card.Header>
      {country && <Card.Meta>{country}</Card.Meta>}
      <Card.Description>
        This is a fun place to go
      </Card.Description>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button content='Delete this place' icon='delete' labelPosition='left' onClick={() => {}} />
        </div>
      </Card.Content>
    </Card.Content>
  </Card>
);

const MapInfoWindowComponent = ({city}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityName, country] = splitCity(city.name)
  const getPlaceData = () => {
    let queryCityName = '';
    const cityNameWithSpaces = cityName.split(' ')
    if (cityNameWithSpaces.length === 1) {
      queryCityName = cityNameWithSpaces[0]
    } else {
      queryCityName = cityNameWithSpaces.reduce((query, name) => {
        return query + name + '%20';
      }, '')
    }
    console.log(queryCityName)
    fetch(`https://api.teleport.org/api/cities/?search=${queryCityName}`, {
      headers: {
        Accept: "application/vnd.teleport.v1+json"
      }
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
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
          />
        </InfoWindow>
      )}
    </Marker>
  )
};

export default MapInfoWindowComponent