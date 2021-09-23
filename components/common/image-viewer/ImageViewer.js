import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

import { isNumber } from '../../../utils/Utils';
import { getSvgStyle, getClassName, getColor } from '../../../utils/StyleUtils';

import { cStyles } from '../../../assets/styles';
import { imgSizes } from '../../../assets/styles/Theme';

const defaultErrorImg = require('../../../assets/images/common/img_error.png');

class ImageViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: props.src,
            errored: false,
        };
    };

    componentDidUpdate(prevProps) {
        const { src } = this.props;
        if (src !== prevProps.src) {
            this.setState({ src, errored: false });
        }
    };

    handleError = () => {
        const { errored } = this.state;
        const { fallbackSrc } = this.props;
        if (!errored) {
            this.setState({ src: fallbackSrc || defaultErrorImg, errored: true, });
        }
    };

    handleOnClick = (isFunc, e) => {
        const { onClick } = this.props;
        if (isFunc) { onClick(e); }
    };

    render() {
        const { src } = this.state;
        const {
            style, size, className, onClick, onMouseOver, onMouseLeave, color, resizeMode,
            id, clickable, draggable, disable, circle, lazyload, bgImg, svg, minimum, type, selectable, overflow,
        } = this.props;
        const isFunc = typeof onClick === 'function';
        const imgWidth = size ? (isNumber(size) ? size + 'px' : size) : imgSizes[type || 'icon'];
        const imgCursor = disable ? 'not-allowed' : ((clickable || isFunc) ? 'pointer' : (draggable ? 'grab' : 'default'));
        const baseClass = getClassName({
            width: imgWidth,
            height: imgWidth,
            borderRadius: circle || type === 'avatar' ? '50%' : 'unset',
            objectFit: resizeMode,
            ...(!selectable && cStyles.noneUserSelect),
            ...(imgCursor !== 'default' && { cursor: imgCursor }),
            ...(disable && { opacity: 0.6 }),
            ...(minimum && { minWidth: imgWidth }),
            ...(overflow && { position: 'absolute' }),
        });
        const imgProps = {
            alt: '', className: classNames(baseClass, className),
            onMouseOver, onMouseLeave, onClick: (e) => this.handleOnClick(isFunc, e),
            ref: ref => { if (ref) this.props.onRef(ref) },
            ...(id && { id }),
        };
        if (bgImg) {
            imgProps.style = {
                backgroundImage: 'url(' + src + ')',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: resizeMode,
                ...style,
            };
            return <div {...imgProps}>{this.props.children}</div>;
        }
        if (svg) {
            if (color || svg.color) {
                const svgColor = getClassName(getSvgStyle({ ...svg, color: getColor(color || svg.color) }));
                imgProps.className = classNames(baseClass, svgColor, className);
            }
            return <ReactSVG  {...{ ...imgProps, ...svg, src, style }} />
        }
        if (lazyload) { imgProps.onError = this.handleError; }
        return <img {...{ ...imgProps, src, style }} />;
    };

}

ImageViewer.propTypes = {
    id: PropTypes.any,
    src: PropTypes.any,
    fallbackSrc: PropTypes.string,
    className: PropTypes.any,
    style: PropTypes.object,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    clickable: PropTypes.bool,
    draggable: PropTypes.bool,
    disable: PropTypes.bool,
    circle: PropTypes.bool,
    lazyload: PropTypes.bool,
    bgImg: PropTypes.bool,
    minimum: PropTypes.bool,
    type: PropTypes.string, // imgSizes;
    selectable: PropTypes.bool, // not disbale userSelect css;
    svg: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]), // https://github.com/tanem/react-svg/tree/master/examples/external-stylesheet
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

ImageViewer.defaultProps = {
    onRef: () => { },
    resizeMode: 'cover',
};

export default ImageViewer;