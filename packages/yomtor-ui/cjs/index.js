import { createStyles, useSx } from '@yomtor/styles';
import { isUndefined } from 'lodash';
import { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
import Ink from 'react-ink';

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

var BlockStyles = createStyles(function (_, _ref) {
  var padding = _ref.padding,
      margin = _ref.margin,
      actived = _ref.actived,
      gap = _ref.gap;
  return {
    root: {
      width: '100%',
      height: 'inherit',
      minHeight: 'inherit',
      maxHeight: 'inherit',
      display: 'flex',
      boxSizing: 'border-box',
      placeContent: 'center space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: "0 " + padding + "px",
      margin: margin + "px 0",
      gap: gap,
      pointerEvents: !isUndefined(actived) && (actived ? 'all' : 'none') || false,
      '& > *': {
        width: '100%'
      }
    }
  };
});

var _excluded$2 = ["children", "visible"];
/**
 * Description
 */

var Block = function Block(_ref) {
  var children = _ref.children,
      visible = _ref.visible,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  var _BlockStyles = BlockStyles(_extends({}, props)),
      classes = _BlockStyles.classes;

  return react(Fragment, null, visible ? react("div", {
    className: classes.root
  }, children) : null);
};
Block.defaultProps = {
  visible: true,
  gap: 10,
  margin: 10,
  padding: 10
};

var ButtonStyles = createStyles(function (theme, _ref) {
  var fullWidth = _ref.fullWidth,
      hovered = _ref.hovered,
      hoverOpacity = _ref.hoverOpacity;
  console.log(hoverOpacity, theme.palette.divider);
  return {
    root: {
      minHeight: 22,
      cursor: 'pointer',
      position: 'relative',
      border: 'none',
      width: fullWidth && '100%',
      outline: 'none',
      background: 'none',
      color: 'inherit',
      userSelect: 'none',
      height: 'inherit',
      fontSize: 'inherit',
      display: fullWidth ? 'flex' : 'inline-flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      padding: 0,
      opacity: 1
    },
    content: {
      display: 'flex',
      position: 'relative'
    },
    hover: {
      borderRadius: 'inherit',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      pointerEvents: 'none',
      transition: 'background 0.2s ease-in-out',
      background: hovered && theme.fn.rgba(theme.palette.divider, hoverOpacity)
    }
  };
});

function useHover() {
  var _useState = useState(false),
      hovered = _useState[0],
      setHovered = _useState[1];

  var ref = useRef(null);
  var onMouseEnter = useCallback(function () {
    return setHovered(true);
  }, []);
  var onMouseLeave = useCallback(function () {
    return setHovered(false);
  }, []);
  useEffect(function () {
    if (ref.current) {
      ref.current.addEventListener('mouseenter', onMouseEnter);
      ref.current.addEventListener('mouseleave', onMouseLeave);
      return function () {
        var _ref$current, _ref$current2;

        (_ref$current = ref.current) == null ? void 0 : _ref$current.removeEventListener('mouseenter', onMouseEnter);
        (_ref$current2 = ref.current) == null ? void 0 : _ref$current2.removeEventListener('mouseleave', onMouseLeave);
      };
    }

    return undefined;
  }, []);
  return {
    ref: ref,
    hovered: hovered
  };
}

var useSetRef = function useSetRef(node, refNode, ref) {
  refNode.current = node;

  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    ref.current = node;
  }
};

var _excluded$1 = ["className", "sx", "style", "component"];
var Box = forwardRef(function (_ref, ref) {
  var className = _ref.className,
      sx = _ref.sx,
      style = _ref.style,
      _ref$component = _ref.component,
      Element = _ref$component === void 0 ? 'div' : _ref$component,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  return react(Element, _extends({
    ref: ref,
    className: useSx(sx, className),
    style: style
  }, props));
});

var _excluded = ["component", "classNames", "styles", "children"];
var Button = forwardRef(function (_ref, _ref2) {
  var _ref$component = _ref.component,
      component = _ref$component === void 0 ? 'button' : _ref$component,
      classNames = _ref.classNames,
      styles = _ref.styles,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useHover = useHover(),
      hovered = _useHover.hovered,
      button = _useHover.ref;

  var _ButtonStyles = ButtonStyles(_extends({
    hovered: hovered
  }, props), {
    classNames: classNames,
    styles: styles,
    name: 'Button'
  }),
      classes = _ButtonStyles.classes;

  return react(Box, _extends({
    component: component,
    ref: function ref(node) {
      return useSetRef(node, button, _ref2);
    },
    className: classes.root
  }, props), react("span", {
    className: classes.hover
  }), react("span", {
    className: classes.content
  }, children), react(Ink, {
    hasTouch: false,
    opacity: 0.05
  }));
});
Button.defaultProps = {
  hoverOpacity: 0.06
};

export { Block, Button };
//# sourceMappingURL=index.js.map
