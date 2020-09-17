import React, {useState} from 'react';
import MyMapComponent from './map_component';
import {Label, Modal, Button, Icon} from 'semantic-ui-react';
import { USERS_COLLECTION, GOOGLE_MAP_URL, SITE_URL } from './../utils';
import SettingsDropdown from "./settings_dropdown";
import TravelStatsCard from "./travel_stats_card";

const MobileMapProfile = props => {
  const [addPinModalOpen, setAddPinModalOpen] = useState(false);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          marginLeft: '8px',
          marginTop: '8px',
          zIndex: 100,
        }}
      >
        <Label image size='huge'>
          <img src={props.profilePhotoSrc} />
          {props.shouldRenderMyMap ? 'My Map' : `${props.profileName}`}
        </Label>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '82vw',
          marginTop: '8px',
          zIndex: 100,
        }}
      >
        <SettingsDropdown
          handleLogoutClick={props.handleLogoutClick}
          publicProfile={props.publicProfile}
          onClickUpdateProfilePrivacy={props.onClickUpdateProfilePrivacy}
          userProfileLink={props.userProfileLink}
          username={props.username}
          renderPersonalProfileSettings={props.shouldRenderMyMap}
        />
      </div>
      <MyMapComponent
        isMarkerShown
        googleMapURL={GOOGLE_MAP_URL}
        loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%`}} />}
        mapElement={<div style={{ height: `100vh`, width: `100vw` }} />}
        listOfCities={props.listOfCities}
        shouldRenderPlacesBeen={props.shouldRenderPlacesBeen}
        shouldRenderPlacesToGo={props.shouldRenderPlacesToGo}
        deletePlace={props.deletePlace}
        moveToPlacesBeen={props.moveToPlacesBeen}
        mapCenter={props.mapCenter}
        shouldRenderUpdateButtons
      />
      <div
        style={{
          position: 'absolute',
          marginLeft: '12px',
          top: '80vh',
          width: '40vw',
          zIndex: 100,
        }}
      >
        <TravelStatsCard
          name={props.shouldRenderMyMap ? 'My': `${props.profileName}'s`}
          countriesBeen={props.countriesBeen}
        />
      </div>
        <Modal
          size='tiny'
          onClose={() => setAddPinModalOpen(false)}
          onOpen={() => setAddPinModalOpen(true)}
          open={addPinModalOpen}
          trigger={
            <div
              style={{
                position: 'absolute',
                top: '85vh',
                right: '25vw',
                zIndex: 100,
                width: '25px'
              }}
            >
              <Button circular size='huge'>
                Add Pin
              </Button>
            </div>
          }
        >
          <Modal.Header>Add a Pin to your map!</Modal.Header>
          <Modal.Content>
            <p>Where would you like to add?</p>
          </Modal.Content>
        </Modal>
    </>
  )
}

export default MobileMapProfile;
