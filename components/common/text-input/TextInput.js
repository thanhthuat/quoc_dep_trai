import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MaskedInput from 'react-text-mask';

import { isNumeric } from '../../../utils/Utils';
import { getTextInputMask } from '../../../utils/WebUtils';
import { getColor } from '../../../utils/StyleUtils';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import Input from '@material-ui/core/Input';

import ImageViewer from '../image-viewer';

class TextInput extends React.PureComponent {

    handleOnKeyPress = event => {
        const { name, value, isNumber } = this.props;
        const code = event.keyCode || event.which;
        if (code === 13) {
            this.props.onEnter(value);
        }
        if ((name === 'phoneNumber' || isNumber) && !isNumeric(event.key)) {
            event.preventDefault();
        }
    };

    render() {
        const {
            classes, className, id, name, type, value, disabled, softDisabled, autoFocus, placeholder, multiline,
            masked, prefix, extProps, customClasses, customStyles, disabledShadow, inputProps, leftIcon, rightIcon,
        } = this.props;
        const textInputProps = {
            name, type, value: value || '', autoFocus, placeholder,
            disabled: disabled || softDisabled || false,
            onChange: this.props.onChange,
            onKeyPress: this.handleOnKeyPress.bind(this),
            onClick: (e) => this.props.onClick(e),
            onKeyDown: (e) => this.props.onKeyDown(e),
            onBlur: (e) => this.props.onBlur(e),
            onFocus: (e) => this.props.onFocus(e),
            ...(id && { id }),
            ...(inputProps && { inputProps }),
            ...extProps,
        };
        if (masked) {
            const maskProps = {
                guide: false,
                className: classNames(classes.masked, className),
                ref: ref => this.props.inputRef(ref && (masked.fullRef ? ref : ref.inputElement)),
                ...textInputProps,
                ...masked,
                mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/], // default format for date;
            };
            if (masked.mask && ['money', 'number'].includes(masked.mask)) {
                maskProps.mask = getTextInputMask(masked.mask);
            }
            return <MaskedInput {...maskProps} />;
        }
        const wrapperClass = classNames(classes.wrapper, { [classes.shadow]: !disabledShadow, [classes.wrapper_multiline]: multiline, [classes.disabled]: disabled && !softDisabled }, customClasses?.wrapper);
        const inputClass = classNames(classes.input, { [classes.multiline]: multiline, [classes.disabled]: disabled && !softDisabled }, customClasses?.input);
        const leftIconNode = leftIcon && (
            <ImageViewer
                {...leftIcon}
                className={classes.leftIcon}
                svg={!leftIcon.static && { color: leftIcon.color || getColor('primary') }}
            />
        );
        const rightIconNode = rightIcon && (
            <ImageViewer
                {...rightIcon}
                className={classes.rightIcon}
                svg={!rightIcon.static && { color: rightIcon.color || getColor('primary') }}
            />
        );
        return (
            <div className={wrapperClass} style={customStyles?.wrapper || null}>
                {leftIconNode}
                <Input
                    style={customStyles?.input || null}
                    classes={{ root: classes.root, input: inputClass }}
                    inputRef={ref => this.props.inputRef(ref)}
                    fullWidth disableUnderline
                    {...{ rows: multiline || 1, multiline: multiline ? true : false }}
                    {...textInputProps}
                />
                {rightIconNode}
                {prefix && !rightIcon && <span className={classes.prefix}>{prefix}</span>}
            </div>
        );
    };

}

TextInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    softDisabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    multiline: PropTypes.number,
    rows: PropTypes.number,
    customClasses: PropTypes.object,
    customStyles: PropTypes.object,
    isNumber: PropTypes.bool,
    disabledShadow: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onEnter: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    inputRef: PropTypes.func,
    masked: PropTypes.shape({
        mask: PropTypes.any, // https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask
        guide: PropTypes.bool,
        placeholder: PropTypes.string, // libs props is placeholderChar, but it crask the input;
        keepCharPositions: PropTypes.bool,
        pipe: PropTypes.func,
        showMask: PropTypes.bool,
        fullRef: PropTypes.bool, // true: return ref of MaskInput, return ref of inputElement of MaskInput;
    }),
    prefix: PropTypes.string,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
};

TextInput.defaultProps = {
    id: '',
    name: '',
    type: 'text',
    value: '',
    placeholder: '',
    customClasses: {},
    customStyles: {},
    onChange: () => { },
    onClick: () => { },
    onBlur: () => { },
    onEnter: () => { },
    onFocus: () => { },
    onKeyDown: () => { },
    inputRef: () => { },
};

export default withStyles(styles)(TextInput);