import debug, { Debugger } from 'debug';
import * as PKG from '../../package.json';

export function LoggerFactory(namespace: string): Debugger {
  return debug(`${PKG.name}/${namespace}`);
}
