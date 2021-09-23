import React from 'react';
import { FoldingCube } from 'better-react-spinkit';
import { styles } from './styles';
import { colors } from '../../../assets/styles/Theme';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const clean_bg_style = { backgroundColor: 'transparent' }
const clean_container_style = { backgroundColor: 'transparent', borderRadius: 0, boxShadow: 'none' }

class OverlaySpinkit extends React.Component {

    render() {
        const { classes, id, bg_style, style, clean_bg, clean_container } = this.props;
        let spinkit_bg_style = { display: 'none' }, spinkit_container_style = {}
        if (bg_style) { spinkit_bg_style = { ...bg_style } }
        if (clean_bg) { spinkit_bg_style = { ...spinkit_bg_style, ...clean_bg_style } }
        if (style) { spinkit_container_style = { ...spinkit_container_style, ...style } }
        if (clean_container) { spinkit_container_style = { ...spinkit_container_style, ...clean_container_style } }
        return (
            <div id={id || 'overlaySpinner'} className={classes.spinkit_overlay} style={spinkit_bg_style}>
                <Paper className={classes.spinkit_wrapper} style={spinkit_container_style}>
                    <FoldingCube size={30} color={colors.main} />
                </Paper>
            </div>
        );
    }

}

export default withStyles(styles)(OverlaySpinkit);