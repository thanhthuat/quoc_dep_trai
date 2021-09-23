// styles
import { fontFamilys, fontSizes, fontWeights, textColors } from '../../../assets/styles/Theme';

const styles = {
    button: {
        margin: '8px 16px',
        color: textColors.primary,
        fontFamily: fontFamilys.primary,
        fontSize: fontSizes.primary,
        fontWeight: fontWeights.primary,
        cursor: 'pointer',
        WebkitTouchCallout: 'none !important', /* iOS Safari */
        WebkitUserSelect: 'none !important', /* Safari */
        KhtmlUserSelect: 'none !important', /* Konqueror HTML */
        MozUserSelect: 'none !important', /* Firefox */
        MsUserSelect: 'none !important', /* Internet Explorer/Edge */
        userSelect: 'none !important', /* Non-prefixed version, currently supported by Chrome and Opera */
    },
};

export { styles };