import React, { createContext, useContext, useRef } from 'react';
import { Global } from '@emotion/react';
import { mergeWith, isArray, uniqWith, isEqual, cloneDeep, isString, isNumber } from 'lodash';
import clsx from 'clsx';
import { serializeStyles } from '@emotion/serialize';
import { insertStyles, getRegisteredStyles } from '@emotion/utils';
import createCache from '@emotion/cache';

const YOMTOR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
const YOMTOR_COLORS = ['primary', 'secondary', 'warning', 'info', 'error'];
const Yomtor_LEVELS = ['lightest', 'light', 'main', 'dark', 'darkest'];
const YOMTOR_VARIANTS = ['filled', 'transparent', 'hover', 'light', 'outline', 'default', 'white', 'gradient', 'subtle'];

const styles = {
  html: {
    fontFamily: 'sans-serif',
    lineHeight: '1.15',
    textSizeAdjust: '100%'
  },
  body: {
    margin: 0
  },
  'article, aside, footer, header, nav, section, figcaption, figure, main': {
    display: 'block'
  },
  h1: {
    fontSize: '2em'
  },
  hr: {
    boxSizing: 'content-box',
    height: 0,
    overflow: 'visible'
  },
  pre: {
    fontFamily: 'monospace, monospace',
    fontSize: '1em'
  },
  a: {
    background: 'transparent',
    textDecorationSkip: 'objects'
  },
  'a:active, a:hover': {
    outlineWidth: 0
  },
  'abbr[title]': {
    borderBottom: 'none',
    textDecoration: 'underline'
  },
  'b, strong': {
    fontWeight: 'bolder'
  },
  'code, kbp, samp': {
    fontFamily: 'monospace, monospace',
    fontSize: '1em'
  },
  dfn: {
    fontStyle: 'italic'
  },
  mark: {
    backgroundColor: '#ff0',
    color: '#000'
  },
  small: {
    fontSize: '80%'
  },
  'sub, sup': {
    fontSize: '75%',
    lineHeight: 0,
    position: 'relative',
    verticalAlign: 'baseline'
  },
  sup: {
    top: '-0.5em'
  },
  sub: {
    bottom: '-0.25em'
  },
  'audio, video': {
    display: 'inline-block'
  },
  'audio:not([controls])': {
    display: 'none',
    height: 0
  },
  img: {
    borderStyle: 'none',
    verticalAlign: 'middle'
  },
  'svg:not(:root)': {
    overflow: 'hidden'
  },
  'button, input, optgroup, select, textarea': {
    fontFamily: 'sans-serif',
    fontSize: '100%',
    lineHeight: '1.15',
    margin: 0
  },
  'button, input': {
    overflow: 'visible'
  },
  'button, select': {
    textTransform: 'none'
  },
  'button, [type=reset], [type=submit]': {
    WebkitAppearance: 'button'
  },
  'button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner': {
    borderStyle: 'none',
    padding: 0
  },
  'button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring': {
    outline: '1px dotted ButtonText'
  },
  legend: {
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'table',
    maxWidth: '100%',
    padding: 0,
    whiteSpace: 'normal'
  },
  progress: {
    display: 'inline-block',
    verticalAlign: 'baseline'
  },
  textarea: {
    overflow: 'auto'
  },
  '[type=checkbox], [type=radio]': {
    boxSizing: 'border-box',
    padding: 0
  },
  '[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button': {
    height: 'auto'
  },
  '[type=search]': {
    appearance: 'textfield',
    outlineOffset: '-2px'
  },
  '[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration': {
    appearance: 'none'
  },
  '::-webkit-file-upload-button': {
    appearance: 'button',
    font: 'inherit'
  },
  'details, menu': {
    display: 'block'
  },
  summary: {
    display: 'list-item'
  },
  canvas: {
    display: 'inline-block'
  },
  template: {
    display: 'none'
  },
  '[hidden]': {
    display: 'none'
  }
};
function NormalizeCSS() {
  return React.createElement(Global, {
    styles: styles
  });
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const isNumeric = num => {
  if (!num) return false;
  return !isNaN(+num);
};

const mergeObjects = (...objects) => {
  if (objects.length === 1) {
    objects.push(cloneDeep(objects[0]));
  }

  return mergeWith({}, ...objects, (obj, src) => {
    if (isArray(obj)) {
      return uniqWith(obj.concat(src), isEqual);
    }
  });
};

function isHexColor(hex) {
  let replaced = hex.replace('#', '');

  if (replaced.length === 3) {
    replaced = replaced.replace(/([\w])(\w)(\w)/g, '$1$1$2$2$3$3');
  }

  return typeof replaced === 'string' && replaced.length === 6 && !Number.isNaN(Number(`0x${replaced}`));
}

function hexToRgba(color) {
  const replaced = color.replace('#', '');
  const parsed = parseInt(replaced, 16);
  const r = parsed >> 16 & 255;
  const g = parsed >> 8 & 255;
  const b = parsed & 255;
  return {
    r,
    g,
    b,
    a: 1
  };
}

function rgbStringToRgba(color) {
  const [r, g, b, a] = color.replace(/[^0-9,.]/g, '').split(',').map(Number);
  return {
    r,
    g,
    b,
    a: a || 1
  };
}

function isColor(color) {
  if (color.startsWith('#') || color.startsWith('rgb')) {
    return true;
  }

  return false;
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }

  if (color.startsWith('rgb')) {
    return rgbStringToRgba(color);
  }

  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}

