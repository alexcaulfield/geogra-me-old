import React, {useState} from 'react';
import {Card, Checkbox, Button} from 'semantic-ui-react';

const PinFilterSelectionCard = props => {
  const [shouldShowFilterCheckboxes, setShouldShowFilterCheckboxes] = useState(false);
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 100,
        marginTop: '60px',
        marginLeft: '8px',
      }}
    >
      {!shouldShowFilterCheckboxes ? (
        <Button
          circular
          icon='filter'
          size='huge'
          color='blue'
          onClick={() => setShouldShowFilterCheckboxes(true)}
        />
      ) : (
        <Card>
          <Card.Content>
            <Card.Header>
              Select Pin Type To View
              <div style={{float: 'right'}}>
                <Button
                  basic
                  icon='close'
                  size='small'
                  onClick={() => setShouldShowFilterCheckboxes(false)}
                />
              </div>
            </Card.Header>
            <Card.Description>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{maxWidth: '40%'}}>
                  <div style={{display: 'table'}}>
                    <Checkbox label='Been To' onClick={props.setPinFilters} checked={props.pinFilters.includes('Been To')}/>
                  </div>
                  <div style={{display: 'table'}}>
                    <Checkbox label='Want To Go' onClick={props.setPinFilters} checked={props.pinFilters.includes('Want To Go')}/>
                  </div>
                  <div style={{display: 'table'}}>
                    <Checkbox label='Lived' onClick={props.setPinFilters} checked={props.pinFilters.includes('Lived')}/>
                  </div>
                </div>
                <div style={{maxWidth: '40%'}}>
                  <div style={{display: 'table'}}>
                    <Checkbox label='Family' onClick={props.setPinFilters} checked={props.pinFilters.includes('Family')}/>
                  </div>
                  <div style={{display: 'table'}}>
                    <Checkbox label='Friends' onClick={props.setPinFilters} checked={props.pinFilters.includes('Friends')}/>
                  </div>
                  <div style={{display: 'table'}}>
                    <Checkbox label='Born' onClick={props.setPinFilters} checked={props.pinFilters.includes('Born')}/>
                  </div>
                </div>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </div>

  )
}

export default PinFilterSelectionCard;