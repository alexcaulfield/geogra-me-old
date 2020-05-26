import React from 'react';
import {
  Segment,
  Menu,
  Container,
  Header as SemanticHeader,
  Icon,
  Image,
  Grid,
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import SettingsDropdown from "./settings_dropdown";

const Header = ({
  name,
  photoSrc,
  profileName,
  handleLogoutClick,
  shouldRenderMyMap,
  publicProfile = {},
  onClickUpdateProfilePrivacy = () => {},
  userProfileLink,
  username,
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
        <Menu.Item>
          <Grid.Column style={{
            paddingRight: '10px'
          }}>
            <SemanticHeader>
              <Icon name='map' /> {shouldRenderMyMap ? 'My': `${profileName}'s`} Map
            </SemanticHeader>
          </Grid.Column>
        </Menu.Item>
        <Menu.Item position='right'>
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
              <SettingsDropdown
                handleLogoutClick={handleLogoutClick}
                publicProfile={publicProfile}
                onClickUpdateProfilePrivacy={onClickUpdateProfilePrivacy}
                userProfileLink={userProfileLink}
                username={username}
                renderPersonalProfileSettings={shouldRenderMyMap}
              />
            </Grid.Column>
          </div>
        </Menu.Item>
      </Container>
    </Menu>
  </Segment>
);

export default Header