import {
  model,
  Model,
  Ref,
  detach,
  rootRef,
  ModelPropsCreationData,
  prop_mapObject,
  modelAction,
  prop,
  objectMap,
} from 'mobx-keystone';
import { get, set } from 'mobx';

import { MaybeComplexRecursiveValue } from '@openforms/core/src';

import { PREFERENCES_MODEL_KEY } from './Constants';
import { IPreferenceItems } from './Interfaces';

@model(PREFERENCES_MODEL_KEY)
export class PreferencesModel extends Model({
  items: prop<IPreferenceItems>(() => objectMap<MaybeComplexRecursiveValue>()),
}) {
  createReference(modelInstance: PreferencesModel): PreferencesModelReference {
    return preferenceModelReference(modelInstance);
  }

  get<T>(key: string, defaultTo?: MaybeComplexRecursiveValue): T {
    return this.items ? get(this.items, key) : defaultTo;
  }

  @modelAction
  set(key: string, value: MaybeComplexRecursiveValue): void {
    set(this.items, key, value);
  }
}

export interface IPreferencesModelCreationData
  extends ModelPropsCreationData<PreferencesModel> {}
export type PreferencesModelReference = Ref<PreferencesModel>;

export function preferencesModelFactory(props?: IPreferencesModelCreationData) {
  return new PreferencesModel(props || {});
}

export const preferenceModelReference = rootRef<PreferencesModel>(
  PREFERENCES_MODEL_KEY,
  {
    onResolvedValueChange(ref, newPreferences, oldPreferences) {
      if (oldPreferences && !newPreferences) {
        detach(ref);
      }
    },
  }
);
