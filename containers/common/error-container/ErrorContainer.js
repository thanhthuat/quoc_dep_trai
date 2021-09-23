import React from 'react';

// styles
import { colors, textColors, fontSizes, fontFamilys } from '../../../assets/styles/Theme';

// @material-ui/core
import Grid from '@material-ui/core/Grid';

// images
import not_found from '../../../assets/images/common/not_found.png';

class ErrorContainer extends React.Component {

    onClick = (click_type, click_value) => {
        switch (click_type) {
            case 'reload':
                window.location.reload();
                break;
            case 'homepage':
                window.location.href = window.location.origin;
                break;
            default: break;
        }
    };

    render() {
        const { showHomepage } = this.props;
        return (
            <div style={styles.wrapper}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} style={{ height: '22vh' }} />
                    <Grid item xs={12} sm={12} md={12} style={{ height: '75vh' }}>
                        <Grid container style={styles.container}>
                            <Grid item xs={12} sm={12} md={12} style={styles.content}>
                                <div style={styles.error_code}>404</div>
                                <div style={styles.error_msg}>
                                    Hmmm... <br />
                                    Có gì đó không ổn đã xảy ra :(
                                </div>
                                <span style={styles.action_button} onClick={() => this.onClick('reload')}>
                                    Tải lại trang
                                </span>
                                {showHomepage &&
                                    <span style={{ ...styles.action_button, marginLeft: 16 }} onClick={() => this.onClick('homepage')}>
                                        Trang chủ
                                </span>
                                }
                                <div style={styles.not_found_img} />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        );
    };

};

const styles = {
    wrapper: {
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        background: colors.white,
    },
    container: {
        height: '100%',
    },
    content: {
        paddingLeft: '30%',
        background: colors.white,
    },
    error_code: {
        fontSize: '5rem',
        fontWeigth: 'bold',
        fontFamily: fontFamilys.primary,
        color: textColors.primary,
    },
    error_msg: {
        fontSize: '1.5rem',
        fontFamily: fontFamilys.primary,
        color: textColors.primary,
    },
    action_button: {
        marginTop: 5,
        fontFamily: fontFamilys.primary,
        color: '#267AFF',
        fontSize: fontSizes.primary,
        cursor: 'pointer',
    },
    not_found_img: {
        width: 240,
        height: 240,
        background: `url(${not_found})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
    },
};

export default ErrorContainer;