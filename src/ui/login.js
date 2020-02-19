import React from 'react'
import { Button, Icon, Header, Grid, Image} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect';
import { FaMapPin} from 'react-icons/fa'
import Logo from '../img/geograme-logo-square.png'

const LoginPage = ({handleLoginClick}) => {
  return (
    <div style={{alignItems: 'center', justifyContent: 'center'}}>
      <Grid columns='equal' padded>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={isMobile ? 16 : 8}>
          <Image src={Logo} size='huge' centered/>
          <Header as='h3'>Welcome to Geogra.Me - a platform for you to create a push-pin <FaMapPin /> map, and take it with you wherever you go</Header>
          <Button
            icon
            labelPosition='left'
            onClick={handleLoginClick}
          >
            <Icon name='google' />
            Sign in with Google
          </Button>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid>
    </div>

  )
}

export default LoginPage