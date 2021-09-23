/*****************************
 * @providesModule Configs *
 * @created_by Kds           *
 *****************************/

export const WEB_PORT = 7070;
export const requestApiTimeout = 20000;
export const sourceVersion = 1;

export const cookieProps = {
    get: {
        '0': 'sourceVersion',
        '1': 'lng',
        '2': 'access_token',
        '3': 'refresh_token',
        '4': 'login_domain',
        '5': 'login_email',
        '6': 'is_recent_login',
        '7': 'is_force_change_password',
        '8': 'created_date',
        '9': 'origin',
    },
    set: {
        'sourceVersion': '0',
        'lng': '1',
        'access_token': '2',
        'refresh_token': '3',
        'login_domain': '4',
        'login_email': '5',
        'is_recent_login': '6',
        'is_force_change_password': '7',
        'created_date': '8',
        'origin': '9',
    },
};

export const popperModifiers = { // fix blurry text in popper
    computeStyle: {
        inner: { enabled: true },
        gpuAcceleration: false,
    },
    preventOverflow: {
        enabled: false,
        padding: 0
    },
    hide: {
        enabled: false
    },
};