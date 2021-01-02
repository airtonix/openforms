import { MaybeComplexRecursiveValue } from '@openforms/core';

export interface IThemeConfiguration {
  primaryColour: string;
  secondaryColour: string;
}

export interface IThemeDefinition {
  tokens: {
    spacing: {
      [key: string]: number;
    };
    colours: {
      [key: string]: {
        default: string;
        [key: string]: string;
      };
    };
  };
  get(path: string, defaultTo: MaybeComplexRecursiveValue): string;
}
export declare function ThemeDefinition(
  config?: IThemeConfiguration
): IThemeDefinition;
