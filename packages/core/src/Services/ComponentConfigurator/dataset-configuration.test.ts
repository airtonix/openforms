import { DatasetConfiguration } from './dataset-configuration'

describe('Services/DatasetConfiguration', () => {
  const h = (html: string) => { document.body.innerHTML = html }
  const $ = (selector: string): HTMLElement | null => document.querySelector(selector)
  const c = (namespace: string) => {
    const element = $(`[data-component="${namespace}"]`)
    if (!element) return
    expect(element).toBeDefined()
    const { component, ...props }: DOMStringMap = element.dataset
    expect(component).toBeDefined()
    if (!component) return
    return DatasetConfiguration(props, component)
  }
  beforeEach(() => {
    h('')
  })

  it('keeps only namespace', async () => {
    const namespace = 'foo'
    const unexpected = 'bar'
    h(`
      <div data-component="${namespace}"
           data-foo_one="${namespace}"
           data-bar_one="${unexpected}"
           />
    `)

    const config = c(namespace)
    expect(config).not.toHaveProperty('one', unexpected)
    expect(config).toHaveProperty('one', namespace)
  })

  it('deeply nests keys/values', async () => {
    const namespace = 'foo'
    const expectedOne = 1
    const expectedOneTwo = 2
    const expectedThree = 3
    h(`
      <div data-component="${namespace}"
           data-${namespace}_one="${expectedOne}"
           data-${namespace}_one_two="${expectedOneTwo}"
           data-${namespace}_one_four_five-six="56"
           data-${namespace}_one_four_seven-eight="78"
           data-${namespace}_one_enabled="false"
           data-${namespace}_three="${expectedThree}"
           />
    `)

    const config = c(namespace)

    expect(config).not.toHaveProperty('one', expectedOne)
    expect(config).toHaveProperty('one.two', expectedOneTwo)
    expect(config).toHaveProperty('three', expectedThree)
    expect(config).toHaveProperty('one.enabled', false)
  })
})
