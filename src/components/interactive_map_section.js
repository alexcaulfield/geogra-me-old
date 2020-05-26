import React from 'react';
import {Button, Grid, Header as SemanticHeader, Icon} from "semantic-ui-react";
import TravelStatsCard from "./travel_stats_card";
import Autocomplete from "./autocomplete";

const InteractiveMapSection = ({
  userObject,
  countriesBeen,
  locationToAdd,
  handleTextChange,
  handleInputChange,
  beenToButtonClicked,
  handleBeenToClick,
  wantToGoButtonClicked,
  handleWantToGoClick,
  handleAddLocationToDB,
  shouldRenderPlacesBeen,
  handleSeePlacesBeen,
  shouldRenderPlacesToGo,
  handleSeePlacesToGo,
  shouldRenderMyMap,
}) => (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column only='computer'>
          <div style={{paddingBottom: '2%'}}>
            <Grid.Row>
              <Button.Group>
                <Button
                  active={shouldRenderPlacesBeen}
                  onClick={handleSeePlacesBeen}
                >
                  Show Places Been
                </Button>
                <Button.Or text='Or' />
                <Button
                  active={shouldRenderPlacesToGo}
                  onClick={handleSeePlacesToGo}
                >
                  Show Places to Go
                </Button>
              </Button.Group>
            </Grid.Row>
          </div>
          <Grid.Row>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <TravelStatsCard
                name={shouldRenderMyMap ? 'My': `${userObject.displayName}'s`}
                countriesBeen={countriesBeen}
              />
            </div>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} widescreen={8} largeScreen={8} computer={8}>
          <SemanticHeader as='h2'>Add a Place to Your Map</SemanticHeader>
          <Autocomplete
            value={locationToAdd}
            onChange={handleTextChange}
            onSearchChange={handleInputChange}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Grid centered>
              <Grid.Row>
                <Button.Group>
                  <Button
                    active={beenToButtonClicked}
                    onClick={handleBeenToClick}
                  >
                    Been To
                  </Button>
                  <Button.Or />
                  <Button
                    active={wantToGoButtonClicked}
                    onClick={handleWantToGoClick}
                  >
                    Want To Go!
                  </Button>
                </Button.Group>
              </Grid.Row>
              <Grid.Row>
                <Button onClick={handleAddLocationToDB}>
                  Add <Icon name='map marker' />
                </Button>
              </Grid.Row>
            </Grid>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
);

export default InteractiveMapSection;