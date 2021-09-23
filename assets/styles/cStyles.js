import { imgSizes } from '../../assets/styles/Theme';

const cStyles = {
    selectDropdownIndicator: {
        height: imgSizes.icon,
        width: imgSizes.icon,
        opacity: 1,
        border: 'none',
        userSelect: 'none',
    },
    textEllipsis: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    disabled: {
        opacity: 0.69,
        cursor: 'not-allowed',
    },
    noMargin: {
        margin: 0,
    },
    noPadding: {
        padding: 0,
    },
    noMarginTop: {
        marginTop: 0,
    },
    noMarginBottom: {
        marginBottom: 0,
    },
    noneUserSelect: {
        WebkitTouchCallout: 'none !important', /* iOS Safari */
        WebkitUserSelect: 'none !important', /* Safari */
        KhtmlUserSelect: 'none !important', /* Konqueror HTML */
        MozUserSelect: 'none !important', /* Firefox */
        MsUserSelect: 'none !important', /* Internet Explorer/Edge */
        userSelect: 'none !important', /* Non-prefixed version, currently supported by Chrome and Opera */
    },
    userSelectText: {
        WebkitTouchCallout: 'text !important', /* iOS Safari */
        WebkitUserSelect: 'text !important', /* Safari */
        KhtmlUserSelect: 'text !important', /* Konqueror HTML */
        MozUserSelect: 'text !important', /* Firefox */
        MsUserSelect: 'text !important', /* Internet Explorer/Edge */
        userSelect: 'text !important', /* Non-prefixed version, currently supported by Chrome and Opera */
    },
};

export default cStyles;