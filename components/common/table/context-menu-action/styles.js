import { getShadowStyle, getTransitionStyle } from '../../../../utils/StyleUtils';

import { cStyles } from '../../../../assets/styles';
import { colors, fontSizes, fontFamilys, fontWeights, boxShadows, borderRadiuses, textColors } from '../../../../assets/styles/Theme';

export const styles = theme => ({
    menuContainer: {
        zIndex: 20,
        padding: '8px 10px',
        width: 'fit-content',
        color: colors.primary,
        borderRadius: borderRadiuses.small,
        backgroundColor: colors.white,
        ...getShadowStyle({ color: boxShadows.primaryDark }),
    },
    actionContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
    },
    menuItem: {
        height: 41,
        padding: '10px 20px',
        boxSizing: 'border-box',
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
        borderRadius: borderRadiuses.small,
        fontWeight: fontWeights.primary,
        color: textColors.primary,
        ...getTransitionStyle('all 300ms linear'),
        '&:hover': {
            color: textColors.info,
            // backgroundColor: colors.blue,
            // ...getShadowStyle({ color: boxShadows.blue }),
        },
    },
    buttonOuter: {
        padding: '10px 12px 11px',
        color: textColors.info,
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...cStyles.textEllipsis,
    },
    ia_text: {
        cursor: 'pointer',
        ...cStyles.textEllipsis,
        ...cStyles.noneUserSelect,
    },
    disable: {
        opacity: 0.69,
        cursor: 'not-allowed',
    },
});