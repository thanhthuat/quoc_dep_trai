import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';

import SessionActions from '../../redux/common/SessionRedux';

import { replaceRoute, setCurrentRouter, getRouterRoute, getRouterPage } from '../../utils/RouterUtils';
import { getTimestamp } from '../../utils/DateUtils';
import { jwtDecode, initWebSessionData, setDomainWeb } from '../../utils/WebUtils';
import { getCookie, setCookie } from '../../utils/StringUtils';
import { getLogDate, webLog } from '../../utils/StringUtils';

import { domains } from '../../constants';
import { sourceVersion } from '../../constants/Configs';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import { OverlaySpinkit } from '../../components/common';

class RootContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.is_mounted = true;
        this.role = {};
        this.state = {
            initPageDate: getTimestamp(),
            webTitle: 'OMI CRM',
        };
    }

    componentDidMount() {
        const { host } = window.location;
        if (host === domains.localPath || (host.indexOf(domains.localPath) > -1 && `http://${host}` !== domains.localRedirect)) {
            window.location.href = domains.localRedirect;
        } else {
            setDomainWeb(host);
            const webCookie = getCookie();
            // START: validate source version to force logout and reload web
            const curVersion = parseInt(webCookie && webCookie.sourceVersion || 0);
            if ((curVersion && parseInt(curVersion) < sourceVersion) || !curVersion) {
                setCookie({ sourceVersion });
                this.setState({ isResetSourceData: true });
                this.props.sessionLogout(true);
                window.location.reload();
            }
            // END: validate source version to force logout and reload web
            // START: validate session access
            const cookieToken = webCookie ? jwtDecode(webCookie.access_token) : null;
            let tokenExpiredDate = cookieToken ? getLogDate(cookieToken.exp * 1000) : '';
            if (tokenExpiredDate) { webLog(`token expired date: ${tokenExpiredDate}`, { type: 'WEB', color: 'darkviolet', date: true }); }
            if ((cookieToken && cookieToken.exp * 1000 <= getTimestamp()) || !cookieToken) {
                this.props.sessionLogout();
                replaceRoute('/');
            } else {
                const { is_owner_tenant, is_force_change_password } = cookieToken;
                if (is_force_change_password === true) {
                    replaceRoute('/change-password');
                } else {
                    initWebSessionData(is_owner_tenant, cookieToken);
                    this.handleRedirect();
                }
            }
            this.setState({ isValidateFinish: true });
            // END: validate session access
        }
    }

    componentWillUnmount() { this.is_mounted = false; }

    componentDidUpdate(prevProps) {
        const { accessToken } = this.props;
        if (accessToken && !prevProps.accessToken) {
            this.handleRedirect();
        }
    }

    handleRedirect = () => {
        if (getRouterRoute() === '/') {
            replaceRoute('/welcome');
        }
    }

    _renderWebHeader = () => {
        // const { webTitle } = this.state;
        return (
            <Helmet>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <meta charSet="utf-8" />
                {/* <title>{webTitle}</title> */}
            </Helmet>
        );
    };

    _renderWidgets = () => {
        return (
            <Fragment>
                <OverlaySpinkit />
                <ToastContainer />
            </Fragment>
        )
    };

    _renderPages = () => {
        const { isResetSourceData, isValidateFinish } = this.state;
        const { classes } = this.props;
        if (isResetSourceData || !isValidateFinish) { return null; }
        return (
            <div className={classes.container}>
                {React.Children.map(this.props.children, (child, index) => {
                    return React.cloneElement(child, {
                        index,
                        // pass some props to all child page;
                    });
                })}
            </div>
        );
    };

    render() {
        const { classes } = this.props;
        const curRoute = getRouterRoute().substring(1);
        if (curRoute !== getRouterPage(1)) { setCurrentRouter(curRoute); }
        return (
            <div className={classes.wrapper}>
                {/* START: render custom web header, using react-helmet */}
                {this._renderWebHeader()}
                {/* END: render custom web header, using react-helmet */}
                {/* START: render all widget */}
                {this._renderWidgets()}
                {/* END: render all widget */}
                {/* START: render all web page */}
                {this._renderPages()}
                {/* END: render all web page */}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const { accessToken } = state.session;
    return {
        accessToken,
    };
};

const mapDispatchToProps = dispatch => ({
    sessionLogout: (isRedirect) => dispatch(SessionActions.sessionLogout(isRedirect)),
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(RootContainer);
