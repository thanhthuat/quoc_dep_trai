import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// utils
import { i18nText } from '../../../../utils/StringUtils';
import { normalizeComponent, getTableColumnStyle, isShowTableAction } from '../../../../utils/StyleUtils';
import { getTimestamp, nextDateTime } from '../../../../utils/DateUtils';
import { isArray, isObject } from '../../../../utils/Utils';

// constants
import { popperModifiers } from '../../../../constants/Configs';

// styles
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../../../assets/styles/Theme';
import { styles } from './styles';

// @material-ui
import Grid from '@material-ui/core/Grid';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// components
import { ImageViewer } from '../../../../components/common';

const iconSortUp = require('../../../../assets/icons/common/ic_sort_up_g.png');
const iconSortDown = require('../../../../assets/icons/common/ic_sort_down_g.png');

const mediaColTypes = ['avatar', 'image'];

var last_open_popper_ts = getTimestamp();

class TableHeader extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            cur_open_popper: '', // setting, selected_menu, selected_option;
            curSortField: this.initSortOpts(props.columns),
        };
        this.settingRef = null;
    };

    componentDidUpdate(prevProps) {
        const { selectedCount } = this.props;
        if (selectedCount !== prevProps.selectedCount) {
            this.setState({ cur_open_popper: '' });
        }
    }

    initSortOpts = (columns) => {
        if (!isArray(columns, true)) { return null; }
        let sortFields = columns.filter(item => item && item.sortable);
        if (sortFields.length === 0) { return null; }
        let defaultSortFields = sortFields.find(item => item.sortable.isDefault);
        return defaultSortFields || null;
    };

    handleTogglePopper = type => event => {
        const { cur_open_popper } = this.state;
        const { currentTarget } = event;
        let next_state = { anchorEl: currentTarget, cur_open_popper: '' };
        let currentTime = getTimestamp(), lastTime = nextDateTime('ms', 200, last_open_popper_ts);
        let iconSettingNode = document.getElementById('icon_setting');
        if ((cur_open_popper !== type || !cur_open_popper) && currentTime > lastTime) {
            next_state.cur_open_popper = type;
            if (type === 'setting') {
                iconSettingNode.style.transform = 'rotate(120deg)';
            }
        } else {
            if (type === 'setting') {
                iconSettingNode.style.transform = 'rotate(0deg)';
            }
        }
        this.setState(next_state);
    };

    handleChangeSort = (column) => {
        const { curSortField } = this.state;
        const { code, sortable } = column;
        const is_same_column = curSortField.code === code;
        const next_sort_type = code === 'expire_date' ? 'expiry_date' : code;
        const next_sort_value = is_same_column ? (curSortField.sortable.type === 'asc' ? 'desc' : 'asc') : sortable.type;
        const next_sort_data = { sort_type: next_sort_type, sort_value: next_sort_value };
        this.setState({ curSortField: { ...column, sortable: { ...column.sortable, type: next_sort_value } } });
        this.props.onSortChange(next_sort_data);
    };

    _renderSortNode = (is_sort, column) => {
        if (!is_sort) return null;
        const { curSortField } = this.state;
        const { classes } = this.props;
        const { code } = column;
        return (
            <div className={classes.sort_view}>
                <ImageViewer src={iconSortUp} size={11} className={classes.sort_icon}
                    style={{ opacity: curSortField ? (curSortField.code === code && curSortField.sortable.type === 'asc' ? 1 : 0.3) : 0.3 }}
                />
                <ImageViewer src={iconSortDown} size={11} className={classes.sort_icon}
                    style={{ opacity: curSortField ? (curSortField.code === code && curSortField.sortable.type === 'desc' ? 1 : 0.3) : 0.3 }}
                />
            </div>
        );
    };

    _renderMainColumn = (isShowAction) => {
        const { classes, columns, resizeable, columnSizes, settings, noneContent } = this.props;
        let colNodes = null;
        if (isArray(columns, true)) {
            colNodes = columns.map((column, index) => {
                if (!column || column.type === 'action') return null;
                const { col, code, name, type, sortable, align, color, headerComp } = column;
                const isSortable = sortable ? true : false;
                const alignType = align || 'left';
                const onClickColFunc = () => { if (isSortable) { this.handleChangeSort(column) } };
                const contentClass = classNames({
                    [classes.header_content]: true,
                    [classes.clickable]: isSortable,
                });
                const textClass = classNames({
                    [classes.header_text]: true,
                    [classes.clickable]: isSortable,
                });
                const textProps = { className: textClass };
                if (color) { textProps.style = { color }; }
                const headerTxt = name ? (isObject(name) ? (name.custom || i18nText(name.i18)) : name.toString()) : '';
                const compArgs = { props: textProps, data: headerTxt };
                const textNode = <span {...textProps}>{headerTxt}</span>;
                const contentNode = normalizeComponent(headerComp, compArgs, textNode);
                const colNode = (
                    <div className={contentClass} onClick={onClickColFunc}>
                        {contentNode}
                        {this._renderSortNode(isSortable, column)}
                    </div>
                );
                const containerClass = classNames({
                    [classes.header_container]: true,
                    [classes[`header_align_${alignType}`]]: true,
                    [classes.header_container_grid]: !resizeable,
                    [classes.header_container_resizeable]: resizeable,
                });
                const colProps = { key: index, className: containerClass };
                if (resizeable) {
                    if (mediaColTypes.includes(type)) {
                        colProps.style = { height: 20, width: (type === 'avatar' ? 32 : 48) + 8, marginRight: 16 }; // paddingRight: 24px, marginRight: 8px;
                        delete colProps.className;
                        return <div {...colProps} />;
                    }
                    const isLastCol = index === columns.length - 1, isShowSetting = isArray(settings, true);
                    colProps.style = {
                        ...getTableColumnStyle(columnSizes[index], column),
                        // marginRight: isLastCol && isShowSetting && !isShowAction ? 44 : 8,
                        marginRight: 8,
                    };
                    return (
                        <div {...colProps}>
                            {colNode}
                            {!noneContent &&
                                <div
                                    className={classes.table_resizer}
                                    onMouseDown={event => this.props.resizeColumnStart({ event, index, column }, false)}
                                    onTouchStart={event => this.props.resizeColumnStart({ event, index, column }, true)}
                                />
                            }
                        </div>
                    );
                }
                return <Grid item xs={col} {...colProps}>{colNode}</Grid>;
            });
        }
        return colNodes;
    };

    _renderLastColumn = (isShowAction) => {
        const { anchorEl, cur_open_popper } = this.state;
        const { classes, columns, settings, resizeable, actions } = this.props;
        const isShowSetting = isArray(settings, true);
        if (!isArray(columns, 1) || (!isShowAction && !isShowSetting)) return null;
        const column = columns[columns.length - 1];
        let popperType = 'setting', settingCol = null;
        if (isShowSetting) {
            const popperProps = { open: cur_open_popper === popperType, anchorEl, transition: true, placement: 'bottom-end', modifiers: popperModifiers, style: { zIndex: 2000 } };
            settingCol = (
                <Fragment>
                    <ImageViewer id={'icon_setting'}
                        src={require('../../../../assets/icons/common/ic_setting_g.png')}
                        className={classNames({ [classes.img_icon]: true, [classes.absolute]: resizeable })}
                        onClick={this.handleTogglePopper(popperType)}
                    />
                    <Popper {...popperProps}>
                        {({ TransitionProps }) => (
                            <Collapse {...TransitionProps} timeout={100}>
                                <ClickAwayListener onClickAway={() => {
                                    document.getElementById('icon_setting').style.transform = 'rotate(0deg)';
                                    last_open_popper_ts = getTimestamp();
                                    this.setState({ cur_open_popper: '' });
                                }}>
                                    <Paper className={classes.dropdown}>
                                        <MenuList role='menu' className={classes.menu_list}>
                                            {settings.map((setting, key) => {
                                                return (
                                                    <MenuItem key={key}
                                                        className={classes.dropdown_item_setting}
                                                        onClick={() => {
                                                            this.setState({ cur_open_popper: '' });
                                                            this.props.onClick(setting.id);
                                                        }}>
                                                        {setting.text}
                                                    </MenuItem>
                                                );
                                            })}
                                        </MenuList>
                                    </Paper>
                                </ClickAwayListener>
                            </Collapse>
                        )}
                    </Popper>
                </Fragment>
            );
        }
        if (settingCol && !isShowAction) {
            if (resizeable) {
                return (
                    <div className={classNames('sticky', {
                        // [classes.none_action_setting_container]: true,
                        [classes.header_setting_layer]: resizeable,
                    })}>
                        <div className={classes.setting_overlayer} />
                        {settingCol}
                    </div>
                );
            }
            return (
                <div className={classes.none_action_setting_container}>
                    {settingCol}
                </div>
            );
        }
        if (resizeable) {
            // START: render hidden actionview to get correctly setting button position;
            let actionCells = null;
            if (isShowAction) {
                actionCells = actions.map((action, index) => {
                    if (!action || (!action.text && !action.icon) || action.noHeader) { return null; }
                    const { style, text, icon, disable, Comp } = action;
                    const compArgs = { props: { key: index, className: classes.item_action } };
                    const actionCell = (
                        <div key={index} {...compArgs.props}>
                            {icon ?
                                <ImageViewer src={icon} disable={disable} style={style} clickable />
                                :
                                <span className={classNames({ [classes.ia_text]: true, [classes.disable]: disable })} style={style}>
                                    {text || '...'}
                                </span>
                            }
                        </div>
                    );
                    compArgs.data = { isHeader: true, action: action, actionIndex: index };
                    return normalizeComponent(Comp, compArgs, actionCell);
                });
            }
            // END: render hidden actionview to get correctly setting button position;
            const actionProps = {
                style: { visibility: 'hidden', marginRight: settingCol ? -24 : 0 },
                className: classNames({ [classes.ia_container]: true, [classes.ia_resizeable]: isShowAction }),
            };
            return (
                <Fragment>
                    <div {...actionProps}>{actionCells}</div>
                    {settingCol &&
                        <div className={classNames('sticky', classes.header_setting_layer)}>
                            {settingCol}
                        </div>
                    }
                </Fragment>
            );
        }
        return (
            <Grid item xs={column.col} className={classes.header_setting}>
                <div className={classes.setting_container}>
                    {settingCol}
                </div>
            </Grid>
        );
    };

    _renderMainContent = () => {
        const { classes, columns, selectable, resizeable, settings, actions, noPadding } = this.props;
        if (!isArray(columns, true)) { return null; }
        const isShowAction = isShowTableAction({ columns, actions, resizeable });
        const headerItemStyle = {
            paddingLeft: noPadding ? 0 : (selectable && !mediaColTypes.includes(columns[0].type) ? 68 : 24),
            paddingRight: noPadding ? 0 : (!isShowAction && isArray(settings, true) ? 56 : 16),
        };
        return (
            <div className={classes.header_item} style={headerItemStyle}>

                {resizeable ?
                    <div className={classes.content_wrapper_resizeable}>
                        {this._renderMainColumn(isShowAction)}
                        {this._renderLastColumn(isShowAction)}
                    </div>
                    :
                    <Grid container style={{ height: 20 }}>
                        {this._renderMainColumn(isShowAction)}
                        {this._renderLastColumn(isShowAction)}
                    </Grid>
                }

            </div>
        );
    };

    _renderSubContent = () => {
        const { anchorEl, cur_open_popper } = this.state;
        const { classes, columns, options, selectedCount, selectedCountText, noPadding, showPagination } = this.props;
        const popperTypeMenu = 'selected_menu', popperTypeOption = 'selected_option';
        const select_menus = [
            { id: 'selectAll', text: i18nText(showPagination ? 'select_all_page' : 'select_all') },
            ...(showPagination ? [{ id: 'selectOnPage', text: i18nText('select_on_page') }] : []),
            { id: 'unselectAll', text: i18nText('un_select_all') },
        ];
        const popperProps = { anchorEl, transition: true, placement: 'bottom-start', modifiers: popperModifiers, style: { zIndex: 10000 } };
        return (
            <div className={classes.header_item} style={{ padding: `0px ${noPadding ? 0 : 24}px` }}>

                <div className={classes.option_view}>

                    {/* START: button uncheck all */}
                    <div className={classNames({
                        [classes.unselect_view]: true,
                        [classes.content_avatar]: columns[0] && columns[0].type === 'avatar',
                        [classes.content_image]: columns[0] && columns[0].type === 'image',
                    })}>
                        <ImageViewer
                            src={require('../../../../assets/icons/common/ic_uncheck_all_b.png')}
                            className={classes.img_icon}
                            onClick={() => this.props.onClick('unselectAll')}
                        />
                    </div>
                    {/* END: button uncheck all */}

                    {/* START: btn show selected menu */}
                    <ImageViewer
                        src={require('../../../../assets/icons/common/ic_triangle_down_b.png')}
                        className={classes.selected_menu_btn}
                        style={{ marginLeft: mediaColTypes.includes(columns[0] && columns[0].type) ? 0 : 8 }}
                        onClick={this.handleTogglePopper(popperTypeMenu)}
                    />
                    <Popper {...popperProps} open={cur_open_popper === popperTypeMenu}>
                        {({ TransitionProps }) => (
                            <Collapse {...TransitionProps} timeout={10}>
                                <ClickAwayListener onClickAway={() => {
                                    last_open_popper_ts = getTimestamp();
                                    this.setState({ cur_open_popper: '' });
                                }}>
                                    <Paper className={classes.dropdown}>
                                        <MenuList role='menu'>
                                            {select_menus.map((option, key) => {
                                                return (
                                                    <MenuItem
                                                        key={key}
                                                        className={classes.dropdown_item}
                                                        onClick={() => {
                                                            this.setState({ cur_open_popper: '' });
                                                            this.props.onClick(option.id);
                                                        }}>
                                                        {option.text}
                                                    </MenuItem>
                                                );
                                            })}
                                        </MenuList>
                                    </Paper>
                                </ClickAwayListener>
                            </Collapse>
                        )}
                    </Popper>
                    {/* END: btn show selected menu */}

                    {/* START: btn show selected options */}
                    {isArray(options, true) &&
                        <Fragment>
                            <ImageViewer
                                src={require('../../../../assets/icons/common/ic_menu_vertical_b.png')}
                                className={classes.selected_option_btn}
                                onClick={this.handleTogglePopper(popperTypeOption)}
                            />
                            <Popper {...popperProps} open={cur_open_popper === popperTypeOption}>
                                {({ TransitionProps }) => (
                                    <Collapse {...TransitionProps} timeout={100}>
                                        <ClickAwayListener onClickAway={() => {
                                            last_open_popper_ts = getTimestamp();
                                            this.setState({ cur_open_popper: '' });
                                        }}>
                                            <Paper className={classes.dropdown}>
                                                <MenuList role='menu'>
                                                    {options.map((option, key) => {
                                                        if (option) return (
                                                            <MenuItem key={key}
                                                                className={classes.dropdown_item}
                                                                onClick={() => {
                                                                    this.setState({ cur_open_popper: '' });
                                                                    this.props.onClick(option.id);
                                                                }}>
                                                                {option.text}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </MenuList>
                                            </Paper>
                                        </ClickAwayListener>
                                    </Collapse>
                                )}
                            </Popper>
                        </Fragment>
                    }
                    {/* END: btn show selected options */}

                </div>

                {/* START: display total selected data */}
                <div className={classes.count_view}>
                    <span className={classes.count_text}>
                        {i18nText('selected')} {selectedCount} {selectedCountText?.toLowerCase()}
                    </span>
                </div>
                {/* END: display total selected data */}

            </div>
        );
    };

    render() {
        const { classes, selectedCount, resizeable, isColumnResized, bgColor, noPadding } = this.props;
        const wrapperStyle = {
            minWidth: `calc(100% - ${noPadding ? 0 : 64}px)`,
            width: !selectedCount ? 'fit-content' : 'unset',
            left: selectedCount ? 0 : 'unset',
            // width: resizeable && isColumnResized && !selectedCount ? 'fit-content' : 'unset',
            // left: resizeable && selectedCount ? 0 : 'unset',
            backgroundColor: bgColor || colors.bgColor,
            padding: `24px ${noPadding ? 0 : 32}px 8px`,
        };
        return (
            <div className={classNames('sticky', classes.header_wrapper)} style={wrapperStyle}>
                {selectedCount ? this._renderSubContent() : this._renderMainContent()}
            </div>
        );
    };

}

TableHeader.propTypes = {
    columns: PropTypes.array.isRequired, // { code: PropTypes.string, name: PropTypes.string, col: PropTypes.number, align: PropTypes.string, width: PropTypes.number, minWidth: PropTypes.number, sortable: { type: PropTypes.string /*avatar, image*/, isDefault: PropTypes.bool }, Comp: (className, item, index) => {}, color: PropTypes.string, headerComp: (className, item, index) => {}, },
    options: PropTypes.array, // { id: PropTypes.string, text: PropTypes.string }
    settings: PropTypes.array, // { id: PropTypes.string, text: PropTypes.string }
    selectedCount: PropTypes.number,
    selectedCountText: PropTypes.string,
    onRef: PropTypes.func,
    onClick: PropTypes.func,
    onSortChange: PropTypes.func,
    resizeColumnStart: PropTypes.func,
    resizeable: PropTypes.bool,
    isColumnResized: PropTypes.bool,
    columnSizes: PropTypes.object,
    noneContent: PropTypes.bool,
    bgColor: PropTypes.any, // background-color for header wrapper;
    noPadding: PropTypes.bool, // remove header padding;
};

TableHeader.defaultProps = {
    columns: null,
    options: null,
    settings: null,
    selectedCount: 0,
    selectedCountText: i18nText('data'),
    onClick: () => { }, // default: selectAll, unselectAll
    onSortChange: () => { },
    resizeColumnStart: () => { },
};

export default withStyles(styles)(TableHeader);