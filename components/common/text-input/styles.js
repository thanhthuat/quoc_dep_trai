import { colors, textColors, fontSizes, fontFamilys, borderRadiuses, fontWeights, boxShadows } from '../../../assets/styles/Theme';

export const styles = theme => ({
    shadow: {
        boxShadow: boxShadows.primary,
        WebkitBoxShadow: boxShadows.primary,
        MozBoxShadow: boxShadows.primary,
        '&:hover': {
            boxShadow: boxShadows.primaryHover,
            WebkitBoxShadow: boxShadows.primaryHover,
            MozBoxShadow: boxShadows.primaryHover,
        },
    },
    wrapper: {
        width: '100%',
        height: '41px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadiuses.small,
        fontFamily: fontFamilys.primary,
        fontSize: fontSizes.primary,
        fontWeight: fontWeights.primary,
        color: textColors.primary,
    },
    wrapper_multiline: {
        height: 'fit-content',
    },
    masked: {
        width: '100%',
        padding: '12px 24px',
        color: textColors.primary,
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
        borderRadius: borderRadiuses.small,
        border: 'none',
        outline: 'none',
        backgroundColor: colors.none,
        boxSizing: 'border-box',
    },
    root: {
        padding: '0 !important',
    },
    input: {
        flex: 1,
        height: '41px',
        padding: '0 24px',
        borderRadius: borderRadiuses.small,
        color: textColors.primary,
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
    },
    multiline: {
        height: 'fit-content',
        padding: '8px 24px',
    },
    disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
    prefix: {
        marginRight: 24,
    },
});