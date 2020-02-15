import React from 'react'
import { Card } from 'semantic-ui-react'

const TravelStatsCard = ({name, dateJoined, countriesBeen}) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{name} has been on Geogra.me since {dateJoined}</Card.Meta>
                <Card.Description>
                    {name} has been to {countriesBeen} countries!
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default TravelStatsCard