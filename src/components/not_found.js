import React from 'react';
import {
  Segment,
  Menu,
  Header as SemanticHeader,
  Icon,
  Grid,
  Container,
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ErrorMessage from "./error_message";

const NotFound = () => (
  <>
    <Segment
      inverted
      textAlign='center'
      vertical
    >
      <Menu
        fixed='top'
        size='large'
      >
        <Container>
          <Menu.Item>
            <Grid.Column style={{
              paddingRight: '10px'
            }}>
              <SemanticHeader as='h2'>
                <Icon name='map' size='tiny' /> Geogra.me
              </SemanticHeader>
            </Grid.Column>
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
    <ErrorMessage
      header='Page Not Found'
      message={
        <>
          We're sorry, but this page does not exist. Please visit our {<Link to='/'>homepage</Link>}!
        </>
      }
    />
  </>
);

export default NotFound;