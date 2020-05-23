import React from 'react';
import {
  Segment,
  Menu,
  Header as SemanticHeader,
  Icon,
  Grid,
  Container,
  Message,
} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect'
import {Link} from 'react-router-dom'

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
    <Segment>
      <div style={{
        paddingTop: '25px',
        width: isMobile ? '100%' : '40%',
        margin:  '0 auto',
      }}>
        <Message icon>
          <Icon name='dont' />
          <Message.Content>
            <Message.Header>Page Not Found</Message.Header>
            We're sorry, but this page does not exist. Please visit our <Link to='/'>homepage</Link>!
          </Message.Content>
        </Message>
      </div>
    </Segment>
  </>
);

export default NotFound;