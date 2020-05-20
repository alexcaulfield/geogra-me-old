import React from 'react'
import { Button, Icon, Header as SemanticHeader, Grid, Image} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect';
import { FaMapPin } from 'react-icons/fa'
import Logo from '../img/geograme-logo-square.png'
import useWindowDimensions from '../hooks/useWindowDimensions'

const LoginPage = ({handleLoginClick}) => {
  const {width} = useWindowDimensions();
  const getLogoWidth = () => {
    if (isMobile) {
      return 16
    } else if (width < 1600){
      return 6
    } else if (width < 10){
      return 5
    } else {
      return 8
    }
  }

  return (
    <div style={{alignItems: 'center', justifyContent: 'center'}}>
      <Grid columns='equal' padded>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={getLogoWidth()}>
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
        <Grid.Column>
        </Grid.Column>
      </Grid>
    </div>

  )
}

export default LoginPage