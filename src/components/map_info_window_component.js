import React, {useState} from 'react'
import {Marker, InfoWindow} from "react-google-maps"
import { Card, Button, Image, Label } from 'semantic-ui-react'

const PIN_URLS = {
  'Been To': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'Want To Go': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  'Lived': 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  'Family': 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
  'Friends': 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  'Born': '',
}

const splitCity = fullName => {
  const namePieces = fullName.split(', ')
  if (namePieces.length > 1) {
    return [namePieces[0], namePieces[namePieces.length - 1]]
  }
  return [fullName, '']
}

const InfoWindowCard = ({city, country, deletePlace, cityObj, imgUrl, isPlaceToGo, isPlaceBeen, moveToPlacesBeen, setIsOpen, shouldRenderUpdateButtons}) => (
  <Card>
    <Card.Content>
      <Card.Header>{city}</Card.Header>
      {!!country && <Card.Meta>{country}</Card.Meta>}
      <Card.Description style={{paddingBottom: '10px'}}>
        {!!imgUrl && (
          <Image src={imgUrl} wrapped rounded size='medium' />
        )}
        {!!cityObj.label && (
          <Label>
            {cityObj.label}
          </Label>
        )}
        {!!cityObj.monthVisited && !!cityObj.yearVisited && (
          <Label>
            {cityObj.monthVisited} {cityObj.yearVisited}
          </Label>
        )}
        {!!cityObj.comment && (
          <p>{cityObj.comment}</p>
        )}
      </Card.Description>
      {shouldRenderUpdateButtons &&
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
      }
    </Card.Content>
  </Card>
);

const MapInfoWindowComponent = ({city, deletePlace, shouldRenderPlacesBeen, shouldRenderPlacesToGo, moveToPlacesBeen, shouldRenderUpdateButtons}) => {
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
          if (place.photos) {
            setLocationImageUrl(place.photos[0].getUrl())
          }
        }
      })
    }
  }

  return (
    <Marker
      position={city.location}
      onClick={getPlaceData}
      icon={PIN_URLS[city.label]}
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
            shouldRenderUpdateButtons={shouldRenderUpdateButtons}
          />
        </InfoWindow>
      )}
    </Marker>
  )
};

export default MapInfoWindowComponent