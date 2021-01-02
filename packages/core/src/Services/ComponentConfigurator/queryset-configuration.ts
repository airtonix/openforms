
import flat from 'flat'

import { HashedValue } from '../../interfaces'

export function QuerysetConfiguration (
  source: string,
  namespace?: string,
  separator?: string
): HashedValue {
  const parameters = source.replace('?', '')
    .split('&')
    .filter(((pair) => (!namespace) || pair.startsWith(namespace)))

  const output = parameters.reduce<HashedValue>((result, item) => {
      const [key, initialvalue] = item.split('=')
      let value = decodeURIComponent(initialvalue)
      try {
        value = JSON.parse(value)
      } catch (err) {}

      return {
        ...result,
        [key]: value
      }
    }, {})

  return flat.unflatten(output, { delimiter: separator || '.' })
}
