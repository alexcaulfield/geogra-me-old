import React from 'react';
import {Button, Dropdown, Icon, Modal, Form, TextArea } from "semantic-ui-react";
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

const MONTHS = [
  {
    key: 'January',
    text: 'January',
    value: 'January',
  },
  {
    key: 'February',
    text: 'February',
    value: 'February',
  },
  {
    key: 'March',
    text: 'March',
    value: 'March',
  },
  {
    key: 'April',
    text: 'April',
    value: 'April',
  },
  {
    key: 'May',
    text: 'May',
    value: 'May',
  },
  {
    key: 'June',
    text: 'June',
    value: 'June',
  },
  {
    key: 'July',
    text: 'July',
    value: 'July',
  },
  {
    key: 'August',
    text: 'August',
    value: 'August',
  },
  {
    key: 'September',
    text: 'September',
    value: 'September',
  },
  {
    key: 'October',
    text: 'October',
    value: 'October',
  },
  {
    key: 'November',
    text: 'November',
    value: 'November',
  },
  {
    key: 'December',
    text: 'December',
    value: 'December',
  },
]

const YEARS = [
  {
    key: 2020,
    text: 2020,
    value: 2020,
  },
  {
    key: 2019,
    text: 2019,
    value: 2019,
  },
  {
    key: 2018,
    text: 2018,
    value: 2018,
  },
  {
    key: 2017,
    text: 2017,
    value: 2017,
  },
  {
    key: 2016,
    text: 2016,
    value: 2016,
  },
  {
    key: 2015,
    text: 2015,
    value: 2015,
  },
  {
    key: 2014,
    text: 2014,
    value: 2014,
  },
  {
    key: 2013,
    text: 2013,
    value: 2013,
  },
  {
    key: 2012,
    text: 2012,
    value: 2012,
  },
  {
    key: 2011,
    text: 2011,
    value: 2011,
  },
  {
    key: 2010,
    text: 2010,
    value: 2010,
  },
  {
    key: 2009,
    text: 2009,
    value: 2009,
  },
  {
    key: 2008,
    text: 2008,
    value: 2008,
  },
  {
    key: 2007,
    text: 2007,
    value: 2007,
  },
  {
    key: 2006,
    text: 2006,
    value: 2006,
  },
  {
    key: 2005,
    text: 2005,
    value: 2005,
  },
  {
    key: 2004,
    text: 2004,
    value: 2004,
  },
  {
    key: 2003,
    text: 2003,
    value: 2003,
  },
  {
    key: 2002,
    text: 2002,
    value: 2002,
  },
  {
    key: 2001,
    text: 2001,
    value: 2001,
  },
  {
    key: 2000,
    text: 2000,
    value: 2000,
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
            top: '75vh',
            right: '100px',
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
          <div style={{marginBottom: '8px'}}>
            <Form>
              <TextArea placeholder='Write a comment about this place' onChange={props.handleSetComment} />
            </Form>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
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
          {props.displayDateVisited && (
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{minWidth: '48%', display: 'inline-flex'}}>
                <Dropdown
                  placeholder='Month Visited'
                  fluid
                  selection
                  options={MONTHS}
                  onChange={props.handleMonthSelect}
                />
              </div>
              <div style={{minWidth: '48%', display: 'inline-flex'}}>
                <Dropdown
                  placeholder='Year Visited'
                  fluid
                  selection
                  options={YEARS}
                  onChange={props.handleYearSelect}
                />
              </div>
            </div>
          )}
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default AddPinContainer