import { getShadowStyle, getTransitionStyle, getTransformStyle } from '../../../utils/StyleUtils';

import { colors, fontFamilys, fontSizes, fontWeights, boxShadows, borderRadiuses, textColors, baseHeights } from '../../../assets/styles/Theme';

const customStyles = {
    container: (base, state) => {
        const { noneMaxWidth, noneBackground } = state.selectProps;
        return ({
            ...base,
            height: 41,
            ...(!noneMaxWidth && { maxWidth: 320 }),
            ...(!noneBackground && {
                borderRadius: borderRadiuses.small,
                ...getShadowStyle({ color: boxShadows.base }),
                '&:hover': {
                    ...getShadowStyle({ color: boxShadows.baseHover }),
                },
            })
        })
    },
    control: (base, state) => {
        const { isDisabled, selectProps } = state;
        return ({
            ...base,
            minHeight: baseHeights.primary,
            padding: '0px 16px',
            borderRadius: borderRadiuses.small,
            border: 'none !important',
            cursor: 'pointer',
            backgroundColor: selectProps.noneBackground || colors[isDisabled && !selectProps.softDisabled ? 'bgDisabled' : 'white'],
            opacity: isDisabled && !selectProps.softDisabled ? 0.69 : 1,
            ...getShadowStyle({ custom: 'none !important' }),
        })
    },
    menu: base => ({
        ...base,
        zIndex: 20,
        border: 'none !important',
        ...getShadowStyle({ custom: 'none !important' }),
    }),
    menuList: base => ({
        ...base,
        zIndex: 100,
        borderRadius: borderRadiuses.small,
        border: 'none !important',
        padding: 0,
        backgroundColor: colors.white,
        ...getShadowStyle({ color: boxShadows.primaryDark }),
    }),
    option: (base, state) => ({
        ...base,
        width: 'unset',
        minHeight: baseHeights.primary,
        height: 'fit-content',
        wordWrap: 'break-word',
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
        padding: '8px 16px',
        margin: '8px',
        borderRadius: borderRadiuses.small,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        clear: 'both',
        fontWeight: fontWeights.primary,
        color: textColors[state.isSelected ? 'info' : 'primary'],
        backgroundColor: colors.none,
        cursor: 'pointer',
        overflow: 'hidden',
        ...getTransitionStyle('all 150ms linear'),
        '&:hover': {
            color: textColors.white,
            backgroundColor: colors.blue,
            ...getShadowStyle({ color: boxShadows.blue }),
        },
    }),
    indicatorsContainer: (base, state) => {
        const { indicatorStyle } = state.selectProps;
        return { marginLeft: '16px', ...indicatorStyle }
    },
    indicatorSeparator: () => ({
        backgroundColor: colors.none,
    }),
    dropdownIndicator: (base, state) => {
        let transform = state.selectProps.menuIsOpen ? 'rotate(180deg)' : null;
        return ({
            ...base,
            padding: 0,
            ...getTransformStyle(transform),
            ...getTransitionStyle('all .2s ease'),
        })
    },
    ValueContainer: (base, state) => {
        const { slim } = state.selectProps;
        return ({
            ...base,
            ...(slim && {
                padding: '0 8px 0 0',
            }),
        });
    },
    singleValue: (base, state) => {
        const { slim } = state.selectProps;
        return ({
            ...base,
            color: textColors.primary,
            fontSize: fontSizes.primary,
            fontFamily: fontFamilys.primary,
            ...(slim && {
                margin: 0,
                maxWidth: 'unset',
                position: 'unset',
                ...getTransformStyle('unset'),
            }),
        })
    },
    placeholder: (base, state) => {
        const { noneBackground } = state.selectProps;
        return ({
            ...base,
            opacity: noneBackground ? 1 : 0.5,
            color: textColors.primary,
            fontSize: fontSizes.primary,
            fontFamily: fontFamilys.primary,
        })
    },
    input: base => ({
        ...base,
        color: textColors.primary,
        fontSize: fontSizes.primary,
        fontFamily: fontFamilys.primary,
    }),
    menuPortal: base => {
        const { zIndex, ...rest } = base;
        return { ...rest, zIndex: 9999 };
    },
};

export { customStyles };