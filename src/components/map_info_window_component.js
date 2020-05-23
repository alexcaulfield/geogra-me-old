import React, {useState} from 'react'
import {Marker, InfoWindow} from "react-google-maps"
import { Card, Button, Image } from 'semantic-ui-react'

const splitCity = fullName => {
  const namePieces = fullName.split(', ')
  if (namePieces.length > 1) {
    return [namePieces[0], namePieces[namePieces.length - 1]]
  }
  return [fullName, '']
}

const InfoWindowCard = ({city, country, deletePlace, cityObj, imgUrl, isPlaceToGo, isPlaceBeen, moveToPlacesBeen, setIsOpen}) => (
  <Card>
    <Card.Content>
      <Card.Header>{city}</Card.Header>
      {!!country && <Card.Meta>{country}</Card.Meta>}
      <Card.Description style={{paddingBottom: '10px'}}>
        {!!imgUrl && (
          <Image src={imgUrl} wrapped rounded size='medium' />
        )}
      </Card.Description>
      <Card.Content extra>
        <div style={{paddingBottom: '10px'}}>
          <Button content='Delete this place' icon='delete' onClick={() => {
            deletePlace(cityObj, isPlaceToGo, isPlaceBeen)
            setIsOpen(false)
          }} />
        </div>
        {isPlaceToGo && (
          <Button content="I've been to this place!" icon='check' onClick={() => moveToPlacesBeen(cityObj, isPlaceToGo, isPlaceBeen)} />
        )}
      </Card.Content>
    </Card.Content>
  </Card>
);

const MapInfoWindowComponent = ({city, deletePlace, shouldRenderPlacesBeen, shouldRenderPlacesToGo, moveToPlacesBeen}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityName, country] = splitCity(city.name)
  const [locationImageUrl, setLocationImageUrl] = useState('')

  const getPlaceData = () => {
    setIsOpen(true)
    if (city.placeId) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: city.location
      });
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails({
        placeId: city.placeId,
      }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setLocationImageUrl(place.photos[0].getUrl())
        }
      })
    }
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
            imgUrl={locationImageUrl}
            isPlaceToGo={shouldRenderPlacesToGo}
            isPlaceBeen={shouldRenderPlacesBeen}
            moveToPlacesBeen={moveToPlacesBeen}
            setIsOpen={setIsOpen}
          />
        </InfoWindow>
      )}
    </Marker>
  )
};

export default MapInfoWindowComponent