import React, { FC, HTMLAttributes, ReactChild } from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';

export interface NavigationComponentProps {}

export const NavigationComponent: FC<NavigationComponentProps> = props => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Blueprint</Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="home" text="Home" />
        <Button className="bp3-minimal" icon="document" text="Files" />
      </Navbar.Group>
    </Navbar>
  );
};
