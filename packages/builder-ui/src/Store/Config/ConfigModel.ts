import {
  detach,
  model,
  prop,
  Model,
  Ref,
  rootRef,
  ModelPropsCreationData,
} from 'mobx-keystone';
import { CONFIG_MODEL_KEY } from './Constants';
import { IConfigItem } from './Interfaces';

@model(CONFIG_MODEL_KEY)
export class ConfigModel extends Model({
  items: prop<IConfigItem[]>(() => []),
}) {
  createReference(modelInstance: ConfigModel): Ref<ConfigModel> {
    return configModelReference(modelInstance);
  }
}

export interface IConfigModelCreationData
  extends ModelPropsCreationData<ConfigModel> {}
export type ConfigModelReference = Ref<ConfigModel>;

export function configModelFactory(props?: IConfigModelCreationData) {
  return new ConfigModel(props || {});
}

export const configModelReference = rootRef<ConfigModel>(CONFIG_MODEL_KEY, {
  onResolvedValueChange(ref, newAppConfig, oldAppConfig) {
    if (oldAppConfig && !newAppConfig) {
      detach(ref);
    }
  },
});
