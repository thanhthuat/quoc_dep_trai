import { fontFamilys, fontSizes, fontWeights } from '../../../assets/styles/Theme';

export const styles = {
    center: {
        textAlign: 'center',
    },
    tooltip: {
        fontWeight: fontWeights.primary,
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
        whiteSpace: 'pre-line',
        wordBreak: 'break-word',
    },
    noMaxWidth: {
        fontWeight: fontWeights.primary,
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
        whiteSpace: 'pre-line',
        maxWidth: 'none',
    },
};