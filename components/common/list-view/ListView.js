import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// utils
import { isFunction } from '../../../utils/Utils';

// styles
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class ListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.wrapperRef = null;
        this.containerRef = null;
    };

    handleScroll = () => {
        const { fetching, reachedEndOffset, onListScroll, onScrollReachedEnd } = this.props;
        const windowScrollTop = this.wrapperRef && this.wrapperRef.scrollTop || 0,
            windowHeight = this.wrapperRef && this.wrapperRef.clientHeight || 0,
            documentHeight = this.containerRef && this.containerRef.clientHeight || 0;
        const onReachedEnd = windowScrollTop + windowHeight >= documentHeight - (reachedEndOffset || 100);
        if (isFunction(onListScroll)) {
            this.props.onListScroll({ windowScrollTop, windowHeight, documentHeight, onReachedEnd });
        }
        if (isFunction(onScrollReachedEnd) && onReachedEnd && !fetching) {
            this.props.onScrollReachedEnd();
        }
    };

    _renderLoadMoreIndicator = () => {
        // write this later;
        return <div></div>;
    };

    render() {
        const { classes, wrapperStyle, wrapperClass, containerStyle, containerClass, children } = this.props;
        return (
            <div ref={refs => this.wrapperRef = refs}
                onScroll={this.handleScroll}
                className={classNames(classes.wrapper, wrapperClass)}
                style={wrapperStyle}>
                <div ref={refs => this.containerRef = refs}
                    className={classNames(classes.container, containerClass)}
                    style={containerStyle}>
                    {children}
                    {/* {this._renderLoadMoreIndicator()} */}
                </div>
            </div>
        );
    };

}

ListView.propTypes = {
    fetching: PropTypes.bool,
    reachedEndOffset: PropTypes.number,
    onListScroll: PropTypes.func,
    onScrollReachedEnd: PropTypes.func,
};

export default withStyles(styles)(ListView);