import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// utils
import { isArray } from '../../../utils/Utils';
import { i18nText } from '../../../utils/StringUtils';
import { routerPush, routerBack } from '../../../utils/RouterUtils';

// styles
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

// @material-ui
import Paper from '@material-ui/core/Paper';

// components
import { TextButton, ImageViewer } from '..';
// import { LanguageSwitcher, TextButton, ImageViewer } from '..';

// icons
const icon_nav_back = require('../../../assets/icons/common/ic_arrow_back_g.png');

class WebContent extends React.Component {

    onClick = (type, value) => {
        switch (type) {
            case 'viewHomepage':
                const { protocol, port } = window.location;
                let is_localhost = value.indexOf('app.localhost');
                window.location.href = `${protocol}//${value}${is_localhost > -1 ? `:${port}` : ''}`;
                break;
            case 'privacy-policy': case 'terms-of-service':
                routerPush('/' + type);
                break;
            case 'onNavBackBtn':
                routerBack(value);
                break;
            default: break;
        }
    };

    render() {
        const { classes, type, options, contents } = this.props;
        switch (type) {
            case 'backdrop':
                const backdrop_container_class = classNames({
                    [classes.backdrop_container]: true,
                    [classes.wellcome_background]: options && options.type === 'wellcome' || false,
                });
                return (
                    <div className={backdrop_container_class} style={options && options.container || null}>
                        <div className={classes[`backdrop_content_${options && options.direction || 'left'}`]} style={options && options.content || null}></div>
                    </div>
                );
            case 'header':
                return (
                    <div className={classes.page_header}>
                        {contents && contents.powered_by &&
                            <div className={classes.logo_view}>
                                <div className={classes.logo_img} />
                                <span className={classes.logo_text}>{i18nText('intro.powered_by')}</span>
                            </div>
                        }
                        {/* {contents && contents.language_switcher && <LanguageSwitcher offset={8} />} */}
                    </div>
                );
            case 'navBackBtn':
                const btnProps = { src: icon_nav_back, size: 24, onClick: () => this.onClick('onNavBackBtn', options && options.redirect || '') };
                return <div className={classes.navBackBtn}><ImageViewer {...btnProps} /></div>;
            case 'intro':
                return (
                    <div className={classes.page_body}>
                        <div className={classes.intro_view}>
                            <p className={classes.intro_text_company}>
                                {i18nText('intro.company')}
                            </p>
                            <p className={classes.intro_text}>
                                {i18nText('intro.desc')}
                            </p>
                            <div className={classes.intro_footer}>
                                {/* <div className={classes.privacy_view}>
                                    <TextButton
                                        text={i18nText('privacy_policy')}
                                        className={classes.privacy_button}
                                        onClick={() => this.onClick('privacy-policy')} />
                                    <span> | </span>
                                    <TextButton
                                        text={i18nText('terms_of_service')}
                                        className={classes.privacy_button}
                                        onClick={() => this.onClick('terms-of-service')} />
                                </div> */}
                                <span>{i18nText('intro.contact')}</span><br />
                                <span>{i18nText('intro.address')}</span><br />
                            </div>
                        </div>
                    </div>
                );
            case 'wellcome':
                const homepageUrl = options && options.homepage || '';
                return (
                    <div className={classes.page_body}>
                        <div className={classes.intro_view}>
                            <p className={classes.intro_text_company}>
                                {i18nText('intro.wellcome')}
                            </p>
                            <p className={classes.intro_text}>
                                {i18nText('intro.wellcome_desc')}
                                <span className={classes.homepage_text}
                                    onClick={() => this.onClick('viewHomepage', homepageUrl)}>
                                    {homepageUrl}
                                </span>
                            </p>
                            <span className={classes.intro_footer}>
                                {i18nText('intro.contact')} <br />
                                {i18nText('intro.address')} <br />
                            </span>
                        </div>
                    </div>
                );
            case 'footer':
                return (
                    <div className={classes.page_footer}>
                        <span className={classes.page_footer_text}>
                            {i18nText('intro.contact')} | {i18nText('intro.address')}
                        </span>
                    </div>
                );
            case 'privacy_policy': case 'terms_of_service':
                if (!isArray(contents)) { return null; }
                return (
                    <Paper className={classes.pp_tos_view}>
                        {contents.map((content, index) => {
                            const { type, text, desc, padding } = content;
                            const cProps = { key: index };
                            switch (type) {
                                case 'title':
                                    cProps.className = classes.pp_tos_titleTxt;
                                    return <p {...cProps}>{text}</p>;
                                case 'head':
                                    cProps.className = classes.pp_tos_headTxt;
                                    if (!text && !desc) { return null; }
                                    return (
                                        <p {...cProps}>
                                            {text && <b>{text}</b>}
                                            {desc &&
                                                <Fragment>
                                                    {text && <br />}
                                                    <span className={classes.pp_tos_headDesc}>{desc}</span>
                                                </Fragment>
                                            }
                                        </p>
                                    );
                                case 'summary':
                                    cProps.className = classes.pp_tos_summaryTxt;
                                    return (
                                        <p {...cProps}>
                                            <b>{i18nText('pp_summary')}</b>
                                            <br /><span>{text}</span>
                                        </p>
                                    );
                                default:
                                    cProps.className = classes.pp_tos_lineTxt;
                                    cProps.style = { paddingLeft: 32 + (24 * (padding || 0)) };
                                    return <p {...cProps}>{text}</p>;
                            }
                        })}
                    </Paper>
                );
            default:
                return <div></div>;
        }
    };

}

WebContent.propTypes = {
    type: PropTypes.oneOf(['backdrop', 'header', 'navBackBtn', 'intro', 'wellcome', 'footer', 'privacy_policy', 'terms_of_service']),
    options: PropTypes.oneOfType([
        PropTypes.any,
        PropTypes.shape({
            // START: backdrop's options
            type: PropTypes.string,
            container: PropTypes.object, // container's style
            content: PropTypes.object, // content's style
            direction: PropTypes.string,
            // END: backdrop's options
            // START: navBackBtn's options
            redirect: PropTypes.string,
            // END: wellcome''s options
            // START: navBackBtn's options
            homepage: PropTypes.string,
            // END: wellcome''s options
        }),
    ]),
    contents: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.shape({ // header's content
            powered_by: PropTypes.bool,
            language_switcher: PropTypes.bool,
        }),
    ]),
};

export default withStyles(styles)(WebContent);
