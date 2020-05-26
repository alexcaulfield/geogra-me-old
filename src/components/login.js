import React from 'react';
import { Button, Icon, Header as SemanticHeader, Grid, Image, Responsive } from 'semantic-ui-react';
import { FaMapPin } from 'react-icons/fa';
import Logo from '../img/geograme-logo-square.png';

const LoginPage = ({handleLoginClick}) => (
  <Grid centered columns={1} padded='horizontally'>
    <Responsive>
      <div style={{paddingBottom: '2%'}}>
        <Grid.Column>
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
        </Grid.Column>
      </div>
    </Responsive>
  </Grid>
);

export default LoginPage;