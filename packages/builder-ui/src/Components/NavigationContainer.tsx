import * as React from 'react';
import { useStore } from '../Store';

import { NavigationComponent } from './NavigationComponent';

export const NavigationContainer: React.FC = () => {
  const store = useStore();

  return <NavigationComponent />;
};

NavigationContainer.displayName = 'NavigationContainer';
