/******************************
 * @providesModule StyleUtils *
 * @created_by Kds            *
 ******************************/

import { css } from 'glamor';

import { textColors, colors } from '../assets/styles/Theme';

import { isArray, isFunction, isNumber } from './Utils';
import { getUploadFileUrl } from './StringUtils';

const mediaColTypes = ['avatar', 'image'];

export function getClassName(style) { return `${css(style)}`; }

export function getTextLineStyle(number, height, textOverflow) {
    let lineNumber = number || 1, lineHeight = height || '1.2rem', lineHeightValue = parseFloat(lineHeight);
    let maxHeight = `${lineNumber * lineHeightValue}${lineHeight.replace(lineHeightValue, '')}`;
    return {
        overflow: 'hidden',
        textOverflow: textOverflow || 'ellipsis',
        display: '-webkit-box',
        lineHeight: lineHeight,
        maxHeight: maxHeight,
        WebkitLineClamp: lineNumber,
        WebkitBoxOrient: 'vertical',
    }
}

export function getShadowStyle({ color, bgColor, gradient, disable, size, custom } = {}) {
    if (!color && !custom) { return; }
    const boxShadow = custom || `${size || '0px 4px 16px 0px'} ${color}`;
    const style = { boxShadow: boxShadow, WebkitBoxShadow: boxShadow, MozBoxShadow: boxShadow };
    if (bgColor) {
        if (gradient) {
            let gradientDirection = gradient.direction || 'to bottom';
            style.backgroundImage = `linear-gradient(${gradientDirection}, ${bgColor})`;
        } else {
            style.backgroundColor = bgColor;
        }
    }
    if (disable) { style.opacity = 0.6; }
    return style;
}

export function getTransitionStyle(transition) {
    return {
        MozTransition: transition,
        WebkitTransition: transition,
        OTransition: transition,
        transition: transition,
    };
}

export function getTransformStyle(transform) {
    return {
        WebkitTransform: transform,
        MsTransform: transform,
        transform: transform,
    };
}

export function getSvgStyle(option, callback) {
    const isFunc = isFunction(option);
    const { color, key, style } = option && !isFunc ? option : {};
    const selector = `& path[fill="${key || colors.primary}"]`;
    const cb = isFunc ? option : callback;
    return cb ? cb(selector) : { [selector]: { fill: color.indexOf('colors.') > -1 ? colors[color.split('.')[1]] : color, ...style } };
}

export function toRgbA(color, opacity) {
    let hex = getColor(color) || '', validInput = (/^#([A-Fa-f0-9]{3}){1,2}$/).test(hex);
    if (!validInput) {
        if (hex && hex.indexOf('rgb') > -1) {
            let rgbHash = hex.split('(')[1];
            if (rgbHash) {
                rgbHash = rgbHash.split(')')[0];
                if (rgbHash) {
                    rgbHash = rgbHash.split(',');
                    if (rgbHash.length === 3 || rgbHash.length === 4) {
                        let r = rgbHash[0], g = rgbHash[1], b = rgbHash[2];
                        return `rgba(${r},${g},${b},${opacity || rgbHash[3] || 1})`;
                    }
                }
            }
        }
        return hex;
    }
    let c = hex.substring(1).split('');
    if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity || 1})`;
}

export function getColor(id) {
    return colors[id] || id;
}

export function getErrorColor(isError) {
    return textColors[isError ? 'error' : 'primary'];
}

export function getHighlightColor(isHighlight) {
    return textColors[isHighlight ? 'info' : 'primary'];
}

export function getTableColumnSizes(columns) {
    let sizes = {};
    if (columns) {
        columns.forEach((col, index) => {
            if (col) {
                const { type, width, minWidth } = col;
                if (type === 'avatar' || type === 'image') {
                    sizes[index] = { updated: false, size: (type === 'avatar' ? 32 : 48) + 8 }; // paddingRight: 24px, marginRight: 8px;
                } else {
                    sizes[index] = { updated: false, size: minWidth || width || 100 };
                }
            } else {
                sizes[index] = { updated: false, size: 100 };
            }
        });
    }
    return sizes;
}

export function getTableColumnStyle(columnSize, { type, minWidth, width, maxWidth } = {}) {
    const isResized = columnSize && columnSize.updated, colWidth = columnSize && columnSize.size || 100;
    const isMediaCol = mediaColTypes.includes(type), mediaColWidth = isMediaCol ? ((type === 'avatar' ? 32 : 48) + 8) : 0;
    const colStyle = { width: `${mediaColWidth || (!isResized ? (minWidth || width || colWidth) : colWidth)}px` };
    if (!isMediaCol) {
        colStyle.flex = `${colWidth} 0 auto`;
        if (isResized || (!minWidth && (maxWidth || width))) {
            colStyle.maxWidth = `${isResized ? colWidth : (maxWidth || width)}px`;
        }
    }
    return colStyle;
}

export function isShowTableAction({ columns, actions, resizeable } = {}) {
    const lastColumn = columns[columns.length - 1];
    return isArray(actions, true) && lastColumn && lastColumn.type === 'action' && (resizeable || lastColumn.col);
}

function isClassComponent(component) {
    return (typeof component === 'function' && !!Object.getPrototypeOf(component).isReactComponent);
}

function isFunctionComponent(component) {
    return (typeof component === 'function' && String(component).includes('.createElement'));
}

function isReactComponent(component) {
    return (isClassComponent(component) || isFunctionComponent(component));
}

export function normalizeComponent(Comp, args, fallback = Comp) {
    return isReactComponent(Comp) ? <Comp {...(args && args.props)} /> : typeof Comp === 'function' ? Comp(args) : fallback;
}

export function handleScroll2Top(ref, options) { if (ref) { ref.scrollTo({ top: 0, left: 0, behavior: 'smooth', ...options }); } }

export function getBackgoundImg(info) {
    if (!info) return;
    return {
        backgroundColor: info?.background_color,
        backgroundImage: `url("${getUploadFileUrl(info?.background_image)}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
}

export function isBrowserPortrait() {
    let screenAngle = ((screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation)?.angle;
    return isNumber(screenAngle) ? screenAngle === 0 : window.matchMedia('(orientation: portrait)').matches;
}

export function getBorderSolid(size, color, opacity) {
    return `${size || 1}px solid ${toRgbA(color, opacity || 1) || colors.bgDefault}`;
}