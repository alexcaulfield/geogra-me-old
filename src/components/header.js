import React from 'react';
import {
  Segment,
  Menu,
  Container,
  Header as SemanticHeader,
  Icon,
  Image,
  Grid,
  Responsive,
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
          <Grid.Row>
            <SemanticHeader>
              <Icon name='map' /> {shouldRenderMyMap ? 'My': `${profileName}'s`} Map
            </SemanticHeader>
          </Grid.Row>
        </Menu.Item>
        <Menu.Item position='right'>
          <Grid>
          <Grid.Row>
            <Responsive minWidth={768}>
            <Grid.Column>
              <Link to='/profile'>
                <Image src={photoSrc} size='mini' circular />
              </Link>
            </Grid.Column>
            </Responsive>
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
          </Grid.Row>
          </Grid>
        </Menu.Item>
      </Container>
    </Menu>
  </Segment>
);

export default Header