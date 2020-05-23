import React from 'react';
import {Icon, Message, Segment} from "semantic-ui-react";
import {isMobile} from "react-device-detect";

const ErrorMessage = ({header, message}) => (
  <Segment>
    <div style={{
      paddingTop: '25px',
      width: isMobile ? '100%' : '40%',
      margin:  '0 auto',
    }}>
      <Message icon>
        <Icon name='dont' />
        <Message.Content>
          <Message.Header>{header}</Message.Header>
          {message}
        </Message.Content>
      </Message>
    </div>
  </Segment>
);

export default ErrorMessage;