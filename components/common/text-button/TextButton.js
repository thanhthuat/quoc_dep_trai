import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// styles
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../../assets/styles/Theme';

// components
import Tooltip from '../tooltip/Tooltip';

class TextButton extends React.Component {

    render() {
        const { classes, className, style, text, color, tooltip, noneMargin } = this.props;
        if (!text) { return null; }
        const textStyle = { ...(noneMargin && { margin: 0 }), ...(style || {}) };
        if (color) { textStyle.color = color === 'main' ? colors.main : color; }
        const btn_content = (
            <span className={classNames(classes.button, className)} style={textStyle} onClick={this.props.onClick}>
                {text}
            </span>
        );
        if (tooltip) { return <Tooltip {...tooltip}>{btn_content}</Tooltip>; }
        return btn_content;
    };

}

TextButton.propTypes = {
    onClick: () => { },
    text: PropTypes.string,
    color: PropTypes.string,
    noneMargin: PropTypes.bool,
};

export default withStyles(styles)(TextButton);