const _excluded$2 = ["values", "unit", "step"];

function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
    unit = 'px',
    step = 5
  } = breakpoints,
        other = _objectWithoutPropertiesLoose(breakpoints, _excluded$2);

  const keys = Object.keys(values);

  function up(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${+value - step / 100}${unit})`;
  }

  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values[start] === 'number' ? values[start] : start}${unit}) and ` + `(max-width:${+(endIndex !== -1 && typeof values[keys[endIndex]] === 'number' ? values[keys[endIndex]] : end) - step / 100}${unit})`;
  }

  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }

    return up(key);
  }

  function width(key) {
    return values[key];
  }

  const methods = {
    up,
    down
  };
  const breaks = ['xs', 'sm', 'md', 'lg', 'xl'];
  const media = {};
  ['up', 'down'].forEach(method => {
    breaks.forEach(bre => {
      if (!media[method]) {
        media[method] = {};
      }

      media[method][bre] = methods[method](bre).replace(/@media\s*\((.*)\)/g, '$1');
    });
  });
  return mergeObjects({
    keys,
    values,
    up,
    down,
    between,
    only,
    width,
    unit,
    media
  }, other);
}

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(min, value), max);
}

function hexToRgb(color) {
  color = color.substr(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  let colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map(n => n + n);
  }

  return colors ? `rgb${colors.length === 4 ? 'a' : ''}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1000) / 1000;
  }).join(', ')})` : '';
}

function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(color) {
  if (color.indexOf('#') === 0) {
    return color;
  }

  const {
    values
  } = decomposeColor(color);
  return `#${(values || []).map(n => intToHex(n)).join('')}`;
}
function hslToRgb(color) {
  color = decomposeColor(color);
  const {
    values
  } = color;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);

  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (color.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({
    type,
    values: rgb
  });
}
function decomposeColor(color) {
  if (color.type) {
    return color;
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error(`Unsupported ${color} color. The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`);
  }

  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;

  if (type === 'color') {
    values = values.split(' ');
    colorSpace = values.shift();

    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].substr(1);
    }

    if (['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1) {
      throw new Error(`Material-UI: unsupported ${colorSpace} color space. The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`);
    }
  } else {
    values = values.split(',');
  }

  values = values.map(value => parseFloat(value));
  return {
    type,
    values,
    colorSpace
  };
}
function recomposeColor(color) {
  const {
    type,
    colorSpace
  } = color;
  let {
    values
  } = color;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }

  if (type.indexOf('color') !== -1) {
    values = `${colorSpace} ${values.join(' ')}`;
  } else {
    values = `${values.join(', ')}`;
  }

  return `${type}(${values})`;
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function getLuminance(color) {
  color = decomposeColor(color);
  let rgb = color.type === 'hsl' ? decomposeColor(hslToRgb(color)).values : color.values;
  rgb = rgb.map(val => {
    if (color.type !== 'color') {
      val /= 255;
    }

    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function emphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
function alpha(color, value) {
  color = decomposeColor(color);
  value = clamp(value);

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }

  if (color.type === 'color') {
    color.values[3] = `/${value}`;
  } else {
    color.values[3] = value;
  }

  return recomposeColor(color);
}
function darken(color, coefficient = 0.2 * 1.5) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') !== -1 || color.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }

  return recomposeColor(color);
}
function lighten(color, coefficient = 0.2) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  } else if (color.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (1 - color.values[i]) * coefficient;
    }
  }

  return recomposeColor(color);
}

