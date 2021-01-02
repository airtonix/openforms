import { model, prop, Model, Ref, ModelPropsCreationData } from 'mobx-keystone';
import { ConfigModel, configModelFactory } from '../Config/ConfigModel';

import {
  PreferencesModel,
  preferencesModelFactory,
} from '../Prefrences/PreferencesModel';

import { APP_MODEL_KEY } from './Constants';

@model(APP_MODEL_KEY)
export class AppModel extends Model({
  config: prop<ConfigModel>(() => configModelFactory()),
  preferences: prop<PreferencesModel>(() => preferencesModelFactory()),
}) {}

export interface IAppModelCreationData
  extends ModelPropsCreationData<AppModel> {}
export type AppModelReference = Ref<AppModel>;

export function appModelFactory(props?: IAppModelCreationData) {
  return new AppModel(props || {});
}
