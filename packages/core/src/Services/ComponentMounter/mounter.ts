import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { defaultsDeep } from 'lodash'

import { DatasetConfiguration } from '../ComponentConfigurator/dataset-configuration'
import { QuerysetConfiguration } from '../ComponentConfigurator/queryset-configuration'
import { HashedValue } from '../../interfaces'
import { MissingComponentNameMounterException, MissingSelectorMounterException } from './Exceptions'

function getElement (
  element: string | HTMLElement
): HTMLElement | null {
  if (element instanceof HTMLElement) {
    return element
  } else if (typeof element === 'string') {
    return document.querySelector(element)
  }
  return null
}

export interface IComponentMountFactoryConfiguration extends Omit<IMountConfiguration, 'config'> {
}

export function ComponentMountFactory (configuration: IComponentMountFactoryConfiguration) {
  return (config?: HashedValue) => Mount({
    selector: configuration.selector,
    component: configuration.component,
    defaults: configuration.defaults,
    config,
  })
}

export interface IMountConfiguration {
  selector: string,
  component: React.ElementType,
  defaults: HashedValue,
  config?: HashedValue,
  onMount?: (element: HTMLElement) => void
}

export function Mount (configuration: IMountConfiguration) {
  const {
    component,
    selector,
    config = {},
    defaults = {},
    onMount
  } = configuration

  if (!selector) throw new MissingSelectorMounterException()

  const element = getElement(selector)
  if (!element) return

  const {
    component: name,
    ...attributes
  } = element.dataset

  if (!name) throw new MissingComponentNameMounterException(
    selector,
    element
  )

  // props are applied in order of transiences
  const props = defaultsDeep(
    QuerysetConfiguration(window.location.search, name),
    DatasetConfiguration(attributes, name),
    config,
    defaults,
  )

  const Component = React.createElement(component, props)
  ReactDOM.render(Component, element)

  if (typeof onMount === 'function') onMount(element)
}