const blue = {
  lightest: '#d0ebff',
  light: '#74c0fc',
  main: '#339af0',
  strong: '#1c7ed6',
  strongest: '#1864ab',
  text: '#FFFFFF'
};

const common = {
  black: '#000',
  white: '#fff'
};

const cyan = {
  lightest: '#c5f6fa',
  light: '#66d9e8',
  main: '#22b8cf',
  strong: '#1098ad',
  strongest: '#0b7285',
  text: '#FFFFFF'
};

const grape = {
  lightest: '#f3d9fa',
  light: '#e599f7',
  main: '#cc5de8',
  strong: '#ae3ec9',
  strongest: '#862e9c',
  text: '#FFFFFF'
};

const green = {
  lightest: '#d3f9d8',
  light: '#8ce99a',
  main: '#51cf66',
  strong: '#37b24d',
  strongest: '#2b8a3e',
  text: '#FFFFFF'
};

const grey = {
  lightest: '#f1f3f5',
  light: '#dee2e6',
  main: '#adb5bd',
  strong: '#495057',
  strongest: '#212529',
  text: '#FFFFFF'
};

const indigo = {
  lightest: '#dbe4ff',
  light: '#91a7ff',
  main: '#5c7cfa',
  strong: '#4263eb',
  strongest: '#364fc7',
  text: '#FFFFFF'
};

const lime = {
  lightest: '#e9fac8',
  light: '#c0eb75',
  main: '#94d82d',
  strong: '#74b816',
  strongest: '#5c940d',
  text: '#FFFFFF'
};

const yellow$1 = {
  lightest: '#ffe8cc',
  light: '#ffe066',
  main: '#ffc078',
  strong: '#f76707',
  strongest: '#d9480f',
  text: '#FFFFFF'
};

const pink = {
  lightest: '#ffdeeb',
  light: '#faa2c1',
  main: '#f06595',
  strong: '#d6336c',
  strongest: '#a61e4d',
  text: '#FFFFFF'
};

const red = {
  lightest: '#ffe3e3',
  light: '#ffa8a8',
  main: '#ff6b6b',
  strong: '#f03e3e',
  strongest: '#c92a2a',
  text: '#FFFFFF'
};

const teal = {
  lightest: '#c3fae8',
  light: '#63e6be',
  main: '#20c997',
  strong: '#0ca678',
  strongest: '#087f5b',
  text: '#FFFFFF'
};

const violet = {
  lightest: '#e5dbff',
  light: '#b197fc',
  main: '#845ef7',
  strong: '#7048e8',
  strongest: '#5f3dc4',
  text: '#FFFFFF'
};

const yellow = {
  lightest: '#fff3bf',
  light: '#ffe066',
  main: '#fcc419',
  strong: '#f59f00',
  strongest: '#e67700',
  text: '#FFFFFF'
};

const _excluded$1 = ["primary", "secondary", "error", "warning", "info", "success", "white", "black", "mode", "contrastThreshold", "tonalOffset"];
let dark;
let light;

function addLightOrDark(intent, direction, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

  if (!intent[direction]) {
    if (direction === 'lightest') {
      intent.lightest = lighten(intent.main, 0.8);
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === 'strong') {
      intent.strong = darken(intent.main, tonalOffsetDark);
    } else if (direction === 'strongest') {
      intent.strongest = darken(intent.main, 0.8);
    }
  }
}

