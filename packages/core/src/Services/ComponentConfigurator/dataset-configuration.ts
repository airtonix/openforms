import { set } from 'lodash'

export function DatasetConfiguration (
  source: Record<string, any>,
  prefix: string,
  separator = '_'
) {
  const prefixPattern = new RegExp(`^${prefix}_`)
  const separatorPattern = new RegExp(`${separator}`, 'g')
  const output = Object.keys(source)
    .filter(key => key.startsWith(prefix))
    .reduce((result, key) => {
      const newKey = key
        .replace(prefixPattern, '')
        .replace(separatorPattern, '.')
      let value = source[key]
      try {
        value = JSON.parse(value)
      } catch (err) {}
      set(result, newKey, value)
      return result
    }, {})
  return output
}
