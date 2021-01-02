import get from 'lodash/get';
import isObject from 'lodash/isObject';

import { Color } from './Colours';

export interface IThemeTokens {
  primaryColour: string;
  secondaryColour: string;
}

export type ThemeDefinitionPrimitiveValue =
  | string
  | number
  | boolean
  | undefined
  | null;
export type ThemeDefinitionIterableValue =
  | ThemeDefinitionPrimitiveValue[]
  | ThemeDefinitionHashedValue[];
export type ThemeDefinitionHashedValue = {
  [key: string]:
    | ThemeDefinitionPrimitiveValue
    | ThemeDefinitionIterableValue
    | ThemeDefinitionHashedValue;
};
export type ThemeDefinitionValue =
  | ThemeDefinitionPrimitiveValue
  | ThemeDefinitionIterableValue
  | ThemeDefinitionHashedValue;

export interface IThemeDefinition {
  tokens: {
    spacing?: {
      [key: string]: number;
    };

    icons?: {
      sizes: {
        small?: number;
        normal?: number;
        big?: number;
        large?: number;
        huge?: number;
        massive?: number;
        enormous?: number;
      };

      outlineSizes: {
        small?: number;
        normal?: number;
        big?: number;
        large?: number;
        huge?: number;
        massive?: number;
        enormous?: number;
      };

      badgePaddingMultiplier?: number;
    };

    colours?: {
      [key: string]: {
        default: string;
        [key: string]: string;
      };
    };
  };

  get(path: string, defaultTo?: ThemeDefinitionValue): any;

  getAsNumber(
    path: string,
    defaultTo?: ThemeDefinitionValue
  ): number | undefined;

  getAsString(
    path: string,
    defaultTo?: ThemeDefinitionValue
  ): string | undefined;
}

export function ThemeDefinition(config?: IThemeTokens): IThemeDefinition {
  const primary = get(config, 'primaryColour', '#2572CC');
  const secondary = get(config, 'secondaryColour', '#E9F2FB');

  const tokens = {
    spacing: {
      tiny: 4,
      small: 8,
      normal: 16,
      big: 32,
      large: 40,
      huge: 64,
      enormous: 96,
      massive: 128,
    },
    icons: {
      sizes: {
        small: 12,
        normal: 16,
        big: 18,
        large: 24,
        huge: 48,
        massive: 64,
        enormous: 96,
      },
      outlineSizes: {
        small: 1,
        normal: 2,
        big: 2,
        large: 2,
        huge: 4,
        massive: 4,
        enormous: 6,
      },
      badgePaddingMultiplier: 1.2,
    },
    colours: {
      brand: {
        dark: Color(primary)
          .darken(0.2)
          .string(),
        default: Color(primary).string(),
        secondary: Color(secondary).string(),
        light: Color(primary)
          .lighten(0.25)
          .string(),
        lighter: Color(primary)
          .lighten(0.5)
          .string(),
        alpha60: Color(primary)
          .alpha(0.6)
          .string(),
        alpha85: Color(primary)
          .alpha(0.85)
          .string(),
      },
      black: {
        default: '#000',
        alpha85: Color('#000')
          .alpha(0.85)
          .string(),
        alpha65: Color('#000')
          .alpha(0.65)
          .string(),
        alpha40: Color('#000')
          .alpha(0.4)
          .string(),
        alpha10: Color('#000')
          .alpha(0.1)
          .string(),
      },
      white: {
        darkest: '#F8F8F8',
        dark: '#FAFAFA',
        default: '#ffffff',
        alpha85: Color('#ffffff')
          .alpha(0.85)
          .string(),
        alpha65: Color('#ffffff')
          .alpha(0.65)
          .string(),
        alpha25: Color('#ffffff')
          .alpha(0.25)
          .string(),
        alpha15: Color('#ffffff')
          .alpha(0.15)
          .string(),
      },
      grey: {
        dark: '#333333',
        default: '#999999',
        light: '#cccccc',
        lightest: '#eeeeee',
      },

      red: {
        lightest: '#FEE7E7',
        lighter: '#FB9D9D',
        light: '#F75454',
        default: '#F52525',
        dark: '#AB0808',
      },
    },
  };

  const definition = {
    tokens,
    get(path: string, defaultTo: ThemeDefinitionValue) {
      const output = get(this, path);
      if (!output || isObject(output)) {
        return get(this, `${path}.default`, defaultTo);
      }
      return output;
    },
    getAsNumber(
      path: string,
      defaultTo: ThemeDefinitionValue
    ): number | undefined {
      const output = this.get(path, defaultTo);
      if (!output) return;
      return Number(output);
    },
    getAsString(
      path: string,
      defaultTo: ThemeDefinitionValue
    ): string | undefined {
      const output = this.get(path, defaultTo);
      if (!output) return;
      return output.toString();
    },
  };
  return definition;
}
