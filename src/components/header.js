import React from 'react';
import {
  Button,
  Segment,
  Menu,
  Container,
  Header as SemanticHeader,
  Icon,
  Image,
  Grid
} from 'semantic-ui-react';
import {isMobile} from 'react-device-detect';

const Header = ({
  name,
  photoSrc,
  handleLogoutClick,
  publicProfile,
  onClickUpdateProfilePrivacy,
}) => (
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
            <Grid.Column style={{
              paddingRight: '10px'
            }}>
              <SemanticHeader>
                <Icon name='map' /> {name}'s Map
              </SemanticHeader>
            </Grid.Column>
            <Grid.Column>
              <Button.Group>
                <Button positive={publicProfile} icon='lock open' onClick={onClickUpdateProfilePrivacy}/>
                <Button.Or />
                <Button positive={!publicProfile} icon='lock' onClick={onClickUpdateProfilePrivacy}/>
              </Button.Group>
            </Grid.Column>
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
              <SemanticHeader>{name}</SemanticHeader>
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
);

export default Header