import React from 'react';
import { Card, Statistic, Icon } from 'semantic-ui-react';

const TravelStatsCard = ({name, countriesBeen}) => (
  <Card>
    <Card.Content>
      <Card.Header>Stats for {name}</Card.Header>
      <Card.Description>
        <Statistic>
          <Statistic.Value>{countriesBeen}</Statistic.Value>
          <Statistic.Label>
            <Icon name='flag'/>{countriesBeen === 1 ? 'Country' : 'Countries'}
          </Statistic.Label>
        </Statistic>
      </Card.Description>
    </Card.Content>
  </Card>
);

export default TravelStatsCard;