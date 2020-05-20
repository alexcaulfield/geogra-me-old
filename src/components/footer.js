import React from 'react'
import {Header, Icon, Segment} from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment>
      <Header as='h4'>© {new Date().getFullYear()} Alex Caulfield</Header>
      <span>
        Any questions? Leave a comment on <a href='https://github.com/alexcaulfield/geogra-me/issues' target="_blank"><Icon link name='github' size='large'/></a>
      </span>
      <span>
        or contact Alex on <a href='https://www.linkedin.com/in/alexandercaulfield/ ' target="_blank"><Icon link name='linkedin' size='large'/></a>
      </span>
    </Segment>
  )
}

export default Footer
