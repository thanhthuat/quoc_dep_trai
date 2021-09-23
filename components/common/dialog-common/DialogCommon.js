import React from 'react';
import PropTypes from 'prop-types';

// utils
import { i18nText } from '../../../utils/StringUtils';
import { normalizeComponent } from '../../../utils/StyleUtils';

// styles
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

// @material-ui
import Dialog from '@material-ui/core/Dialog';

// components
import { ImageViewer, TextButton } from '..';

// assets
const iconCloseDialog = require('../../../assets/icons/common/ic_remove_gray.png');

class DialogCommon extends React.Component {

    constructor(props) {
        super(props);
        this.is_mounted = true;
    };

    componentDidMount() { window.addEventListener('keypress', this.handleKeyPress); };
    componentWillUnmount() { this.is_mounted = false; window.removeEventListener('keypress', this.handleKeyPress); };

    handleKeyPress = event => {
        if (this.is_mounted) {
            var code = event.keyCode || event.which;
            if (code === 13) {
                event.preventDefault();
                event.stopPropagation();
                this.props.onAccept();
            }
        }
    };

    render() {
        const { classes, Comp, msg, cancelable, acceptable, title, maxWidth, contentWrapper } = this.props;
        const dialogProps = { open: true, maxWidth: maxWidth || 'sm', classes: { paper: classes.paper }, onClose: this.props.onClose };
        return (
            <Dialog {...dialogProps}>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <span className={classes.title}>{title || i18nText('confirm')}</span>
                        <ImageViewer src={iconCloseDialog} onClick={this.props.onClose} />
                    </div>
                    <div className={classes.content} style={{ ...(contentWrapper || {}) }}>
                        {Comp ? normalizeComponent(Comp) : (msg || i18nText('...'))}
                    </div>
                    {(cancelable || acceptable) &&
                        <div className={classes.action}>
                            {cancelable && <TextButton text={i18nText('cancel')} noMargin onClick={this.props.onClose} />}
                            {acceptable &&
                                <TextButton
                                    text={i18nText('agree')}
                                    noMargin color={'main'}
                                    onClick={this.props.onAccept}
                                />
                            }
                        </div>
                    }
                </div>
            </Dialog>
        );
    };
}

DialogCommon.propTypes = {
    title: PropTypes.string,
    Comp: PropTypes.any,
    msg: PropTypes.string,
    cancelable: PropTypes.bool,
    onClose: PropTypes.func,
    onAccept: PropTypes.func,
};

DialogCommon.defaultProps = {
    onClose: () => { },
    onAccept: () => { },
    cancelable: true,
    acceptable: true,
};

export default withStyles(styles)(DialogCommon);