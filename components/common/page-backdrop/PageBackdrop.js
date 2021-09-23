import React from 'react';

import { colors } from '../../../assets/styles/Theme';

class PageBackdrop extends React.Component {

    render() {
        const { top, color, style } = this.props;
        const backdrop_style = {
            top,
            zIndex: 3,
            height: 96,
            width: 'calc(100% + 64px)',
            margin: '-32px -32px 0',
            backgroundColor: color || colors.green,
            ...(style || {}),
        };
        return (
            <div className={'c-sticky'} style={backdrop_style} />
        );
    };

}

PageBackdrop.defaultProps = {
    top: 111,
};

export default PageBackdrop;