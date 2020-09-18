import React from 'react';
import {Button, Dropdown, Icon, Modal} from "semantic-ui-react";
import Autocomplete from "./autocomplete";

const PIN_LIST_OPTIONS = [
  {
    key: 'Been To',
    text: 'Been To',
    value: 'Been To',
  },
  {
    key: 'Want To Go',
    text: 'Want To Go',
    value: 'Want To Go',
  },
  {
    key: 'Lived',
    text: 'Lived',
    value: 'Lived',
  },
  {
    key: 'Family',
    text: 'Family',
    value: 'Family',
  },
  {
    key: 'Friends',
    text: 'Friends',
    value: 'Friends',
  },
  {
    key: 'Born',
    text: 'Born',
    value: 'Born',
  },
]

const AddPinContainer = props => {
  return (
    <Modal
      size='tiny'
      onClose={() => props.setAddPinModalOpen(false)}
      onOpen={() => props.setAddPinModalOpen(true)}
      open={props.addPinModalOpen}
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
          <Button circular size='huge' color='green'>
            Add Pin
          </Button>
        </div>
      }
    >
      <Modal.Header>Add a Pin to your map!</Modal.Header>
      <Modal.Content>
        <div>
          <p>Where would you like to add?</p>
          <Autocomplete
            value={props.locationToAdd}
            onChange={props.handleTextChange}
            onSearchChange={props.handleInputChange}
          />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{minWidth: '60%', display: 'inline-flex'}}>
              <Dropdown
                placeholder='Pin Label'
                fluid
                selection
                options={PIN_LIST_OPTIONS}
                onChange={props.handlePinLabelSelect}
              />
            </div>
            <div style={{ display: 'inline-flex'}}>
              <Button onClick={props.handleAddLocationToDB}>
                Add <Icon name='map marker' />
              </Button>
            </div>
          </div>

        </div>
      </Modal.Content>
    </Modal>
  )
}

export default AddPinContainer