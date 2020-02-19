import React from 'react'
import { Button, Segment, Menu, Container, Header, Icon, Image, Grid} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect';

const UiHeader = ({name, photoSrc, handleLogoutClick}) => {
  return (
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
          {!isMobile &&
            <Menu.Item>
              <Header>
                <Icon name='map' /> {name}'s Map
              </Header>
            </Menu.Item>
          }

          <Menu.Item position={isMobile ? '' : 'right'}>
            <div style={{
              paddingRight: '10px'
            }}>
              <Grid.Column>
                <Image src={photoSrc} size='mini' circular />
              </Grid.Column>
            </div>
            <div style={{
              paddingRight: '10px'
            }}>
              <Grid.Column>
                <Header>{name}</Header>
              </Grid.Column>
            </div>
            <div style={{
              paddingRight: '10px'
            }}>
              <Grid.Column>
                <Button as='a' onClick={handleLogoutClick}>
                  Log Out
                </Button>
              </Grid.Column>
            </div>
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  )
}

export default UiHeader