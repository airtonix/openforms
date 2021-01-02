import * as React from 'react';

import {
  FetchData,
  GetPageBaseUrl,
  ResolveUrl,
  ComponentMountFactory,
} from '@openforms/core';

import { createRootStore, StoreProvider } from './Store';
import { UiKitProvider } from './Services/UiKitProvider';
import { UiContainer } from './Components/UiContainer';

export interface IBuilderProps {
  config?: any;
}

export type MountableComponent<P> = React.FC<P> & {
  Mount(): void;
  FetchData(): void;
  GetPageBaseUrl(): void;
  ResolveUrl(): void;
};

export function Builder(props: IBuilderProps) {
  const { config } = props;

  const [store] = React.useState(() => createRootStore(config));

  return (
    <StoreProvider value={store}>
      <UiKitProvider>
        <UiContainer />
      </UiKitProvider>
    </StoreProvider>
  );
}

Builder.displayName = 'FormBuilderApp';

Builder.Mount = ComponentMountFactory({
  selector: '[data-component="openforms-builder"]',
  component: Builder,
  defaults: {},
});

Builder.FetchData = FetchData;
Builder.GetPageBaseUrl = GetPageBaseUrl;
Builder.ResolveUrl = ResolveUrl;
