import { v4 as uuidv4 } from 'uuid';

export function EntityIdentity(namespace: string): string {
  return `${namespace}_${uuidv4().split('-')[0]}`;
}
