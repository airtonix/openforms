import Color from 'color';

import { LoggerFactory } from './LoggerFactory';

const log = LoggerFactory(module.id);

export type ColorParam = Parameters<typeof Color>[0];

function a11yFg(color: ColorParam) {
  const shade = Color(color);
  const luminosity = shade.luminosity();
  const isDark = luminosity < 0.4;
  const isLight = luminosity > 0.5;

  if (isDark) return Color('white');
  if (isLight) return Color('black');

  return shade
    .darken(0.8)
    .grayscale()
    .alpha(1);
}

const accessibleForegroundColour = a11yFg;

export interface IColorModifierProps {
  color: ColorParam;
  amount: number;
  step: number;
}

export interface IDarkenColorModifierProps extends IColorModifierProps {
  minLuminance?: number;
}

export interface ILightenColorModifierProps extends IColorModifierProps {
  maxLuminance?: number;
}

function a11yBgLighten({
  color,
  amount,
  step = 0.01,
  maxLuminance = 0.8,
}: ILightenColorModifierProps) {
  let shade = Color(color);
  // const original = Color(color)

  if (shade.luminosity() === 1) {
    return shade.mix(Color('silver'), 1 - amount / 100);
  }

  while (shade.luminosity() < maxLuminance && shade.lightness() < amount) {
    const newshade = shade.lighten(step);
    shade = newshade;
  }
  return shade;
}

function a11yBgDarken({
  color,
  amount,
  step = 0.01,
  minLuminance = 0.2,
}: IDarkenColorModifierProps) {
  let shade = Color(color);
  const original = Color(color);

  log(
    shade.toString(),
    shade.luminosity(),
    shade.contrast(original),
    amount,
    minLuminance
  );

  if (shade.luminosity() === 0) {
    return shade.mix(Color('black'), amount / 100);
  }

  while (shade.luminosity() > minLuminance && shade.lightness() > amount) {
    const newshade = shade.darken(step);
    log(
      newshade.toString(),
      newshade.luminosity(),
      newshade.lightness(),
      newshade.contrast(original)
    );
    shade = newshade;
  }
  return shade;
}

export {
  Color,
  a11yFg,
  a11yBgLighten,
  a11yBgDarken,
  accessibleForegroundColour,
};
