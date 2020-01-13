import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const LoginPage = ({handleLoginClick}) => {
  return (
    <div>
      <Button 
        icon 
        labelPosition='left'
        onClick={handleLoginClick}
      >
        <Icon name='google' />
        Sign in with Google
      </Button>
    </div>
  )
}

export default LoginPage