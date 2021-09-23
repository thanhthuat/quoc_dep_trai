import { getShadowStyle } from '../../../utils/StyleUtils';

import { cStyles } from '../../../assets/styles';
import { borderRadiuses, fontFamilys, fontSizes, textColors, colors, boxShadows, baseHeights } from '../../../assets/styles/Theme';

export const styles = theme => ({
    wrapper: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        height: 'fit-content',
        maxWidth: 'calc(100% - 96px)',
        margin: 48,
        padding: '32px 48px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        color: textColors.primary,
        fontFamily: fontFamilys.primary,
        backgroundColor: colors.white,
        borderRadius: borderRadiuses.primary,
        ...getShadowStyle({ color: boxShadows.primary }),
        '& p, span': {
            margin: '0 0 32px',
        },
        '& p': {
            fontSize: fontSizes.big,
        },
        '& button': {
            height: baseHeights.primary,
            width: 240,
            alignSelf: 'center',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            borderRadius: borderRadiuses.normal,
            backgroundColor: colors.orange,
            color: textColors.white,
            ...cStyles.noneUserSelect,
            ...getShadowStyle({ color: boxShadows.primary }),
            '&:hover': {
                ...getShadowStyle({ color: boxShadows.primaryHover }),
            },
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: 'calc(100% - 64px)',
            margin: 32,
            padding: '24px 32px',
            color: textColors.white,
            backgroundColor: colors.blue,
            '& p, span': {
                margin: '0 0 24px',
            },
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'calc(100% - 48px)',
            margin: 24,
            padding: '16px 24px',
            backgroundColor: colors.green,
            '& p, span': {
                margin: '0 0 16px',
            },
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: 'calc(100% - 32px)',
            margin: 16,
            padding: '8px 16px',
            backgroundColor: colors.red,
            '& p, span': {
                margin: '0 0 8px',
            },
        },
    },
    dataField: {
        marginTop: 32,
        padding: 48,
        wordBreak: 'break-all',
        color: textColors.primary,
        borderRadius: borderRadiuses.regular,
        backgroundColor: colors.grayLight,
        [theme.breakpoints.down('md')]: {
            padding: 32,
            backgroundColor: colors.white,
        },
        [theme.breakpoints.down('sm')]: {
            padding: 24,
        },
        [theme.breakpoints.down('xs')]: {
            padding: 16,
        },
    },
});