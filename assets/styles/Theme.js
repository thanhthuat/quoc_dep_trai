// 4px, 8px, 12px, 16px, 24px, 32px, 48px, 56px,...

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 960px
// lg, large: 1280px
// xl, extra-large: 1920px

// value         |0px     600px    960px    1280px   1920px
// key           |xs      sm       md       lg       xl
// screen width  |--------|--------|--------|--------|-------->
// range         |   xs   |   sm   |   md   |   lg   |   xl

export const baseHeights = {
    primary: '41px',
    primaryNum: 41,
    avatar: '32px',
    avatarNum: 32,
};

export const colors = {

    bgColornone: 'transparent',

    bgColor: '#f5f6fa',
    bgDefault: 'rgba(73, 73, 73, 0.08)',
    bgButton: 'rgba(73, 73, 73, 0.1)',
    bgDefaultHover: 'rgba(73, 73, 73, 0.2)',

    white: '#ffffff',
    black: '#000000',

    base: '#7d7d7d',

    primary: '#494949',
    primaryLight: '#666666',
    primaryDim: '#808080',

    gray: '#cccccc',
    grayLight: '#eaeaea',
    grayDark: '#585d71',
    grayDim: '#9C9C9C',

    blue: '#267aff',
    blueLight: '#57bfdb',
    blueDim: '#616E82',
    blueGray: '#4a5b75',
    blueDark: '#404b5c',

    green: '#4ca750',
    greenLight: '#32c991',

    red: '#e94440',
    redLight: '#fb7b65',

    orange: '#ffa850',
    orangeLight: '#e9bc5a',

    purple: '#a540b8',

};

export const textColors = {
    white: '#ffffff',
    light: '#666666',
    primary: '#494949',
    info: '#267aff',
    success: '#4CA750',
    warn: '#fea220',
    error: '#e94440',
    danger: '#e94440',
    placeholder: 'rgba(73,73,73,0.5)',
    note: '#a540b8',
};

export const boxShadows = {

    base: 'rgba(125, 125, 125, 0.08)',
    baseHover: 'rgba(125, 125, 125, 0.2)',
    baseDark: 'rgba(125, 125, 125, 0.5)',
    baseBlack: 'rgba(125, 125, 125, 0.8)',
    baseLight: 'rgba(73, 73, 73, 0.16)',

    primary: 'rgba(73, 73, 73, 0.08)',
    primaryHover: 'rgba(73, 73, 73, 0.2)',
    primaryDark: 'rgba(73, 73, 73, 0.5)',
    primaryBlack: 'rgba(73, 73, 73, 0.8)',

    grayLight: 'rgb(233, 233, 233, 0.5)',
    grayLightHover: 'rgb(233, 233, 233,0.8)',
    grayDark: 'rgba(85, 89, 109, 0.5)',
    grayDarkHover: 'rgba(85, 89, 109, 0.8)',

    blue: 'rgba(38, 122, 255, 0.5)',
    blueHover: 'rgba(38, 122, 255, 0.8)',
    blueLight: 'rgba(87, 191, 219, 0.5)',
    blueLightHover: 'rgba(87, 191, 219, 0.8)',

    green: 'rgba(76, 167, 80, 0.5)',
    greenHover: 'rgba(76, 167, 80, 0.8)',

    orange: 'rgba(254, 162, 32, 0.5)',
    orangeHover: 'rgba(254, 162, 32, 0.8)',
    orangeLight: 'rgba(233, 188, 90, 0.5)',
    orangeLighthover: 'rgba(233, 188, 90, 0.8)',

    red: 'rgba(233, 68, 64, 0.5)',
    redHover: 'rgba(233, 68, 64, 0.8)',
    redLight: 'rgba(251, 123, 101, 0.5)',
    redLightHover: 'rgba(251, 123, 101, 0.8)',

    purple: 'rgba(165, 64, 184, 0.5)',
    purpleHover: 'rgba(165, 64, 184, 0.8)',

};

export const linearGradients = {

    tBlue: 'linear-gradient(to top, #01b8fa, #267aff)',
    bBlue: 'linear-gradient(to bottom, #01b8fa, #267aff)',
    rBlue: 'repeating-linear-gradient(rgba(38, 122, 255,0.95), rgba(1, 184, 250,0.95) 70%, rgba(1, 184, 250, 0.95) 30%, rgba(1, 184, 250,0.95) 100%)',

    green: 'linear-gradient(to bottom, #32c991, #4ca750)',
    white: 'linear-gradient(to bottom, #ffffff, #ffffff)',

};

export const borderLines = {

    white: '1px solid #ffffff',
    bgColor: '1px solid #f5f6fa',

    primary: '1px solid rgba(73, 73, 73, 0.08)',

};

export const fontSizes = {
    h6: '1.5rem',
    h5: '1.45rem',
    h4: '1.4rem',
    h3: '1.35rem',
    h2: '1.3rem',
    h1: '1.25rem',
    title: '1.2rem',
    bold: '1rem',
    primary: '0.875rem',
    route: '0.8rem',
    normal: '0.75rem',
    small: '0.7rem',
    little: '0.6rem',
    tiny: '0.5rem',
    regular: '14px',
    text: '16px',
    large: '19px',
    big: '24px',
    superBig: '32px',
};

export const borderRadiuses = {
    tiny: '5px',
    small: '6px',
    normal: '8px',
    regular: '10px',
    primary: '12px',
    large: '18px',
};

export const imgSizes = {
    icon: '20px',
    avatar: '32px',
    avatarLarge: '48px',
    button: '48px',
};

export const fontFamilys = {
    primary: 'Roboto',
};

export const fontWeights = {
    primary: '400',
    bold: '500',
};

export const avatarColors = {
    A: 'rgb(45,69,99,0.5)',
    B: 'rgb(165,64,184,0.5)',
    C: 'rgb(233,68,64,0.5)',
    D: 'rgb(254,162,32,0.5)',
    E: 'rgb(76,167,80,0.5)',
    F: 'rgb(38,122,255,0.5)',
    G: 'rgb(73,73,73,0.5)',
    H: 'rgb(88,93,113,0.5)',
    I: 'rgb(251,123,101,0.8)',
    J: 'rgb(255,168,80,0.8)',
    K: 'rgb(233,188,90,0.8)',
    L: 'rgb(88,144,220,0.8)',
    M: 'rgb(87,191,219,0.8)',
    N: 'rgb(45,69,99,0.5)',
    O: 'rgb(165,64,184,0.5)',
    P: 'rgb(233,68,64,0.5)',
    Q: 'rgb(254,162,32,0.5)',
    R: 'rgb(76,167,80,0.5)',
    S: 'rgb(38,122,255,0.5)',
    T: 'rgb(73,73,73,0.5)',
    U: 'rgb(88,93,113,0.5)',
    V: 'rgb(251,123,101,0.8)',
    W: 'rgb(255,168,80,0.8)',
    X: 'rgb(233,188,90,0.8)',
    Y: 'rgb(88,144,220,0.8)',
    Z: 'rgb(87,191,219,0.8)',
};