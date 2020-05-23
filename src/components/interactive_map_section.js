import React from 'react';
import {Button, Grid, Header as SemanticHeader, Icon} from "semantic-ui-react";
import {isMobile} from "react-device-detect";
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
}) => (
  <div style={{
    marginTop: '40px'
  }}>
    <Grid columns={3} divided>
      <Grid.Row>
        {!isMobile &&
          <Grid.Column>
            <div style={{
              paddingLeft: '20%'
            }}>
              <TravelStatsCard
                name={userObject.displayName}
                countriesBeen={countriesBeen}
              />
            </div>
          </Grid.Column>
        }

        <Grid.Column width={isMobile ? 16 : 5}>
          <SemanticHeader as='h2'>Add a Place to Your Map</SemanticHeader>

          <Autocomplete
            value={locationToAdd}
            onChange={handleTextChange}
            onSearchChange={handleInputChange}
          />

          <Grid>
            <Grid.Column width={2} />
            <Grid.Column width={6}>
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
            </Grid.Column>
            <Grid.Column width={2} />
            <Grid.Column width={5}>
              <Button onClick={handleAddLocationToDB}>
                Add <Icon name='map marker' />
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Column>

        {!isMobile &&
        <Grid.Column>
          <div style={{
            paddingTop: '5%'
          }}>
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
          </div>
        </Grid.Column>
        }
      </Grid.Row>
    </Grid>
  </div>
);

export default InteractiveMapSection;