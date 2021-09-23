import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

// utils
import { i18nText } from '../../../utils/StringUtils';

// styles
import { customStyles } from './styles';

// components
import ImageViewer from '../image-viewer';
import { isFunction, isBoolean } from '../../../utils/Utils';

// icons
const defaultDropdownIcon = require('../../../assets/icons/common/ic_triangle_down_g.png');

const DropdownIndicator = props => {
    const { selectProps } = props;
    const { menuIsOpen, dropdownIcon } = selectProps;
    const iconSrc = dropdownIcon && dropdownIcon.src || defaultDropdownIcon;
    // const iconStyle = { ...(dropdownIcon && dropdownIcon.style), opacity: menuIsOpen ? 1 : 0.5 };
    const iconStyle = { ...(dropdownIcon && dropdownIcon.style) };
    return (
        <components.DropdownIndicator {...props}>
            <ImageViewer src={iconSrc} size={11} style={iconStyle} />
        </components.DropdownIndicator>
    );
};

const NoOptionsMessage = props => {
    return (
        <components.NoOptionsMessage {...props}>
            <span>{i18nText('no_select_options')}</span>
        </components.NoOptionsMessage>
    );
};

class CustomSelect extends React.Component {

    render() {
        const {
            menuPortalTarget, noneMaxWidth, noneBackground, onClick, softDisabled, customComps, dropdownIcon,
            overlayAll, isSearchable, closeMenuOnSelect, blurInputOnSelect, indicatorStyle, slim,
        } = this.props;
        const selectNode = (
            <Select
                ref={ref => this.props.onRef(ref)}
                isDisabled={softDisabled}
                menuPortalTarget={menuPortalTarget || overlayAll && document.body || null}
                components={{ DropdownIndicator, NoOptionsMessage, ...customComps }}
                onChange={(selected) => this.props.onChange(selected)}
                onMenuScrollToBottom={this.props.onScroll}
                {...{
                    noneMaxWidth, noneBackground, dropdownIcon, indicatorStyle,
                    isSearchable, closeMenuOnSelect, blurInputOnSelect, slim,
                }}
                {...this.props}
            />
        );
        if (isFunction(onClick)) { return <div onClick={() => this.props.onClick()}>{selectNode}</div> }
        return selectNode;
    };

}

CustomSelect.propTypes = {
    menuPortalTarget: PropTypes.any,
    isSearchable: PropTypes.bool,
    noneMaxWidth: PropTypes.bool,
    noneBackground: PropTypes.bool,
    softDisabled: PropTypes.bool,
    overlayAll: PropTypes.bool,
    closeMenuOnSelect: PropTypes.bool,
    customComps: PropTypes.any,
    dropdownIcon: PropTypes.any,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onScroll: PropTypes.func,
    indicatorStyle: PropTypes.object,
    slim: PropTypes.bool,
};

CustomSelect.defaultProps = {
    styles: customStyles,
    menuPlacement: 'auto',
    maxMenuHeight: 204, // 4 item, height: 41, margin: 8px
    options: [],
    value: null,
    isSearchable: true,
    closeMenuOnSelect: true,
    blurInputOnSelect: true,
    onChange: () => { },
    onClick: () => { },
    onRef: () => { },
};

export default CustomSelect;