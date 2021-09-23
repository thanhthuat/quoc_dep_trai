import React from 'react';
import App from 'next/app';
import MomentUtils from '@date-io/moment';
import { ReactReduxContext } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import reduxWrapper from '../redux';

import '../cores';
import '../assets/css/styles.css';
import '../assets/css/CustomReactToastify.css';

import RootContainer from '../containers/root-container';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<ReactReduxContext.Consumer>
				{({ store }) => (
					<PersistGate persistor={store.__persistor} loading={null}>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<RootContainer>
								<Component {...pageProps} />
							</RootContainer>
						</MuiPickersUtilsProvider>
					</PersistGate>
				)}
			</ReactReduxContext.Consumer>
		);
	}
}

export default reduxWrapper.withRedux(MyApp);