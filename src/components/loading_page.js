import React from 'react';
import {
  Dimmer,
  Loader,
  Image,
  Segment,
  Menu,
  Header as SemanticHeader,
  Icon, Grid, Container,
} from 'semantic-ui-react'

const LoadingPage = () => (
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
                <Icon loading name='map' size='tiny' /> Geogra.me
              </SemanticHeader>
            </Grid.Column>
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
    <Segment>
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Segment>
  </>
);

export default LoadingPage;