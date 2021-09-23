// styles
import { colors, fontFamilys, fontSizes, fontWeights, textColors } from '../../../assets/styles/Theme';

// images
import logo_vihat from '../../../assets/images/common/logo_vihat.png';
import img_background_layer from '../../../assets/images/common/background_layer.png';
import img_background_layer_wellcome from '../../../assets/images/common/background_layer_wellcome.jpg';
import img_backgrop_cover_left from '../../../assets/images/common/backdrop_cover_left.png';
import img_backgrop_cover_landscape from '../../../assets/images/common/backdrop_cover_landscape.png';

// variables
const fontSize_md_title = '1.2rem';

const styles = theme => ({
    page_header: {
        padding: '0 32px',
        height: 64,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    page_body: {
        flex: 1,
        display: 'flex',
        padding: '0 64px 32px',
        flexDirection: 'row',
    },
    backdrop_container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        background: `url(${img_background_layer})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
        [theme.breakpoints.down('xs')]: {
            maxHeight: "100vmax",
        },
    },
    backdrop_content_left: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        background: `url(${img_backgrop_cover_left})`,
        backgroundPosition: 'left bottom !important',
        backgroundSize: '100% 100% !important',
        opacity: 0.8,
        [theme.breakpoints.down('xs')]: {
            maxHeight: "100vmax",
        },
    },
    backdrop_content_ls: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        background: `url(${img_backgrop_cover_landscape})`,
        backgroundPosition: 'left bottom !important',
        backgroundSize: '100% 100% !important',
        opacity: 0.8,
        [theme.breakpoints.down('xs')]: {
            maxHeight: "100vmax",
        },
    },
    logo_view: {
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    logo_img: {
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${logo_vihat})`,
        height: 24, width: 24,
    },
    logo_text: {
        fontFamily: fontFamilys.primary,
        textAlign: "center",
        fontSize: fontSizes.primary,
        color: textColors.primary,
        marginLeft: '16px',
    },
    intro_view: {
        color: "#ffffff",
        fontFamily: fontFamilys.primary,
        fontWeight: 'normal',
        width: '480px',
        zIndex: 15,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            display: "none",
        },
    },
    intro_text: {
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 1.96,
        letterSpacing: 'normal',
        textAlign: 'left',
        fontSize: '1rem',
        margin: '16px 0',
    },
    intro_text_company: {
        fontSize: `calc(${fontSizes.primary} * 2.2)`,
        margin: 0,
    },
    intro_text_sign: {
        fontFamily: "FS Just Awesome Script !important",
        fontSize: `calc(${fontSize_md_title} * 3.75)`,
    },
    intro_footer: {
        fontFamily: fontFamilys.primary,
        fontSize: '1rem',
        position: "absolute",
        bottom: 32,
    },
    page_footer: {
        position: 'relative',
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    page_footer_text: {
        color: '#ffffff',
        fontFamily: fontFamilys.primary,
        textAlign: 'center',
        fontSize: fontSizes.primary,
    },
    homepage_text: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    wellcome_background: {
        background: `url(${img_background_layer_wellcome})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    header_content_margin: {
        marginLeft: 16,
    },
    privacy_view: {
        marginBottom: 8,
    },
    privacy_button: {
        margin: 0,
        fontSize: '1rem',
        color: colors.white,
        fontWeight: fontWeights.bold,
    },
    navBackBtn: {
        position: 'fixed',
        zIndex: 1000,
        top: 24,
        left: 24,
        width: 32,
        height: 32,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: colors.white,
        },
    },
    pp_tos_container: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        fontFamily: fontFamilys.primary,
        fontSize: fontSizes.primary,
        color: textColors.primary,
    },
    pp_tos_header: {
        position: 'fixed',
        zIndex: 10,
        top: 0,
        right: 0,
        left: 0,
        height: 64,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px 32px',
        backgroundColor: colors.white,
    },
    pp_tos_nav_back: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: colors.bgColor,
        },
    },
    pp_tos_titleTxt: {
        fontSize: fontSizes.h1,
        fontWeight: fontWeights.bold,
        margin: 0,
        marginLeft: 12,
    },
    pp_tos_lng_switcher: {
        position: 'absolute',
        right: 32,
    },
    pp_tos_content: {
        padding: '64px 32px 64px',
        display: 'flex',
        flexDirection: 'column',
    },
    pp_tos_headTxt: {
        fontWeight: fontWeights.bold,
        margin: '8px 0px',
    },
    pp_tos_headDesc: {
        margin: 0,
        paddingLeft: 32,
    },
    pp_tos_summaryTxt: {
        margin: '8px 0px',
        paddingLeft: 32,
        '& span': {
            fontWeight: fontWeights.bold,
        },
    },
    pp_tos_lineTxt: {
        margin: '8px 0px',
    },
});

export { styles };