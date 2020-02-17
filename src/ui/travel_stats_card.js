import React from 'react'
import { Card } from 'semantic-ui-react'

const TravelStatsCard = ({name, countriesBeen}) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>Stats</Card.Header>
                <Card.Description>
                    {name} has been to {countriesBeen} countries!
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default TravelStatsCard