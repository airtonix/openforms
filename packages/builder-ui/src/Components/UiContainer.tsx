import * as React from 'react';
import { Reoverlay } from 'reoverlay';
import { useStore } from '../Store';
import { NavigationContainer } from './NavigationContainer';

import { UiComponent } from './UiComponent';

Reoverlay.config([]);

export const UiContainer: React.FC = () => {
  const store = useStore();
  const size = store?.preferences.get<number>('propertyPanel.size', 200);
  return (
    <UiComponent
      splitSize={size}
      navSlot={<NavigationContainer />}
      propertySlot={'propertySlot'}
      workspaceSlot={'workspaceSlot'}
    />
  );
};
UiComponent.displayName = 'UiContainer';
