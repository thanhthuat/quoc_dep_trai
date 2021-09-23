import React from 'react';

// styles
import { colors, textColors, fontSizes, fontFamilys } from '../../../assets/styles/Theme';

// utils
import { redirectToLoginPage } from '../../../utils/WebUtils';

// images
import not_found from '../../../assets/images/common/not_found.png';

class NoPermissionContainer extends React.Component {

    onClick = (click_type, click_value) => {
        switch (click_type) {
            case 'homepage': redirectToLoginPage(); break;
            case '': break;
            default: break;
        }
    };

    render() {
        return (
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.not_found_img} />
                    <div style={styles.error_msg}>
                        Bạn không có quyền truy cập trang web! <br />
                        Vui lòng liên hệ admin để được cấp quyền.
                    </div>
                    <span style={styles.action_button} onClick={() => this.onClick('homepage')}>
                        Trang chủ
                    </span>
                </div>
            </div>
        );
    };

}

const styles = {
    wrapper: {
        width: '100vw',
        height: '100vh',
        margin: '0 auto',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.white,
    },
    container: {
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    error_msg: {
        fontSize: '1.25rem',
        fontFamily: fontFamilys.primary,
        color: textColors.primary,
    },
    action_button: {
        marginTop: 16,
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

export default NoPermissionContainer;