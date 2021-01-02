import { MaybeComplexRecursiveValue } from '@openforms/core/src';
import { ObjectMap } from 'mobx-keystone';

export interface IPreferenceItems
  extends ObjectMap<MaybeComplexRecursiveValue> {}
