import React from 'react';
import {Icon, Message, Segment, Responsive} from "semantic-ui-react";

const ErrorMessage = ({header, message}) => (
  <Responsive as={Segment}>
    <div style={{
      paddingTop: '25px',
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
  </Responsive>
);

export default ErrorMessage;