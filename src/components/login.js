import React from 'react';
import { Button, Icon, Header as SemanticHeader, Grid, Image, Responsive } from 'semantic-ui-react';
import { FaMapPin } from 'react-icons/fa';
import Logo from '../img/geograme-logo-square.png';
import useWindowDimensions from '../hooks/useWindowDimensions';

const LoginPage = ({handleLoginClick}) => {
  return (
    <div style={{alignItems: 'center', justifyContent: 'center'}}>
      <Grid columns='equal' padded>
        <Grid.Column>
        </Grid.Column>

        <Responsive as={Grid.Column}>
          <Image src={Logo} size='huge' centered/>
          <SemanticHeader as='h3'>Welcome to Geogra.Me - a platform for you to create a push-pin <FaMapPin /> map, and take it with you wherever you go</SemanticHeader>
          <Button
            icon
            labelPosition='left'
            onClick={handleLoginClick}
          >
            <Icon name='google' />
            Sign in with Google
          </Button>
        </Responsive>
        <Grid.Column>
        </Grid.Column>
      </Grid>
    </div>

  )
};

export default LoginPage;