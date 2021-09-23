import { getShadowStyle, getTransformStyle, getTransitionStyle } from '../../../../utils/StyleUtils';

import { cStyles } from '../../../../assets/styles';
import { colors, fontSizes, fontFamilys, fontWeights, boxShadows, borderRadiuses, textColors } from '../../../../assets/styles/Theme';

export const styles = theme => ({
    disable: {
        opacity: 0.69,
        cursor: 'not-allowed',
    },
    hidden: {
        visibility: 'hidden',
    },
    noneDisplay: {
        display: 'none',
    },
    item_container: {
        display: 'flex',
        // flexDirection: 'column',
        minWidth: 'calc(100% - 64px)',
        width: 'fit-content',
        minHeight: 48,
        padding: '4px 32px',
        position: 'relative',
    },
    item_content: {
        height: 48,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: borderRadiuses.regular,
        backgroundColor: colors.none,
        '&:hover': {
            backgroundColor: colors.white,
            ...getShadowStyle({ color: boxShadows.baseHover }),
        },
    },
    item_content_collapse: {
        backgroundColor: colors.white,
        ...getShadowStyle({ color: boxShadows.baseHover }),
    },
    item_content_resizeable: {
        WebkitBoxFlex: 1,
        MsFlex: '1 0 auto',
        flex: '1 0 auto',
        display: 'inline-flex',
    },
    item_content_multiline: {
        height: 'unset',
    },
    item_content_selected: {
        backgroundColor: colors.white,
    },
    item_content_selected_shadow: {
        ...getShadowStyle({ color: boxShadows.base }),
    },
    item_action: {
        marginLeft: 8,
        color: textColors.info,
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...cStyles.textEllipsis,
    },
    ia_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        flex: 1,
    },
    item_action_multiline: {
        alignItems: 'unset !important',
        alignSelf: 'unset !important',
    },
    disable_align_items: {
        alignItems: 'unset !important',
        alignSelf: 'unset !important',
    },
    ia_text: {
        cursor: 'pointer',
        ...cStyles.textEllipsis,
        ...cStyles.noneUserSelect,
    },
    content_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    content_view: {
        display: 'flex',
        alignItems: 'center',
        height: 'auto',
        ...cStyles.textEllipsis,
        '& div:first-child': cStyles.noMarginTop,
        '& div p:first-child': cStyles.noMarginTop,
        '& div p:last-child': cStyles.noMarginBottom,
        '& div h1:first-child': cStyles.noMarginTop,
        '& div h1:last-child': cStyles.noMarginBottom,
        '& div h2:first-child': cStyles.noMarginTop,
        '& div h2:last-child': cStyles.noMarginBottom,
        '& div h3:first-child': cStyles.noMarginTop,
        '& div h3:last-child': cStyles.noMarginBottom,
        '& div h4:first-child': cStyles.noMarginTop,
        '& div h4:last-child': cStyles.noMarginBottom,
        '& div h5:first-child': cStyles.noMarginTop,
        '& div h5:last-child': cStyles.noMarginBottom,
        '& div h6:first-child': cStyles.noMarginTop,
        '& div h6:last-child': cStyles.noMarginBottom,
    },
    content_view_multiline: {
        whiteSpace: 'unset',
        wordBreak: 'break-word',
        alignItems: 'unset',
    },
    content_view_image: {
        height: '48px',
    },
    content_view_avatar: {
        height: '32px',
    },
    content_view_grid: {
        paddingRight: '8px',
    },
    content_view_resizeable: {
        paddingRight: '8px',
        marginRight: '8px',
    },
    content_view_align_left: {
        display: 'flex',
        flexDirection: 'row'
    },
    content_view_align_center: {
        justifyContent: 'flex-end',
        display: 'flex'
    },
    content_view_align_right: {
        justifyContent: 'flex-end',
        display: 'flex'
    },
    content_text: {
        fontSize: fontSizes.primary,
        fontWeight: fontWeights.primary,
        color: textColors.primary,
        fontFamily: fontFamilys.primary,
        ...cStyles.textEllipsis,
    },
    content_text_multiline: {
        overflow: 'unset',
        whiteSpace: 'pre-line',
        textOverflow: 'ellipsis',
    },
    content_image: {
        width: '48px !important',
        height: '48px !important',
    },
    content_avatar: {
        width: '32px !important',
        height: '32px !important',
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
        ...cStyles.noneUserSelect,
    },
    content_cb_image: {
        width: '48px !important',
    },
    content_cb_avatar: {
        width: '32px !important',
        height: '32px !important',
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
    },
    content_checkbox: {
        width: 68,
        height: 'calc(100% - 8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute',
        top: 4,
        marginLeft: -68,
    },
    content_checkbox_sticky: {
        position: 'unset',
        marginLeft: 0,
    },
    checkbox_multiline: {
        alignItems: 'center !important',
        marginLeft: 0,
    },
    checkbox_multiline_selectable: {
        alignItems: 'unset !important',
        padding: '16px 0',
    },
    select_view: {
        display: 'flex',
        width: 44, // margin size: 24px, icon select: 20px;
        height: 20,
    },
    row_view: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    // collapse
    collapseWrapper: {
        // width: 'fit-content',
        width: 'auto',
        height: '100%',
        // minWidth: 'calc(100% - 64px)',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: borderRadiuses.primary,
    },
    collapseContainer: {
        padding: '0px 32px',
    },
    collapse: {
        width: '100%',
        overflow: 'hidden',
        marginTop: -24,
    },
    collapseContent: {
        height: 'auto',
        // width: 'fit-content',
        width: 'auto',
        padding: '56px 24px 32px',
        backgroundColor: colors.white,
        borderRadius: borderRadiuses.primary,
        ...getShadowStyle({ color: boxShadows.base }),
    },
});