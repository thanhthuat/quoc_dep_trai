import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getClassName } from '../../../utils/StyleUtils';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Tooltip from '@material-ui/core/Tooltip';

const availablePlacements = ['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'];

class CustomTooltip extends React.Component {

    render() {
        const { classes, children, title, placement, noneWrap, center, className, Comp, style } = this.props;
        if (!children) { return null; }
        if (!title && !Comp) { return children; }
        const styleClass = style ? getClassName(style) : '';
        const ttClass = classNames({
            [classes.tooltip]: !noneWrap,
            [classes.noMaxWidth]: !!Comp || noneWrap,
            [classes.center]: center,
        }, styleClass, className);
        const ttProps = { title: Comp || title, placement: placement || 'top', classes: { tooltip: ttClass } };
        return (<Tooltip {...ttProps}>{children}</Tooltip>);
    }

}

CustomTooltip.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    placement: PropTypes.oneOf(availablePlacements),
    noneWrap: PropTypes.bool,
    center: PropTypes.bool,
    className: PropTypes.any,
};

export default withStyles(styles)(CustomTooltip);