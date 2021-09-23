import React from 'react';

// styles
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles.js';

// @material-ui/core
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

class Header extends React.Component {

    _renderHeaderLeft = () => {
        const { classes } = this.props;
        return (
            <Grid item xs={6} sm={6} md={3} className={classes.headerBox} style={{ backgroundColor: '#e74c3c' }}>
                Left
            </Grid>
        );
    };

    _renderHeaderCenter = () => {
        const { classes } = this.props;
        return (
            <Grid item xs={12} sm={12} md={6} className={classes.headerBox} style={{ backgroundColor: '#f1c40f' }}>
                Center
            </Grid>
        );
    };

    _renderHeaderRight = () => {
        const { classes } = this.props;
        return (
            <Grid item xs={6} sm={6} md={3} className={classes.headerBox} style={{ backgroundColor: '#3498db' }}>
                Right
            </Grid>
        );
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.wrapper}>

                <Hidden smDown>
                    {this._renderHeaderLeft()}
                    {this._renderHeaderCenter()}
                    {this._renderHeaderRight()}
                </Hidden>

                <Hidden mdUp>
                    {this._renderHeaderLeft()}
                    {this._renderHeaderRight()}
                    {this._renderHeaderCenter()}
                </Hidden>

            </Grid>
        );
    };

}

Header.defaultProps = {
    onHeaderClick: () => { },
};

export default withStyles(styles)(Header);