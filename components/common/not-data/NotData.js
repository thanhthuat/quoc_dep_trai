import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// styles
import { colors, fontSizes, textColors } from '../../../assets/styles/Theme';

// @material-ui
import Paper from '@material-ui/core/Paper';

// components
import Spinkit from '../spinkit';

// images
import not_found from '../../../assets/images/common/not_found.png';

class NotData extends React.Component {

    render() {
        const { flatBg, message, fetching, fullHeight, style } = this.props;
        const containerShadow = flatBg ? 'none' : '0 4px 16px 0 rgba(73, 73, 73, 0.08)';
        const wrapperStyle = {
            ...styles.wrapper,
            boxShadow: containerShadow,
            height: fullHeight ? '100%' : 320,
            ...style,
        };
        return (
            <Paper style={wrapperStyle}>
                <div style={styles.container}>
                    {fetching ?
                        <Spinkit name={'FoldingCube'} size={24} color={colors.main} />
                        :
                        <Fragment>
                            <div style={styles.image} />
                            <div style={styles.text}>
                                {message || 'Chưa có dữ liệu'}
                            </div>
                        </Fragment>
                    }
                </div>
            </Paper>
        );
    };

}

const styles = {
    wrapper: {
        width: '100%',
        maxHeight: 320,
        margin: '0 auto',
        borderRadius: 12,
    },
    container: {
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    image: {
        background: `url(${not_found})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        width: 240,
        height: 240,
    },
    text: {
        color: textColors.primary,
        fontSize: fontSizes.primary,
        paddingBottom: 32,
    },
};

NotData.propTypes = {
    flatBg: PropTypes.bool,
    fetching: PropTypes.bool,
    message: PropTypes.string,
};

export default NotData;