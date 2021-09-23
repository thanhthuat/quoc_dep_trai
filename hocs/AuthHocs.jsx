import React from 'react';

import { getCookie, setCookie } from '../utils/StringUtils';
import { replaceRoute } from '../utils/RouterUtils';
import { jwtDecode } from '../utils/WebUtils';
import { getTimestamp } from '../utils/DateUtils';

const withAuth = () => WrappedComponent => {
	class Auth extends React.Component {
		constructor(props) {
			super(props);
			this.state = { isValidating: false };
		}
		componentDidMount() {
			const webCookie = getCookie();
			const accessToken = webCookie ? jwtDecode(webCookie.access_token) : null;
			const isValidAuth = accessToken?.exp * 1000 > getTimestamp();
			if (!isValidAuth) {
				// setCookie({ sourceVersion });
				// this.props.sessionLogout();
				replaceRoute('/');
			} else {
				this.setState({ isValidating: true });
			}
		}
		render() {
			const { isValidating } = this.state;
			if (!isValidating) { return <div></div>; }
			return <WrappedComponent {...this.props} />;
		}
	}
	return Auth;
}

export default withAuth;