function getContrastText(background, contrastThreshold = 2) {
  var _dark$text, _dark$text2, _light$text;

  const color = background.replace(/rgba?\(var\((.*)\)\)$/g, '$1');

  if (this.vars && this.vars[color]) {
    background = `rgba(${this.vars[color]})`;
  }

  const contrastText = getContrastRatio(background, ((_dark$text = dark.text) == null ? void 0 : _dark$text.main) || '') >= contrastThreshold ? (_dark$text2 = dark.text) == null ? void 0 : _dark$text2.main : (_light$text = light.text) == null ? void 0 : _light$text.main;
  return contrastText;
}
const augmentColor = (color, tonalOffset = 0.2, contrastThreshold = 2) => {
  color = isString(color) ? {
    main: color
  } : _extends({}, color);
  addLightOrDark(color, 'lightest', tonalOffset);
  addLightOrDark(color, 'light', tonalOffset);
  addLightOrDark(color, 'strong', tonalOffset);
  addLightOrDark(color, 'strongest', tonalOffset);

  if (!color.text && dark && light) {
    color.text = getContrastText.bind(null)(color.main, contrastThreshold);
  }

  return color;
};
light = {
  logo: augmentColor('#008146'),
  text: {
    lightest: '#414141',
    light: '#414141',
    main: '#242424',
    dark: '#242424',
    darkest: '#FFFFF'
  },
  background: {
    lightest: '#E3E3E3',
    light: '#F2F2F2',
    main: '#EEEEEE',
    dark: '#FFFFFF',
    darkest: '#FFFFFF'
  },
  divider: '#E3E3E3',
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
dark = {
  logo: augmentColor('#FFFFFF'),
  text: {
    lightest: '#E3E3E3',
    light: '#E3E3E3',
    main: '#E3E3E3',
    dark: '#F2F2F2',
    darkest: '#B6B6B6'
  },
  background: {
    lightest: '#3A3941',
    light: '#2B2A30',
    main: '#242329',
    dark: '#1F1E24',
    darkest: '#16151A'
  },
  secondary: {
    lightest: grey[20],
    light: grey[40],
    main: grey[60],
    strong: grey[80],
    strongest: grey[100],
    text: '#E3E3E3'
  },
  divider: '#373737',
  action: {
    active: common.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function createPalette(palette) {
  const {
    primary = cyan,
    secondary = grey,
    error = red,
    warning = yellow$1,
    info = blue,
    success = green,
    white = common.white,
    black = common.black,
    mode = 'light',
    contrastThreshold = 2,
    tonalOffset = 0.2
  } = palette,
        other = _objectWithoutPropertiesLoose(palette, _excluded$1);

  const modes = {
    dark,
    light
  };
  const paletteOutput = mergeObjects({
    common,
    mode,
    primary: augmentColor(primary, tonalOffset, contrastThreshold),
    secondary: augmentColor(secondary, tonalOffset, contrastThreshold),
    error: augmentColor(error, tonalOffset, contrastThreshold),
    warning: augmentColor(warning, tonalOffset, contrastThreshold),
    info: augmentColor(info, tonalOffset, contrastThreshold),
    success: augmentColor(success, tonalOffset, contrastThreshold),
    grey: augmentColor(grey, tonalOffset, contrastThreshold),
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, modes[mode], other);
  return paletteOutput;
}

function createSpacing() {
  return {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24
  };
}

function createRadius() {
  return {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32
  };
}

const DEFAULT_GRADIENT = {
  from: 'primary',
  to: 'secondary',
  deg: 45
};
function colorVariant({
  color = 'primary',
  variant = 'filled',
  gradient
}) {
  if (variant === 'light') {
    return {
      border: 'transparent',
      background: this.fn.rgba(this.palette[color].lightest, 0.8),
      color: this.palette[color].main,
      hover: {
        border: undefined,
        color: undefined,
        background: this.fn.rgba(this.palette[color].lightest, 0.8)
      }
    };
  }

  if (variant === 'white') {
    return {
      border: 'transparent',
      background: this.palette.background.darkest,
      color: this.fn.rgba(this.palette.text.main, 0.4),
      hover: {
        border: undefined,
        color: undefined,
        background: undefined
      }
    };
  }

  if (variant === 'transparent') {
    return {
      border: 'transparent',
      background: 'transparent',
      color: this.palette[color].main,
      hover: {
        border: undefined,
        color: this.palette[color].light,
        background: undefined
      }
    };
  }

  if (variant === 'gradient') {
    const merged = {
      from: (gradient == null ? void 0 : gradient.from) || DEFAULT_GRADIENT.from,
      to: (gradient == null ? void 0 : gradient.to) || DEFAULT_GRADIENT.to,
      deg: (gradient == null ? void 0 : gradient.deg) || DEFAULT_GRADIENT.deg
    };

    if (!(merged.from in YOMTOR_COLORS) || !(merged.to in YOMTOR_COLORS)) {
      return null;
    }

    return {
      background: `linear-gradient(${merged.deg}deg, ${this.palette[merged.from].main} 0%, ${this.palette[merged.to].main} 100%)`,
      color: this.palette.white,
      border: 'transparent',
      hover: null
    };
  }

  if (variant === 'hover') {
    return {
      border: 'transparent',
      background: 'transparent',
      color: this.palette[color].main,
      hover: {
        border: undefined,
        color: this.palette[color].light,
        background: this.fn.rgba(this.palette.background.lightest, 0.8)
      }
    };
  }

  if (variant === 'outline') {
    return {
      border: this.palette[color].main,
      background: 'transparent',
      color: this.palette[color].main,
      hover: {
        border: this.palette[color].light,
        background: undefined,
        color: this.palette[color].light
      }
    };
  }

  if (variant === 'default') {
    return {
      border: 'transparent',
      background: this.palette.background.light,
      color: this.fn.rgba(this.palette.text.main, 0.4),
      hover: {
        border: undefined,
        color: this.palette[color].text,
        background: this.palette[color].main
      }
    };
  }

  return {
    border: 'transparent',
    background: this.palette[color].main,
    color: this.palette[color].text,
    hover: {
      border: undefined,
      color: undefined,
      background: this.palette[color].light
    }
  };
}

function rgba(color, alpha = 1) {
  if (typeof color !== 'string' || alpha > 1 || alpha < 0) {
    return 'rgba(0, 0, 0, 1)';
  }

  if (color.startsWith('rgb(var(--')) {
    return color.replace(/(rgb)\((var\(--.*\))\)/g, `$1a($2, ${alpha})`);
  }

  if (color.startsWith('rgba(var(--')) {
    color = this.vars[color];
  }

  const {
    r,
    g,
    b
  } = toRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const size = args => {
  if (!isNaN(+args.size)) {
    return +args.size;
  }

  return args.sizes[args.size] || args.size || args.sizes.md;
};

function createSizes() {
  return {
    default: {
      xs: 12,
      sm: 14,
      md: 18,
      lg: 26,
      xl: 32
    },
    icons: {
      xs: 14,
      sm: 18,
      md: 24,
      lg: 30,
      xl: 34
    }
  };
}

function createHeadings() {
  return {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
    sizes: {
      h1: {
        fontSize: 24,
        lineHeight: 1.3
      },
      h2: {
        fontSize: 20,
        lineHeight: 1.35
      },
      h3: {
        fontSize: 18,
        lineHeight: 1.4
      },
      h4: {
        fontSize: 16,
        lineHeight: 1.45
      },
      h5: {
        fontSize: 14,
        lineHeight: 1.5
      },
      h6: {
        fontSize: 12,
        lineHeight: 1.5
      }
    }
  };
}

function createTypography() {
  return {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // fontWeight: 700,
    lineHeight: 1.55,
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20
    }
  };
}

function createShadows() {
  return {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
    md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
    xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px'
  };
}

const _excluded = ["palette", "breakpoints", "type", "typography"];

const generateVars = (params = {}) => {
  const vars = {};
  Object.keys(params).forEach(property => {
    let value = params[property].toString();

    if (isColor(value)) {
      const {
        r,
        g,
        b,
        a
      } = toRgba(value);

      if (a == 1) {
        value = `${r}, ${g}, ${b}`;
      }
    }

    vars[property] = value;
  });
  return vars;
};

const getVars = (tree, preffix = '-', replace = false) => {
  const leaves = {};

  const walk = (obj, path) => {
    path = path || '';

    for (var n in obj) {
      if (obj.hasOwnProperty(n)) {
        if (typeof obj[n] === 'object' || obj[n] instanceof Array) {
          walk(obj[n], path + '-' + n);
        } else if (isString(obj[n]) || isNumber(obj[n])) {
          leaves[path + '-' + n] = obj[n];

          if (replace) {
            let val = `var(${path + '-' + n})`;

            if (isColor(obj[n].toString())) {
              const {
                r,
                g,
                b,
                a
              } = toRgba(obj[n]);

              if (a == 1) {
                val = `rgb(${val})`;
              }
            }

            obj[n] = val;
          }
        }
      }
    }
  };

  walk(tree, preffix);
  return leaves;
};

const getCssVars = theme => {
  return generateVars(_extends({}, getVars(theme.palette, '-', true), getVars(theme.breakpoints.media), getVars(theme.typography), getVars({
    spacing: Object.keys(theme.spacing).reduce((stack, current) => {
      stack[current] = `${theme.spacing[current]}px`;
      return stack;
    }, {})
  })));
};
const createTheme = (options = {}) => {
  const {
    palette: paletteInput = {},
    breakpoints: breakPointsInput = {},
    type: mode = 'light',
    typography: typographyInput = {}
  } = options,
        other = _objectWithoutPropertiesLoose(options, _excluded);

  const palette = createPalette(mergeObjects(paletteInput, {
    mode
  }));
  const breakpoints = createBreakpoints(breakPointsInput);
  const spacing = createSpacing();
  const sizes = createSizes();
  const radius = createRadius();
  const headings = createHeadings();
  const shadows = createShadows();
  const typography = createTypography();
  const theme = {
    vars: {}
  };
  Object.assign(theme, mergeObjects({
    palette,
    breakpoints,
    shadows,
    spacing,
    sizes,
    radius,
    headings,
    typography,
    type: mode,
    fn: {
      size,
      rgba: rgba.bind(Object.assign({
        vars: theme.vars
      })),
      colorVariant: colorVariant.bind(theme),
      getContrastText: palette.getContrastText.bind(theme),
      augmentColor: palette.augmentColor
    }
  }, other));
  theme.vars = Object.assign(theme.vars, getCssVars(theme));
  return theme;
};

const YomtorThemeContext = createContext({
  theme: null,
  styles: {},
  mode: 'light',
  emotionOptions: {
    key: 'yomtor',
    prepend: true
  }
});
function useYomtorTheme() {
  var _useContext;

  return (_useContext = useContext(YomtorThemeContext)) == null ? void 0 : _useContext.theme;
}
function useYomtorThemeStyles() {
  var _useContext2;

  return ((_useContext2 = useContext(YomtorThemeContext)) == null ? void 0 : _useContext2.styles) || {};
}
function useYomtorMode() {
  var _useContext3;

  return ((_useContext3 = useContext(YomtorThemeContext)) == null ? void 0 : _useContext3.mode) || 'light';
}
function useYomtorEmotionOptions() {
  var _useContext4;

  return ((_useContext4 = useContext(YomtorThemeContext)) == null ? void 0 : _useContext4.emotionOptions) || {
    key: 'yomtor',
    prepend: true
  };
}

function GlobalStyles() {
  const theme = useYomtorTheme();
  return React.createElement(Global, {
    styles: {
      '*, *::before, *::after': {
        boxSizing: 'border-box'
      },
      ':root': theme.vars,
      'body, html': {
        height: '100%'
      },
      body: {
        background: theme.palette.background.main,
        color: theme.palette.text.main,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSizes.md,
        lineHeight: theme.typography.lineHeight
      }
    }
  });
}

function YomtorProvider({
  theme,
  styles = {},
  emotionOptions,
  withNormalizeCSS = false,
  withGlobalStyles = true,
  children
}) {
  theme = theme.vars ? theme : createTheme(theme);
  return React.createElement(YomtorThemeContext.Provider, {
    value: {
      theme,
      styles,
      mode: theme.type,
      emotionOptions
    }
  }, withNormalizeCSS && React.createElement(NormalizeCSS, null), withGlobalStyles && React.createElement(GlobalStyles, null), children);
}
YomtorProvider.displayName = '@yomyer/core/YomtorProvider';

function useGuaranteedMemo(fn, deps) {
  const ref = useRef();

  if (!ref.current || deps.length !== ref.current.prevDeps.length || ref.current.prevDeps.map((v, i) => v === deps[i]).indexOf(false) >= 0) {
    ref.current = {
      v: fn(),
      prevDeps: [...deps]
    };
  }

  return ref.current.v;
}

const defaultCacheOptions = {
  key: 'yomtor',
  prepend: true
};
const {
  getCache
} = (() => {
  let cache;
  let _key = defaultCacheOptions.key;

  function _getCache(options) {
    if (cache === undefined || _key !== (options == null ? void 0 : options.key)) {
      _key = (options == null ? void 0 : options.key) || 'yomtor';
      cache = createCache(options || defaultCacheOptions);
    }

    return cache;
  }

  return {
    getCache: _getCache
  };
})();
function useEmotionCache() {
  const options = useYomtorEmotionOptions();
  return getCache(options);
}

const refPropertyName = 'ref';

function getRef(args) {
  let ref;

  if (args.length !== 1) {
    return {
      args,
      ref
    };
  }

  const [arg] = args;

  if (!(arg instanceof Object)) {
    return {
      args,
      ref
    };
  }

  if (!(refPropertyName in arg)) {
    return {
      args,
      ref
    };
  }

  ref = arg[refPropertyName];

  const argCopy = _extends({}, arg);

  delete argCopy[refPropertyName];
  return {
    args: [argCopy],
    ref
  };
}

const {
  cssFactory
} = (() => {
  function merge(registered, css, className) {
    const registeredStyles = [];
    const rawClassName = getRegisteredStyles(registered, registeredStyles, className);

    if (registeredStyles.length < 2) {
      return className;
    }

    return rawClassName + css(registeredStyles);
  }

  function _cssFactory(params) {
    const {
      cache
    } = params;

    const css = (...styles) => {
      const {
        ref,
        args
      } = getRef(styles);
      const serialized = serializeStyles(args, cache.registered);
      insertStyles(cache, serialized, false);
      return `${cache.key}-${serialized.name}${ref === undefined ? '' : ` ${ref}`}`;
    };

    const cx = (...args) => merge(cache.registered, css, clsx(args));

    return {
      css,
      cx
    };
  }

  return {
    cssFactory: _cssFactory
  };
})();
function useCss() {
  const cache = useEmotionCache();
  return useGuaranteedMemo(() => cssFactory({
    cache
  }), [cache]);
}

function mergeClassNames(cx, classes, classNames, name) {
  return Object.keys(classes).reduce((acc, className) => {
    acc[className] = cx(classes[className], classNames != null && classNames[className], name ? `yomtor-${name}-${className}` : null);
    return acc;
  }, {});
}

function fromEntries(entries) {
  const o = {};
  Object.keys(entries).forEach(key => {
    const [k, v] = entries[key];
    o[k] = v;
  });
  return o;
}

function createStyles(getCssObjectOrCssObject) {
  const getCssObject = typeof getCssObjectOrCssObject === 'function' ? getCssObjectOrCssObject : () => getCssObjectOrCssObject;

  function useStyles(params, options) {
    const theme = useYomtorTheme();
    const themeStyles = useYomtorThemeStyles()[options == null ? void 0 : options.name];
    const {
      css,
      cx
    } = useCss();
    let count = 0;

    function createRef(refName) {
      count += 1;
      return `yomtor-ref_${refName || ''}_${count}`;
    }

    const cssObject = getCssObject(theme, params, createRef);

    const _styles = typeof (options == null ? void 0 : options.styles) === 'function' ? options == null ? void 0 : options.styles(theme) : (options == null ? void 0 : options.styles) || {};

    const _themeStyles = typeof themeStyles === 'function' ? themeStyles(theme) : themeStyles || {};

    const classes = fromEntries(Object.keys(cssObject).map(key => {
      const mergedStyles = cx(css(cssObject[key]), css(_themeStyles[key]), css(_styles[key]));
      return [key, mergedStyles];
    }));
    return {
      classes: mergeClassNames(cx, classes, options == null ? void 0 : options.classNames, options == null ? void 0 : options.name),
      cx,
      theme
    };
  }

  return useStyles;
}

export { NormalizeCSS, YOMTOR_COLORS, YOMTOR_SIZES, YOMTOR_VARIANTS, YomtorProvider, Yomtor_LEVELS, alpha, blue, colorVariant, common, createBreakpoints, createHeadings, createPalette as createPalete, createRadius, createShadows, createSizes, createSpacing, createStyles, createTheme, createTypography, cssFactory, cyan, darken, decomposeColor, emphasize, fromEntries, getCache, getContrastRatio, getCssVars, getLuminance, grape, green, grey, hexToRgb, hslToRgb, indigo, isColor, isNumeric, lighten, lime, mergeClassNames, mergeObjects, yellow$1 as orange, pink, recomposeColor, red, rgbToHex, rgba, size, teal, toRgba, useCss, useEmotionCache, useGuaranteedMemo, useYomtorEmotionOptions, useYomtorMode, useYomtorTheme, useYomtorThemeStyles, violet, yellow };
//# sourceMappingURL=index.modern.js.map
