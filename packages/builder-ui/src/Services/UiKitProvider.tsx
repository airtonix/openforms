import React from 'react';
import { ThemeProvider, JssProvider } from 'react-jss';
import { GenerateId } from 'jss';
import get from 'lodash/get';

import { LoggerFactory } from './LoggerFactory';
import { IThemeTokens, ThemeDefinition } from './ThemeDefinition';

const log = LoggerFactory(module.id);

export const jssNamespace = '';

declare global {
  interface Window {
    jssNamespace: string;
    JSS_NAMESPACE: undefined | number;
  }

  interface Global {
    jssNamespace: string;
    JSS_NAMESPACE: undefined | number;
  }
}

window.jssNamespace = jssNamespace;

// Bundle may contain multiple JSS versions at the same time. In order to identify
// the current version with just one short number and use it for classes generation
// we use a counter. Also it is more accurate, because user can manually reevaluate
// the module.
if (window.JSS_NAMESPACE == null) window.JSS_NAMESPACE = 0;
const moduleId = window.JSS_NAMESPACE++;

const maxRules = 1e10;

/**
 * Returns a function which generates unique class names based on counters.
 * When new generator function is created, rule counter is reseted.
 * We need to reset the rule counter for SSR for each request.
 */
function ClassNameGenerator(): GenerateId {
  let ruleCounter = 0;
  const defaultPrefix = '';

  return (rule, sheet): string => {
    ruleCounter += 1;

    if (ruleCounter > maxRules) {
      log(
        `[JSS] You might have a memory leak. Rule counter is at ${ruleCounter}`
      );
    }

    let prefix = defaultPrefix;
    let jssId = '';
    const sheetMeta = get(sheet, 'options.meta');
    const sheetId = get(sheet, 'options.jss.id');

    if (sheetMeta) {
      prefix =
        sheetMeta
          .split(',')
          .map((item: string) => item.trim())
          .shift() || defaultPrefix;
      if (sheetId != null) jssId += sheetId;
    }

    const output = `${prefix}__${rule.key}-${moduleId}${jssId &&
      `-${jssId}`}-${ruleCounter}`;
    log(`[JSS] ${output}`);
    return output;
  };
}

export interface IUiKitProviderProps {
  tokens?: IThemeTokens;
}

export const UiKitProvider: React.FC<IUiKitProviderProps> = props => {
  const { tokens, children } = props;
  return (
    <JssProvider generateId={ClassNameGenerator()}>
      <ThemeProvider theme={ThemeDefinition(tokens)}>{children}</ThemeProvider>
    </JssProvider>
  );
};

UiKitProvider.displayName = 'UiKitProvider';
