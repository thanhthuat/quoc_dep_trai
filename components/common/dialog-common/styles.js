
import { cStyles } from '../../../assets/styles';
import { textColors, fontFamilys, fontSizes, borderRadiuses, fontWeights } from '../../../assets/styles/Theme';

const styles = theme => ({
    paper: {
        width: 480,
        padding: '24px 32px',
        borderRadius: borderRadiuses.regular,
        fontFamily: fontFamilys.primary,
        fontSize: fontSizes.primary,
        color: textColors.primary,
    },
    container: {
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        marginRight: 32,
        fontWeight: fontWeights.bold,
        ...cStyles.textEllipsis,
    },
    content: {
        padding: '24px 0 32px',
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& div:first-child, p:first-child, span:first-child': {
            marginLeft: '0px !important',
        },
        '& div, p, span': {
            padding: 0,
            marginLeft: '16px !important',
            fontSize: fontSizes.primary,
        },
    },
});

export { styles };