import { getShadowStyle } from '../../utils/StyleUtils';

import { fontSizes, fontWeights, textColors, colors, borderRadiuses, boxShadows } from '../../assets/styles/Theme';
import { cStyles } from '../../assets/styles';

export const styles = {
    pagination_container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
    },
    current_page_container: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
    },
    info_container: {
        display: 'flex',
        alignItems: 'center'
    },
    text_normal: {
        fontSize: fontSizes.primary,
        fontWeight: fontWeights.primary,
        color: textColors.primary,
        // marginLeft: 16
    },
    buttonBase: {
        width: 41,
        height: 41,
        margin: '0px 4px !important',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: borderRadiuses.small,
        color: textColors.primary,
        fontSize: fontSizes.primary,
        fontWeight: fontWeights.primary,
        ...cStyles.noneUserSelect,
        '&:hover': {
            backgroundColor: colors.bgDefault,
        },
    },
    arrow_back: {
        msTransform: 'rotate(90deg)',
        webkitTransform: 'rotate(90deg)',
        transform: 'rotate(90deg)',
    },
    arrow_next: {
        msTransform: 'rotate(-90deg)',
        webkitTransform: 'rotate(-90deg)',
        transform: 'rotate(-90deg)',
    },
    currentPage: {
        // color: textColors.info,
        backgroundColor: colors.white,
        ...getShadowStyle({ color: boxShadows.primary }),
        '&:hover': {
            backgroundColor: colors.white,
            ...getShadowStyle({ color: boxShadows.primaryHover }),
        },
    },
};