import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';

// actions
import AuthActions from '../../../redux/user/UserRedux';

// utils
import { isEmail } from '../../../utils/Utils';
import { getErrorColor } from '../../../utils/StyleUtils';
import { getCookie } from '../../../utils/StringUtils';
import { getTimestamp } from '../../../utils/DateUtils';

// styles
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

// @material-ui/core
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

// components
import { WebContent, ImageViewer } from '../../../components/common';
const KeyboardEventHandler = dynamic(() => import('react-keyboard-event-handler'), { ssr: false });

// assets
const icons = {
	passShow: require('../../../assets/icons/common/ic_visibility_gray.png'),
	passHide: require('../../../assets/icons/common/ic_visibility_off_gray.png'),
};

// variable
const classifies = {
	login: 'userLogin',
};

class Login extends React.Component {

	constructor(props) {
		super(props);
		const accessToken = getCookie()?.access_token || null;
		const isLogin = (accessToken?.exp <= getTimestamp() || !accessToken) ? false : true;
		this.state = {
			// START: login form
			email: '',
			password: '',
			showPassword: false,
			errorMsg: {
				email: '',
				password: '',
			},
			// END: login form
			isValidateFinish: true,
			isLogin,
		};
		this.is_mounted = true;
		this.myRefs = {};
	}

	componentWillUnmount() { this.is_mounted = false; }

	componentDidUpdate(prevProps) {
		const { fetching, error } = this.props;
		if (prevProps.fetching[classifies.login] && !fetching[classifies.login] && error[classifies.login]) {
			this.setErrorMsg({ email: error[classifies.login] });
		}
	}

	setErrorMsg = (error) => { this.setState(state => ({ errorMsg: { ...state.errorMsg, ...error } })); };
	toggleShowPassword = (field) => { this.setState(state => ({ [field]: !state[field] })); };

	handleChangeValue = (e) => {
		const { errorMsg } = this.state;
		const { id, value } = e.target;
		const nextState = { [id]: value, errorMsg: { ...errorMsg, [id]: '' } }
		if (id === 'email') {
			nextState[id] = value ? value.toLowerCase() : '';
		}
		this.setState(nextState);
	}

	onBlur = (e) => {
		const { id, value } = e.target;
		switch (id) {
			case 'email':
				if (value && !isEmail(value)) {
					this.setErrorMsg({ email: 'Email sai định dạng' });
				} else {
					this.setErrorMsg({ email: '' });
				}
				break;
			case '': break;
			default: break;
		}
	}

	onClick = (cType, cData) => {
		switch (cType) {
			case 'login': {
				const { email, password } = this.state;
				let checkPassword = false, checkEmail = false;
				if (!email || !isEmail(email)) {
					this.setErrorMsg({ email: email ? 'Email sai định dạng' : 'Email không được để trống' });
				} else {
					checkEmail = true;
					this.setErrorMsg({ email: '' });
				}
				if (!password) {
					this.setErrorMsg({ password: 'Mật khẩu không được để trống' });
				} else {
					checkPassword = true;
					this.setErrorMsg({ password: '' });
				}
				if (!checkEmail || !checkPassword) { return; }
				const param = { identify_info: email, password, kind: 'internal', domain: '' };
				this.props.userLogin(classifies.login, param);
			} break;
			case '': break;
			default: break;
		}
	}

	_renderInput = (data) => {
		const { errorMsg } = this.state;
		const { classes } = this.props;
		const { label, id, type, style, placeholder, onKeyPress, InputProps, disabled } = data;
		return (
			<Fragment>
				<p className={classes.inputLabel} style={{ color: getErrorColor(errorMsg[id]) }}>
					{errorMsg[id] || label}
				</p>
				<TextField
					inputRef={ref => { this.myRefs[id || 'input'] = ref; }}
					disabled={disabled || false}
					id={id || 'input'}
					type={type || 'text'}
					style={{ marginBottom: 16, ...style }}
					className={classes.inputField}
					variant={'outlined'}
					placeholder={placeholder || ''}
					value={this.state[id || 'input']}
					onBlur={this.onBlur}
					onChange={this.handleChangeValue}
					onKeyPress={onKeyPress}
					InputProps={InputProps}
				/>
			</Fragment>
		);
	}

	render() {
		const { showPassword, isValidateFinish, isLogin } = this.state;
		const { classes } = this.props;
		if (!isValidateFinish || isLogin) { return <div></div>; }
		return (
			<div className={classes.wrapper}>

				{/* START: background image */}
				<WebContent type={'backdrop'} />
				{/* END: background image */}

				{/* START: header logo */}
				<WebContent type={'header'} contents={{ powered_by: true }} />
				{/* END: header logo */}

				{/* START: introduction */}
				<WebContent type={'intro'} />
				{/* END: introduction */}

				{/* START: login input form */}
				<div className={classes.formContainer}>
					<Paper className={classes.formView}>

						<p className={classes.formTitle}>Đăng nhập</p>

						{this._renderInput({
							label: 'Email',
							id: 'email',
							type: 'email',
							placeholder: 'email@example.com',
							onKeyPress: (event) => {
								if (event.key === 'Enter') {
									this.onClick('login');
									event.preventDefault();
								}
							},
						})}

						{this._renderInput({
							label: 'Mật khẩu',
							id: 'password',
							type: showPassword ? 'text' : 'password',
							placeholder: 'Nhập vào mật khẩu',
							InputProps: {
								endAdornment: (
									<InputAdornment position={'end'}>
										<IconButton onClick={() => this.toggleShowPassword('showPassword')}>
											<ImageViewer src={icons[`pass${showPassword ? 'Show' : 'Hide'}`]} />
										</IconButton>
									</InputAdornment>
								),
							},
							onKeyPress: (event) => {
								if (event.key === 'Enter') {
									this.onClick('login');
									event.preventDefault();
								}
							},
						})}

						<div className={classes.formBtn}>
							<Button id={'login_button'}
								className={classes.submitBtn}
								onClick={() => this.onClick('login')}>
								ĐĂNG NHẬP
							</Button>
						</div>

					</Paper>
				</div>
				{/* END: login input form */}

				{this.is_mounted && <KeyboardEventHandler handleKeys={['Enter']} onKeyEvent={() => this.onClick('login')} />}

			</div>
		);
	}

}

const mapStateToProps = state => {
	const { fetching, error, content } = state.user;
	return {
		fetching,
		error,
		content,
	}
};

const mapDispatchToProps = dispatch => ({
	userLogin: (classify, params) => dispatch(AuthActions.userLoginRequest(classify, params)),
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Login);
