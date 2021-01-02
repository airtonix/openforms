import { connectReduxDevTools, registerRootStore } from 'mobx-keystone';
import { createContext, useContext } from 'react';
import * as remotedev from 'remotedev';
import { configure } from 'mobx';

import { LoggerFactory } from '../Services/LoggerFactory';

import { AppModel, appModelFactory } from './App/AppModel';

const log = LoggerFactory(module.id);
configure({ enforceActions: 'always' });

export function createRootStore(config: Record<string, any>): AppModel {
  log('config', config);
  const store = appModelFactory({});
  registerRootStore(store);
  log('createRootStore.created', store);

  const connection = remotedev.connectViaExtension();
  connectReduxDevTools(remotedev, connection, store);

  return store;
}

export const StoreContext = createContext<AppModel>(appModelFactory({}));

export const StoreProvider = StoreContext.Provider;

export function useStore(): AppModel {
  return useContext(StoreContext);
}
