import React from 'react';

// styles
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

// components
import Header from '../header';

class Layout extends React.PureComponent {

    constructor(props) {
        super(props);
        this.is_mounted = true;
        this.layoutRef = null;
        this.layoutChildRef = null;
    };

    componentDidMount() { this.props.onRef({ layoutRef: this.layoutRef, layoutChildRef: this.layoutChildRef }); };
    componentWillUnmount() { this.is_mounted = false; this.props.onRef({ layoutRef: null, layoutChildRef: null }); };

    handleScroll = () => {
        const { reachedEndOffset } = this.props;
        const windowScrollTop = this.layoutRef && this.layoutRef.scrollTop || 0,
            windowHeight = this.layoutRef && this.layoutRef.clientHeight || 0,
            documentHeight = this.layoutChildRef && this.layoutChildRef.clientHeight || 0;
        if (this.props.onLayoutScroll) {
            const onReachedEnd = windowScrollTop + windowHeight >= documentHeight - (reachedEndOffset || 100);
            this.props.onLayoutScroll({ windowScrollTop, windowHeight, documentHeight, onReachedEnd });
        }
    };

    render() {
        const { classes, searchable, keyword, isListView } = this.props;
        const wrapperStyle = {
            ...(isListView ? { overflow: 'hidden' } : { overflowY: 'auto', overflowX: 'hidden' }),
        };
        const wrapperProps = {
            ref: ref => { if (ref) { this.layoutRef = ref; } },
            className: classes.wrapper,
            style: wrapperStyle,
            onScroll: this.handleScroll,
        };
        const headerProps = {
            searchable, keyword,
            onHeaderClick: this.props.onHeaderClick,
        };
        const containerProps = {
            ref: ref => { if (ref) { this.layoutChildRef = ref; } },
            className: classes.container,
            style: { overflow: isListView ? 'hidden' : 'auto' },
        };
        return (
            <div {...wrapperProps}>
                <Header {...headerProps} />
                <div {...containerProps}>
                    {this.props.children}
                </div>
            </div>
        );
    };

}

Layout.defaultProps = {
    onRef: () => { },
    onLayoutScroll: () => { },
    onHeaderClick: () => { },
    keyword: '',
};

export default withStyles(styles)(Layout);