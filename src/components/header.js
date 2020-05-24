import React from 'react';
import {
  Button,
  Segment,
  Menu,
  Container,
  Header as SemanticHeader,
  Icon,
  Image,
  Grid,
  Popup,
} from 'semantic-ui-react';
import {isMobile} from 'react-device-detect';
import {Link} from 'react-router-dom';

const copyToClipboard = (userProfileLink) => {
  navigator.clipboard.writeText(userProfileLink)
};

const Header = ({
  name,
  photoSrc,
  profileName,
  handleLogoutClick,
  shouldRenderPrivacySettings,
  publicProfile = {},
  onClickUpdateProfilePrivacy = () => {},
  userProfileLink,
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
              <Icon name='map' /> {shouldRenderPrivacySettings ? 'My': `${profileName}'s`} Map
            </SemanticHeader>
          </Grid.Column>
          {shouldRenderPrivacySettings &&
          <Grid.Column>
            <Button.Group>
              <Popup
                content='Make your profile public'
                trigger={<Button positive={publicProfile} icon='lock open' onClick={onClickUpdateProfilePrivacy}/>}
              />
              <Button.Or />
              <Popup
                content='Make your profile private'
                trigger={<Button positive={!publicProfile} icon='lock' onClick={onClickUpdateProfilePrivacy}/>}
              />
            </Button.Group>
          </Grid.Column>
          }
        </Menu.Item>
        }
        {shouldRenderPrivacySettings &&
        <div style={{
          paddingTop: '15px',
          paddingLeft: '10px',
        }}>
          <Grid.Column>
            <Button onClick={copyToClipboard(userProfileLink)}>
              <Icon name='share square' /> Copy Profile Link to Clipboard
            </Button>
          </Grid.Column>
        </div>
        }
        <Menu.Item position={isMobile ? '' : 'right'}>
          <Link to='/profile'>
            <div style={{
              paddingRight: '10px'
            }}>
              <Grid.Column>
                <Image src={photoSrc} size='mini' circular />
              </Grid.Column>
            </div>
          </Link>
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