var React = require('react');
var react = require('@emotion/react');
var lodash = require('lodash');
var clsx = require('clsx');
var serialize = require('@emotion/serialize');
var utils = require('@emotion/utils');
var createCache = require('@emotion/cache');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);
var createCache__default = /*#__PURE__*/_interopDefaultLegacy(createCache);

var YOMTOR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
var YOMTOR_COLORS = ['primary', 'secondary', 'warning', 'info', 'error'];
var Yomtor_LEVELS = ['lightest', 'light', 'main', 'dark', 'darkest'];
var YOMTOR_VARIANTS = ['filled', 'transparent', 'hover', 'light', 'outline', 'default', 'white', 'gradient', 'subtle'];

var styles = {
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
  return React__default["default"].createElement(react.Global, {
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

var isNumeric = function isNumeric(num) {
  if (!num) return false;
  return !isNaN(+num);
};

var mergeObjects = function mergeObjects() {
  var objects = [].slice.call(arguments);

  if (objects.length === 1) {
    objects.push(lodash.cloneDeep(objects[0]));
  }

  return lodash.mergeWith.apply(void 0, [{}].concat(objects, [function (obj, src) {
    if (lodash.isArray(obj)) {
      return lodash.uniqWith(obj.concat(src), lodash.isEqual);
    }
  }]));
};

function isHexColor(hex) {
  var replaced = hex.replace('#', '');

  if (replaced.length === 3) {
    replaced = replaced.replace(/([\w])(\w)(\w)/g, '$1$1$2$2$3$3');
  }

  return typeof replaced === 'string' && replaced.length === 6 && !Number.isNaN(Number("0x" + replaced));
}

function hexToRgba(color) {
  var replaced = color.replace('#', '');
  var parsed = parseInt(replaced, 16);
  var r = parsed >> 16 & 255;
  var g = parsed >> 8 & 255;
  var b = parsed & 255;
  return {
    r: r,
    g: g,
    b: b,
    a: 1
  };
}

function rgbStringToRgba(color) {
  var _color$replace$split$ = color.replace(/[^0-9,.]/g, '').split(',').map(Number),
      r = _color$replace$split$[0],
      g = _color$replace$split$[1],
      b = _color$replace$split$[2],
      a = _color$replace$split$[3];

  return {
    r: r,
    g: g,
    b: b,
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

var _excluded$2 = ["values", "unit", "step"];

function createBreakpoints(breakpoints) {
  var _breakpoints$values = breakpoints.values,
      values = _breakpoints$values === void 0 ? {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  } : _breakpoints$values,
      _breakpoints$unit = breakpoints.unit,
      unit = _breakpoints$unit === void 0 ? 'px' : _breakpoints$unit,
      _breakpoints$step = breakpoints.step,
      step = _breakpoints$step === void 0 ? 5 : _breakpoints$step,
      other = _objectWithoutPropertiesLoose(breakpoints, _excluded$2);

  var keys = Object.keys(values);

  function up(key) {
    var value = typeof values[key] === 'number' ? values[key] : key;
    return "@media (min-width:" + value + unit + ")";
  }

  function down(key) {
    var value = typeof values[key] === 'number' ? values[key] : key;
    return "@media (max-width:" + (+value - step / 100) + unit + ")";
  }

  function between(start, end) {
    var endIndex = keys.indexOf(end);
    return "@media (min-width:" + (typeof values[start] === 'number' ? values[start] : start) + unit + ") and " + ("(max-width:" + (+(endIndex !== -1 && typeof values[keys[endIndex]] === 'number' ? values[keys[endIndex]] : end) - step / 100) + unit + ")");
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

  var methods = {
    up: up,
    down: down
  };
  var breaks = ['xs', 'sm', 'md', 'lg', 'xl'];
  var media = {};
  ['up', 'down'].forEach(function (method) {
    breaks.forEach(function (bre) {
      if (!media[method]) {
        media[method] = {};
      }

      media[method][bre] = methods[method](bre).replace(/@media\s*\((.*)\)/g, '$1');
    });
  });
  return mergeObjects({
    keys: keys,
    values: values,
    up: up,
    down: down,
    between: between,
    only: only,
    width: width,
    unit: unit,
    media: media
  }, other);
}

function clamp(value, min, max) {
  if (min === void 0) {
    min = 0;
  }

  if (max === void 0) {
    max = 1;
  }

  return Math.min(Math.max(min, value), max);
}

function hexToRgb(color) {
  color = color.substr(1);
  var re = new RegExp(".{1," + (color.length >= 6 ? 2 : 1) + "}", 'g');
  var colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map(function (n) {
      return n + n;
    });
  }

  return colors ? "rgb" + (colors.length === 4 ? 'a' : '') + "(" + colors.map(function (n, index) {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1000) / 1000;
  }).join(', ') + ")" : '';
}

function intToHex(_int) {
  var hex = _int.toString(16);

  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(color) {
  if (color.indexOf('#') === 0) {
    return color;
  }

  var _decomposeColor = decomposeColor(color),
      values = _decomposeColor.values;

  return "#" + (values || []).map(function (n) {
    return intToHex(n);
  }).join('');
}
function hslToRgb(color) {
  color = decomposeColor(color);
  var _color = color,
      values = _color.values;
  var h = values[0];
  var s = values[1] / 100;
  var l = values[2] / 100;
  var a = s * Math.min(l, 1 - l);

  var f = function f(n, k) {
    if (k === void 0) {
      k = (n + h / 30) % 12;
    }

    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };

  var type = 'rgb';
  var rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (color.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({
    type: type,
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

  var marker = color.indexOf('(');
  var type = color.substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error("Unsupported " + color + " color. The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().");
  }

  var values = color.substring(marker + 1, color.length - 1);
  var colorSpace;

  if (type === 'color') {
    values = values.split(' ');
    colorSpace = values.shift();

    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].substr(1);
    }

    if (['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1) {
      throw new Error("Material-UI: unsupported " + colorSpace + " color space. The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.");
    }
  } else {
    values = values.split(',');
  }

  values = values.map(function (value) {
    return parseFloat(value);
  });
  return {
    type: type,
    values: values,
    colorSpace: colorSpace
  };
}
function recomposeColor(color) {
  var type = color.type,
      colorSpace = color.colorSpace;
  var values = color.values;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map(function (n, i) {
      return i < 3 ? parseInt(n, 10) : n;
    });
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = values[1] + "%";
    values[2] = values[2] + "%";
  }

  if (type.indexOf('color') !== -1) {
    values = colorSpace + " " + values.join(' ');
  } else {
    values = "" + values.join(', ');
  }

  return type + "(" + values + ")";
}
function getContrastRatio(foreground, background) {
  var lumA = getLuminance(foreground);
  var lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function getLuminance(color) {
  color = decomposeColor(color);
  var rgb = color.type === 'hsl' ? decomposeColor(hslToRgb(color)).values : color.values;
  rgb = rgb.map(function (val) {
    if (color.type !== 'color') {
      val /= 255;
    }

    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function emphasize(color, coefficient) {
  if (coefficient === void 0) {
    coefficient = 0.15;
  }

  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
function alpha(color, value) {
  color = decomposeColor(color);
  value = clamp(value);

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }

  if (color.type === 'color') {
    color.values[3] = "/" + value;
  } else {
    color.values[3] = value;
  }

  return recomposeColor(color);
}
function darken(color, coefficient) {
  if (coefficient === void 0) {
    coefficient = 0.2 * 1.5;
  }

  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') !== -1 || color.type.indexOf('color') !== -1) {
    for (var i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }

  return recomposeColor(color);
}
function lighten(color, coefficient) {
  if (coefficient === void 0) {
    coefficient = 0.2;
  }

  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') !== -1) {
    for (var i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  } else if (color.type.indexOf('color') !== -1) {
    for (var _i = 0; _i < 3; _i += 1) {
      color.values[_i] += (1 - color.values[_i]) * coefficient;
    }
  }

  return recomposeColor(color);
}

var blue = {
  '00': '#e3f2fd',
  80: '#1e88e5',
  100: '#0d47a1'
};

var common = {
  black: '#000',
  white: '#fff'
};

var green = {
  '00': '#F2F8F2',
  10: '#D9ECD9',
  80: '#4FA04F',
  100: '#337E34'
};

var grey = {
  '00': '#FFFFFF',
  '05': '#F9FAFB',
  10: '#EEEEEE',
  20: '#E4E7EC',
  40: '#999999',
  60: '#828282',
  80: '#414141',
  100: '#242424'
};

var orange = {
  '00': '#FFF7EA',
  80: '#FFBD58',
  100: '#FFAB2B'
};

var red = {
  '00': '#FEEAE8',
  80: '#FC361E',
  100: '#FF0032'
};

var _excluded$1 = ["primary", "secondary", "error", "warning", "info", "success", "white", "black", "mode", "contrastThreshold", "tonalOffset"];
var dark;
var light;

function addLightOrDark(intent, direction, shade, tonalOffset) {
  var tonalOffsetLight = tonalOffset.light || tonalOffset;
  var tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

  if (!intent[direction]) {
    if (Object.prototype.hasOwnProperty.call(intent, shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'lightest') {
      intent.lightest = lighten(intent.main, 0.8);
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffsetDark);
    } else if (direction === 'darkest') {
      intent.darkest = darken(intent.main, 0.8);
    }
  }
}

var getContrastText = function getContrastText(background, contrastThreshold) {
  var _dark$text, _dark$text2, _light$text;

  if (contrastThreshold === void 0) {
    contrastThreshold = 3;
  }

  var contrastText = getContrastRatio(background, ((_dark$text = dark.text) == null ? void 0 : _dark$text.main) || '') >= contrastThreshold ? (_dark$text2 = dark.text) == null ? void 0 : _dark$text2.main : (_light$text = light.text) == null ? void 0 : _light$text.main;
  return contrastText;
};
var augmentColor = function augmentColor(_ref, tonalOffset, contrastThreshold) {
  var color = _ref.color,
      _ref$mainShade = _ref.mainShade,
      mainShade = _ref$mainShade === void 0 ? 500 : _ref$mainShade,
      _ref$lightShade = _ref.lightShade,
      lightShade = _ref$lightShade === void 0 ? 300 : _ref$lightShade,
      _ref$darkShade = _ref.darkShade,
      darkShade = _ref$darkShade === void 0 ? 700 : _ref$darkShade;

  if (tonalOffset === void 0) {
    tonalOffset = 0.2;
  }

  if (contrastThreshold === void 0) {
    contrastThreshold = 3;
  }

  color = lodash.isString(color) ? {
    main: color
  } : _extends({}, color);

  if (!color.main && color[mainShade]) {
    color.main = color[mainShade];
  }

  addLightOrDark(color, 'lightest', lightShade, tonalOffset);
  addLightOrDark(color, 'light', lightShade, tonalOffset);
  addLightOrDark(color, 'dark', darkShade, tonalOffset);
  addLightOrDark(color, 'darkest', darkShade, tonalOffset);

  if (!color.text && dark && light) {
    color.text = getContrastText(color.main, contrastThreshold);
  }

  return color;
};
light = {
  logo: augmentColor({
    color: '#008146'
  }),
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
  logo: augmentColor({
    color: '#FFFFFF'
  }),
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
    dark: grey[80],
    darkest: grey[100],
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
  var _palette$primary = palette.primary,
      primary = _palette$primary === void 0 ? {
    lightest: '#D9ECD9',
    light: green[80],
    main: green[100],
    dark: darken(green[100])
  } : _palette$primary,
      _palette$secondary = palette.secondary,
      secondary = _palette$secondary === void 0 ? {
    light: grey[60],
    main: grey[80],
    dark: grey[100]
  } : _palette$secondary,
      _palette$error = palette.error,
      error = _palette$error === void 0 ? {
    light: red[80],
    main: red[100],
    dark: darken(red[100])
  } : _palette$error,
      _palette$warning = palette.warning,
      warning = _palette$warning === void 0 ? {
    light: orange[80],
    main: orange[100],
    dark: darken(orange[100]),
    text: 'white'
  } : _palette$warning,
      _palette$info = palette.info,
      info = _palette$info === void 0 ? {
    light: blue[80],
    main: blue[100],
    dark: darken(blue[100])
  } : _palette$info,
      _palette$success = palette.success,
      success = _palette$success === void 0 ? {
    light: green[10],
    main: green[80],
    dark: green[100]
  } : _palette$success,
      _palette$mode = palette.mode,
      mode = _palette$mode === void 0 ? 'light' : _palette$mode,
      _palette$contrastThre = palette.contrastThreshold,
      contrastThreshold = _palette$contrastThre === void 0 ? 3 : _palette$contrastThre,
      _palette$tonalOffset = palette.tonalOffset,
      tonalOffset = _palette$tonalOffset === void 0 ? 0.2 : _palette$tonalOffset,
      other = _objectWithoutPropertiesLoose(palette, _excluded$1);

  var modes = {
    dark: dark,
    light: light
  };
  var paletteOutput = mergeObjects({
    common: common,
    mode: mode,
    primary: augmentColor({
      color: primary
    }, tonalOffset, contrastThreshold),
    secondary: augmentColor({
      color: secondary
    }, tonalOffset, contrastThreshold),
    error: augmentColor({
      color: error
    }, tonalOffset, contrastThreshold),
    warning: augmentColor({
      color: warning
    }, tonalOffset, contrastThreshold),
    info: augmentColor({
      color: info
    }, tonalOffset, contrastThreshold),
    success: augmentColor({
      color: success
    }, tonalOffset, contrastThreshold),
    grey: grey,
    contrastThreshold: contrastThreshold,
    getContrastText: getContrastText,
    augmentColor: augmentColor,
    tonalOffset: tonalOffset
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

var DEFAULT_GRADIENT = {
  from: 'primary',
  to: 'secondary',
  deg: 45
};
function colorVariant(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'primary' : _ref$color,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'filled' : _ref$variant,
      gradient = _ref.gradient;

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
    var merged = {
      from: (gradient == null ? void 0 : gradient.from) || DEFAULT_GRADIENT.from,
      to: (gradient == null ? void 0 : gradient.to) || DEFAULT_GRADIENT.to,
      deg: (gradient == null ? void 0 : gradient.deg) || DEFAULT_GRADIENT.deg
    };

    if (!(merged.from in YOMTOR_COLORS) || !(merged.to in YOMTOR_COLORS)) {
      return null;
    }

    return {
      background: "linear-gradient(" + merged.deg + "deg, " + this.palette[merged.from].main + " 0%, " + this.palette[merged.to].main + " 100%)",
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

function rgba(color, alpha) {
  if (alpha === void 0) {
    alpha = 1;
  }

  if (typeof color !== 'string' || alpha > 1 || alpha < 0) {
    return 'rgba(0, 0, 0, 1)';
  }

  if (color.startsWith('rgb(var(--')) {
    return color.replace(/(rgb)\((var\(--.*\))\)/g, "$1a($2, " + alpha + ")");
  }

  if (color.startsWith('rgba(var(--')) {
    color = this.vars[color];
  }

  var _toRgba = toRgba(color),
      r = _toRgba.r,
      g = _toRgba.g,
      b = _toRgba.b;

  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

var size = function size(args) {
  if (!isNaN(+args.size)) {
    return +args.size;
  }

  return args.sizes[args.size] || args.size || args.sizes.md;
};

function createSizes() {
  return {
    "default": {
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

var _excluded = ["palette", "breakpoints", "type", "typography"];
var VARS = {};

var getStyleTag = function getStyleTag() {
  var tag = document.getElementById('Yomtor-theme');

  if (tag) {
    return tag;
  }

  tag = document.createElement('style');
  tag.id = 'yomtor-theme';
  document.head.append(tag);
  return tag;
};

var generateStyle = function generateStyle(vars) {
  if (vars === void 0) {
    vars = {};
  }

  var tag = getStyleTag();
  var css = [];
  Object.keys(vars).forEach(function (property) {
    var value = vars[property].toString();

    if (isColor(value)) {
      var _toRgba = toRgba(value),
          r = _toRgba.r,
          g = _toRgba.g,
          b = _toRgba.b,
          a = _toRgba.a;

      if (a == 1) {
        value = r + ", " + g + ", " + b;
      }
    }

    css.push(property + ": " + value + ";");
  });
  tag.innerHTML = "\n    :root{\n      \n" + css.join('\n') + "\n\n    }\n    body, html{\n      height: 100%\n    }\n    body {\n      background: rgb(var(--background-main));\n      color: rgb(var(--text-main));\n      font-family: var(--fontFamily);\n      font-size: var(--fontFamily-md);\n    }\n  ";
};

var getVars = function getVars(tree, preffix, replace) {
  if (preffix === void 0) {
    preffix = '-';
  }

  if (replace === void 0) {
    replace = false;
  }

  var leaves = {};

  var walk = function walk(obj, path) {
    path = path || '';

    for (var n in obj) {
      if (obj.hasOwnProperty(n)) {
        if (typeof obj[n] === 'object' || obj[n] instanceof Array) {
          walk(obj[n], path + '-' + n);
        } else if (lodash.isString(obj[n]) || lodash.isNumber(obj[n])) {
          leaves[path + '-' + n] = obj[n];

          if (replace) {
            var val = "var(" + (path + '-' + n) + ")";

            if (isColor(obj[n].toString())) {
              var _toRgba2 = toRgba(obj[n]),
                  a = _toRgba2.a;

              if (a == 1) {
                val = "rgb(" + val + ")";
              }
            }

            VARS[val] = obj[n];
            obj[n] = val;
          }
        }
      }
    }
  };

  walk(tree, preffix);
  return leaves;
};

var updateCssVars = function updateCssVars(theme) {
  generateStyle(_extends({}, getVars(theme.palette, '-', true), getVars(theme.breakpoints.media), getVars(theme.typography), getVars({
    spacing: Object.keys(theme.spacing).reduce(function (stack, current) {
      stack[current] = theme.spacing[current] + "px";
      return stack;
    }, {})
  })));
};

var createTheme = function createTheme(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$palette = _options.palette,
      paletteInput = _options$palette === void 0 ? {} : _options$palette,
      _options$breakpoints = _options.breakpoints,
      breakPointsInput = _options$breakpoints === void 0 ? {} : _options$breakpoints,
      _options$type = _options.type,
      mode = _options$type === void 0 ? 'light' : _options$type,
      other = _objectWithoutPropertiesLoose(_options, _excluded);

  var palette = createPalette(mergeObjects(paletteInput, {
    mode: mode
  }));
  var breakpoints = createBreakpoints(breakPointsInput);
  var spacing = createSpacing();
  var sizes = createSizes();
  var radius = createRadius();
  var headings = createHeadings();
  var shadows = createShadows();
  var typography = createTypography();
  var theme = {};
  Object.assign(theme, mergeObjects({
    palette: palette,
    breakpoints: breakpoints,
    shadows: shadows,
    spacing: spacing,
    sizes: sizes,
    radius: radius,
    headings: headings,
    typography: typography,
    type: mode,
    fn: {
      size: size,
      rgba: rgba.bind(Object.assign({
        vars: VARS
      })),
      colorVariant: colorVariant.bind(theme)
    }
  }, other));
  updateCssVars(theme);
  return theme;
};

var YomtorThemeContext = React.createContext({
  theme: null,
  styles: {},
  emotionOptions: {
    key: 'yomtor',
    prepend: true
  }
});
function useYomtorTheme() {
  var _useContext;

  return (_useContext = React.useContext(YomtorThemeContext)) == null ? void 0 : _useContext.theme;
}
function useYomtorThemeStyles() {
  var _useContext2;

  return ((_useContext2 = React.useContext(YomtorThemeContext)) == null ? void 0 : _useContext2.styles) || {};
}
function useYomtorEmotionOptions() {
  var _useContext3;

  return ((_useContext3 = React.useContext(YomtorThemeContext)) == null ? void 0 : _useContext3.emotionOptions) || {
    key: 'yomtor',
    prepend: true
  };
}

function GlobalStyles() {
  useYomtorTheme();
  return React__default["default"].createElement(react.Global, {
    styles: {
      '*, *::before, *::after': {
        boxSizing: 'border-box'
      },
      body: {
        /*...theme.fn.fontStyles(),
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.white,
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.black,
        lineHeight: theme.lineHeight,
        fontSize: theme.fontSizes.md
        */
      }
    }
  });
}

function YomyerProvider(_ref) {
  var theme = _ref.theme,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      emotionOptions = _ref.emotionOptions,
      _ref$withNormalizeCSS = _ref.withNormalizeCSS,
      withNormalizeCSS = _ref$withNormalizeCSS === void 0 ? false : _ref$withNormalizeCSS,
      _ref$withGlobalStyles = _ref.withGlobalStyles,
      withGlobalStyles = _ref$withGlobalStyles === void 0 ? false : _ref$withGlobalStyles,
      children = _ref.children;
  theme = createTheme(theme);
  return React__default["default"].createElement(YomtorThemeContext.Provider, {
    value: {
      theme: theme,
      styles: styles,
      emotionOptions: emotionOptions
    }
  }, withNormalizeCSS && React__default["default"].createElement(NormalizeCSS, null), withGlobalStyles && React__default["default"].createElement(GlobalStyles, null), children);
}
YomyerProvider.displayName = '@yomyer/core/YomyerProvider';

function useGuaranteedMemo(fn, deps) {
  var ref = React.useRef();

  if (!ref.current || deps.length !== ref.current.prevDeps.length || ref.current.prevDeps.map(function (v, i) {
    return v === deps[i];
  }).indexOf(false) >= 0) {
    ref.current = {
      v: fn(),
      prevDeps: [].concat(deps)
    };
  }

  return ref.current.v;
}

var defaultCacheOptions = {
  key: 'yomtor',
  prepend: true
};

var _ref$1 = function () {
  var cache;
  var _key = defaultCacheOptions.key;

  function _getCache(options) {
    if (cache === undefined || _key !== (options == null ? void 0 : options.key)) {
      _key = (options == null ? void 0 : options.key) || 'yomtor';
      cache = createCache__default["default"](options || defaultCacheOptions);
    }

    return cache;
  }

  return {
    getCache: _getCache
  };
}(),
    getCache = _ref$1.getCache;
function useEmotionCache() {
  var options = useYomtorEmotionOptions();
  return getCache(options);
}

var refPropertyName = 'ref';

function getRef(args) {
  var ref;

  if (args.length !== 1) {
    return {
      args: args,
      ref: ref
    };
  }

  var arg = args[0];

  if (!(arg instanceof Object)) {
    return {
      args: args,
      ref: ref
    };
  }

  if (!(refPropertyName in arg)) {
    return {
      args: args,
      ref: ref
    };
  }

  ref = arg[refPropertyName];

  var argCopy = _extends({}, arg);

  delete argCopy[refPropertyName];
  return {
    args: [argCopy],
    ref: ref
  };
}

var _ref = function () {
  function merge(registered, css, className) {
    var registeredStyles = [];
    var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);

    if (registeredStyles.length < 2) {
      return className;
    }

    return rawClassName + css(registeredStyles);
  }

  function _cssFactory(params) {
    var cache = params.cache;

    var css = function css() {
      var _getRef = getRef([].slice.call(arguments)),
          ref = _getRef.ref,
          args = _getRef.args;

      var serialized = serialize.serializeStyles(args, cache.registered);
      utils.insertStyles(cache, serialized, false);
      return cache.key + "-" + serialized.name + (ref === undefined ? '' : " " + ref);
    };

    var cx = function cx() {
      return merge(cache.registered, css, clsx__default["default"]([].slice.call(arguments)));
    };

    return {
      css: css,
      cx: cx
    };
  }

  return {
    cssFactory: _cssFactory
  };
}(),
    cssFactory = _ref.cssFactory;
function useCss() {
  var cache = useEmotionCache();
  return useGuaranteedMemo(function () {
    return cssFactory({
      cache: cache
    });
  }, [cache]);
}

function mergeClassNames(cx, classes, classNames, name) {
  return Object.keys(classes).reduce(function (acc, className) {
    acc[className] = cx(classes[className], classNames != null && classNames[className], name ? "yomtor-" + name + "-" + className : null);
    return acc;
  }, {});
}

function fromEntries(entries) {
  var o = {};
  Object.keys(entries).forEach(function (key) {
    var _entries$key = entries[key],
        k = _entries$key[0],
        v = _entries$key[1];
    o[k] = v;
  });
  return o;
}

function createStyles(getCssObjectOrCssObject) {
  var getCssObject = typeof getCssObjectOrCssObject === 'function' ? getCssObjectOrCssObject : function () {
    return getCssObjectOrCssObject;
  };

  function useStyles(params, options) {
    var theme = useYomtorTheme();
    var themeStyles = useYomtorThemeStyles()[options == null ? void 0 : options.name];

    var _useCss = useCss(),
        css = _useCss.css,
        cx = _useCss.cx;

    var count = 0;

    function createRef(refName) {
      count += 1;
      return "yomtor-ref_" + (refName || '') + "_" + count;
    }

    var cssObject = getCssObject(theme, params, createRef);

    var _styles = typeof (options == null ? void 0 : options.styles) === 'function' ? options == null ? void 0 : options.styles(theme) : (options == null ? void 0 : options.styles) || {};

    var _themeStyles = typeof themeStyles === 'function' ? themeStyles(theme) : themeStyles || {};

    var classes = fromEntries(Object.keys(cssObject).map(function (key) {
      var mergedStyles = cx(css(cssObject[key]), css(_themeStyles[key]), css(_styles[key]));
      return [key, mergedStyles];
    }));
    return {
      classes: mergeClassNames(cx, classes, options == null ? void 0 : options.classNames, options == null ? void 0 : options.name),
      cx: cx,
      theme: theme
    };
  }

  return useStyles;
}

exports.NormalizeCSS = NormalizeCSS;
exports.YOMTOR_COLORS = YOMTOR_COLORS;
exports.YOMTOR_SIZES = YOMTOR_SIZES;
exports.YOMTOR_VARIANTS = YOMTOR_VARIANTS;
exports.Yomtor_LEVELS = Yomtor_LEVELS;
exports.YomyerProvider = YomyerProvider;
exports.alpha = alpha;
exports.blue = blue;
exports.colorVariant = colorVariant;
exports.common = common;
exports.createBreakpoints = createBreakpoints;
exports.createHeadings = createHeadings;
exports.createPalete = createPalette;
exports.createRadius = createRadius;
exports.createShadows = createShadows;
exports.createSizes = createSizes;
exports.createSpacing = createSpacing;
exports.createStyles = createStyles;
exports.createTheme = createTheme;
exports.createTypography = createTypography;
exports.cssFactory = cssFactory;
exports.darken = darken;
exports.decomposeColor = decomposeColor;
exports.emphasize = emphasize;
exports.fromEntries = fromEntries;
exports.getCache = getCache;
exports.getContrastRatio = getContrastRatio;
exports.getLuminance = getLuminance;
exports.green = green;
exports.grey = grey;
exports.hexToRgb = hexToRgb;
exports.hslToRgb = hslToRgb;
exports.isColor = isColor;
exports.isNumeric = isNumeric;
exports.lighten = lighten;
exports.mergeClassNames = mergeClassNames;
exports.mergeObjects = mergeObjects;
exports.orange = orange;
exports.recomposeColor = recomposeColor;
exports.red = red;
exports.rgbToHex = rgbToHex;
exports.rgba = rgba;
exports.size = size;
exports.toRgba = toRgba;
exports.useCss = useCss;
exports.useEmotionCache = useEmotionCache;
exports.useGuaranteedMemo = useGuaranteedMemo;
exports.useYomtorEmotionOptions = useYomtorEmotionOptions;
exports.useYomtorTheme = useYomtorTheme;
exports.useYomtorThemeStyles = useYomtorThemeStyles;
//# sourceMappingURL=index.js.map
