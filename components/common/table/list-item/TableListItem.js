import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// utils
import { normalizeComponent, getTableColumnStyle, isShowTableAction } from '../../../../utils/StyleUtils';
import { isArray, isBoolean, isFunction, isUndefined } from '../../../../utils/Utils';

// styles
import { withStyles } from '@material-ui/core/styles';
import { avatarColors } from '../../../../assets/styles/Theme';
import { styles } from './styles';

// @material-ui/core
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';

// components
import { ImageViewer, Tooltip } from '../..';
import ContextMenuAction from '../context-menu-action';

// assets
const default_avatar_img = require('../../../../assets/images/common/img_user_avatar.png');
const iconCheckbox = require('../../../../assets/icons/common/ic_checkbox_b.png');
const iconCheckboxOutline = require('../../../../assets/icons/common/ic_checkbox_outline_g.png');

const mediaColTypes = ['avatar', 'image'];

class TableListItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            disableClick: false,
            isHoverItem: false,
        };
        this.itemTableRef = null;
        this.mounted = true;
    }

    componentDidMount() {
        const { isLastItem, contextMenu } = this.props;
        if (isLastItem) this.props.onRenderFinish();
        if (this.itemTableRef && contextMenu) {
            this.itemTableRef.addEventListener('contextmenu', this.rightClickHandler);
            document.addEventListener('contextmenu', (event) => {
                const { currentIndex, } = this.props;
                if (!isUndefined(currentIndex?.contextMenu)) {
                    event.preventDefault(); event.stopPropagation();
                    this.props.updateCurrentIndex({ 'contextMenu': null });
                }
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.itemTableRef) this.itemTableRef.removeEventListener('contextmenu', this.rightClickHandler);
        document.removeEventListener('contextmenu', this.rightClickHandler);
    }

    hideContextMenu = (event) => {
        if (event) { event.preventDefault(); event.stopPropagation(); }
        const { currentIndex, itemIndex } = this.props;
        if (!isUndefined(currentIndex?.contextMenu) && currentIndex?.contextMenu == itemIndex) {
            this.props.updateCurrentIndex({ 'contextMenu': null });
        }
    }

    rightClickHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { columns, itemIndex, actions, content, resizeable, header, selectedUuids } = this.props;
        if (!this.mounted || !isArray(columns, 1)) return;
        if (selectedUuids.length > 0 && !(selectedUuids || []).includes(content.uuid)) {
            this.props.updateCurrentIndex({ 'contextMenu': null });
            return;
        }
        const isShowAction = isShowTableAction({ columns, actions, resizeable }), isHideAction = content.hideAction;
        let menuContent = { actions: [], options: [] };
        if (!isShowAction || isHideAction) return;
        menuContent.actions = (selectedUuids.length > 1) ? [] : actions.map(action => {
            if (!action || (!action.text && !action.icon)) return null;
            const { id, style, text, icon, tooltip, disable, hidden, noneDisplay } = action;
            const onClickData = { id, index: itemIndex, item: content };
            const isNoneDisplay = isFunction(noneDisplay) ? noneDisplay(onClickData) : isBoolean(noneDisplay) ? noneDisplay : false;
            const isHidden = isFunction(hidden) ? hidden(onClickData) : isBoolean(hidden) ? hidden : false;
            if (isNoneDisplay || isHidden) return null;
            const isDisable = isFunction(disable) ? disable(onClickData) : isBoolean(disable) ? disable : false;
            const onClick = () => { this.hideContextMenu(); this.props.onItemClick(onClickData); };
            return { id, icon, text, tooltip, isDisable, style, onClick }
        });
        menuContent.options = (header?.options || []).map(option => {
            const { id, text, hideInContextMenu } = option;
            if (!hideInContextMenu) return { id, text, onClick: () => this.props.onHeaderClick(id, { index: itemIndex, item: content }) }
        });
        const clickX = event.clientX;
        const clickY = event.clientY;
        this.setState({ x: clickX, y: clickY, menuContent });
        this.props.updateCurrentIndex({ 'contextMenu': itemIndex });
    };

    _renderSubContent = () => {
        const { itemCustomComp, content, itemIndex } = this.props;
        if (!itemCustomComp) return;
        return normalizeComponent(itemCustomComp, { item: content, index: itemIndex });
    };

    _renderMainColumn = () => {
        const { isHoverItem } = this.state;
        const { classes, columns, content, itemIndex, isSelected, selectable, resizeable, columnSizes, multiline, disbaleItemSelectable, columnDataFormat } = this.props;
        let colNodes = null;
        if (isArray(columns, true)) {
            colNodes = columns.map((column, index) => {
                if (!column || column.type === 'action') return null;
                const { col, code, align, type, style, Comp, options } = column;
                const isFirstCol = index === 0, isMediaCol = mediaColTypes.includes(type);
                // START: render check box
                let cbNode = null, hoverProps = {}, isDisableSelect = false, selectProps = {};
                const cellStyle = {
                    paddingLeft: isFirstCol ? (selectable && !mediaColTypes.includes(type) ? 68 : 24) : 0,
                    ...style,
                };
                if (selectable && (isSelected || isHoverItem)) {
                    const onClickData = { id: isSelected ? 'unselect' : 'select', index: itemIndex, item: content };
                    const checkBoxClasses = classNames({
                        [classes.content_checkbox]: true,
                        [classes.content_checkbox_sticky]: isMediaCol,
                        [classes.disable_align_items]: multiline,
                        [classes.checkbox_multiline]: multiline && !selectable && isMediaCol,
                        [classes.checkbox_multiline_selectable]: multiline && selectable && !isMediaCol,
                        [classes.content_cb_avatar]: type === 'avatar',
                        [classes.content_cb_image]: type === 'image',
                    });
                    const selectClick = (e) => {
                        e.stopPropagation();
                        if (!isDisableSelect) {
                            let data = {
                                ...onClickData,
                                ...(e.shiftKey && { shift: true })
                            }
                            this.props.onItemClick(data)
                        }
                    };
                    const checkBoxProps = { className: checkBoxClasses };
                    isDisableSelect = disbaleItemSelectable && disbaleItemSelectable({ item: content, index: itemIndex });
                    if (isDisableSelect) { checkBoxProps.style = { visibility: 'hidden' }; } else {
                        if (isFirstCol) {
                            if (isMediaCol) { selectProps.onClick = selectClick; } else checkBoxProps.onClick = selectClick;
                        }
                    }
                    cbNode = (
                        <div {...checkBoxProps}>
                            <ImageViewer src={isSelected ? iconCheckbox : iconCheckboxOutline} clickable />
                        </div>
                    );
                }
                // END: render check box
                // START: render column
                let cellNode, colData = content[code];
                const colClass = classNames(classes.content_text, { [classes.content_text_multiline]: multiline });
                const compArgs = {
                    data: { item: content, index: itemIndex, cell: colData },
                    props: { className: colClass },
                };
                if (!isFirstCol && options && options.clickable) {
                    compArgs.props.onMouseEnter = () => this.setState({ disableClick: true });
                    compArgs.props.onMouseLeave = () => this.setState({ disableClick: false });
                }
                switch (type) {
                    case 'image':
                        compArgs.props.className = classes.content_image;
                        cellNode = <ImageViewer {...hoverProps} src={colData} className={classes.content_image} />
                        break;
                    case 'avatar':
                        compArgs.props.className = classes.content_avatar;
                        const avatar_bg_color = colData || !content.full_name ? 'transparent' : avatarColors[content.full_name[0].toUpperCase()];
                        const avatarStyle = {
                            borderRadius: options && options.square ? 'unset' : '50%',
                            backgroundColor: avatar_bg_color
                        };
                        hoverProps.className = classes.content_avatar;
                        hoverProps.style = avatarStyle;
                        cellNode = (
                            <Avatar {...hoverProps}>
                                {colData ?
                                    <ImageViewer src={colData} className={classes.content_avatar} lazyload fallbackSrc={default_avatar_img} />
                                    : content.full_name ? content.full_name[0].toUpperCase()
                                        : <ImageViewer src={default_avatar_img} className={classes.content_avatar} />
                                }
                            </Avatar>
                        )
                        break;
                    default:
                        const colProps = { className: colClass, style: { ...(options && options.style), ...(options && options.color && { color: options.color }) } };
                        const colFormater = columnDataFormat && columnDataFormat[code] || null;
                        let formatedData = '';
                        if (colData && colData.text) {
                            colProps.style = { ...colProps.style, ...colData.style, ...(colData.color && { color: colData.color }) };
                            formatedData = colFormater ? colFormater(colData.text) : colData.text;
                            if (colData.tooltip && colData.tooltip.title) {
                                cellNode = (
                                    <Tooltip {...colData.tooltip}>
                                        <span {...colProps}>{formatedData}</span>
                                    </Tooltip>
                                );
                            } else {
                                cellNode = <span {...colProps}>{formatedData}</span>;
                            }
                        } else {
                            let colText = !isUndefined(colData) ? colData.toString() : colData;
                            formatedData = colFormater ? colFormater(colText) : colText;
                            switch (type) {
                                case 'html': cellNode = <div {...colProps} dangerouslySetInnerHTML={{ __html: formatedData }} />; break;
                                case 'order': cellNode = <span {...colProps}>{itemIndex + (options && options.begin || 1)}</span>; break;
                                default: cellNode = <span {...colProps}>{formatedData}</span>; break;
                            }
                        }
                        break;
                }
                const colNode = normalizeComponent(Comp, compArgs, cellNode);
                // END: render column
                const alignType = align || 'left';
                const viewClasses = classNames({
                    [classes.content_view]: true,
                    [classes.content_view_multiline]: multiline,
                    [classes.content_view_grid]: !resizeable,
                    [classes.content_view_resizeable]: resizeable,
                    [classes[`content_view_align_${alignType}`]]: true,
                    [classes.content_view_avatar]: multiline && type === 'avatar',
                    [classes.content_view_image]: multiline && type === 'image',
                });
                const cellProps = { key: index, className: viewClasses, style: cellStyle, ...selectProps };
                const colContentNode = isFirstCol ?
                    (isMediaCol ? (isDisableSelect ? colNode : (cbNode || colNode))
                        : <Fragment>{cbNode}{colNode}</Fragment>) : colNode;
                if (resizeable) {
                    cellProps.style = { ...cellProps.style, ...getTableColumnStyle(columnSizes[index], column) };
                    return <div {...cellProps}>{colContentNode}</div>;
                }
                return <Grid item xs={col} {...cellProps}>{colContentNode}</Grid>;
            });
        }
        return colNodes;
    };

    _renderLastColumn = () => {
        const { isHoverItem } = this.state;
        const { classes, columns, content, itemIndex, actions, resizeable, header, multiline } = this.props;
        if (!isArray(columns, 1)) return null;
        const column = columns[columns.length - 1];
        if (!column || column.type !== 'action' || !isArray(actions, true)) return null;
        const isShowAction = isShowTableAction({ columns, actions, resizeable }), isHideAction = content.hideAction;
        const actionCells = (
            isShowAction && actions.map((action, index) => {
                if (!action || (!action.text && !action.icon)) { return null; }
                const { id, style, text, icon, tooltip, disable, hidden, noneDisplay, Comp } = action;
                const onClickData = { id, index: itemIndex, item: content };
                const isNoneDisplay = isFunction(noneDisplay) ? noneDisplay(onClickData) : isBoolean(noneDisplay) ? noneDisplay : false;
                if (isNoneDisplay) { return null; }
                const isHidden = isFunction(hidden) ? hidden(onClickData) : isBoolean(hidden) ? hidden : false;
                const isDisable = isFunction(disable) ? disable(onClickData) : isBoolean(disable) ? disable : false;
                const compArgs = {
                    props: {
                        key: index,
                        className: classNames({
                            [classes.item_action]: true,
                            [classes.item_action_multiline]: multiline,
                            [classes.hidden]: isHidden,
                        }),
                        onClick: (e) => { e.stopPropagation(); this.props.onItemClick(onClickData); },
                        onMouseEnter: () => this.setState({ disableClick: true }),
                        onMouseLeave: () => this.setState({ disableClick: false }),
                    },
                };
                const actionCell = (
                    <div {...compArgs.props}>
                        {icon ?
                            <ImageViewer src={icon} disable={isDisable} style={style} clickable />
                            :
                            <span className={classNames(classes.ia_text, { [classes.disable]: isDisable })} style={style}>
                                {text || '...'}
                            </span>
                        }
                    </div>
                );
                compArgs.data = { item: content, index: itemIndex, action: action, actionIndex: index };
                const cellNode = normalizeComponent(Comp, compArgs, actionCell);
                if (!isHideAction && tooltip && tooltip.title) { return (<Tooltip key={index} {...tooltip}>{cellNode}</Tooltip>); }
                return cellNode;
            })
        );
        const isShowSetting = resizeable && header && isArray(header.settings, true);
        const visibleStyle = { visibility: isHideAction || !isHoverItem ? 'hidden' : 'visible' };
        const actionClass = classNames(classes.ia_container, { [classes.disable_align_items]: multiline });
        const actionProps = { style: { display: isShowSetting || isShowAction ? 'flex' : 'none', ...visibleStyle }, className: actionClass };
        if (resizeable) {
            return (<div {...actionProps}>{actionCells}</div>);
        }
        return (<Grid item xs={column.col} className={actionClass} style={visibleStyle}>{actionCells}</Grid>);
    };

    _renderItem() {
        const { disableClick, x, y, menuContent } = this.state;
        const { classes, columns, content, itemIndex, isSelected, resizeable, header, multiline, actions, showSelectedShadow, disbaleItemViewDetail, currentIndex, collapse } = this.props;
        if (!isArray(columns, true) || !content) { return null; }
        const isShowAction = isShowTableAction({ columns, actions, resizeable });
        const isDisableViewDetail = isFunction(disbaleItemViewDetail) ? disbaleItemViewDetail({ item: content, index: itemIndex }) : isBoolean(disbaleItemViewDetail) ? disbaleItemViewDetail : false;
        const list_item_class = classNames(classes.item_content, {
            [classes.item_content_collapse]: itemIndex == currentIndex.collapse,
            [classes.item_content_resizeable]: resizeable,
            [classes.item_content_multiline]: multiline,
            [classes.item_content_selected]: isSelected,
            [classes.item_content_selected_shadow]: isSelected && showSelectedShadow,
        });
        const onClickData = { id: 'viewDetail', index: itemIndex, item: content };
        const li_props = {
            style: {
                height: multiline ? 'unset' : (columns[0].type === 'image' ? 64 : 48),
                paddingTop: multiline ? (columns[0].type === 'image' ? 8 : 16) : 0,
                paddingRight: !isShowAction && isArray(header && header.settings, true) ? 56 : 16,
                paddingBottom: multiline ? (columns[0].type === 'image' ? 8 : 16) : 0,
                paddingLeft: 0,
            },
            className: list_item_class,
            ref: ref => this.itemTableRef = ref,
            onMouseEnter: () => this.setState({ isHoverItem: true }),
            onMouseLeave: () => this.setState({ isHoverItem: false }),
        };
        if (!isDisableViewDetail) {
            li_props.onClick = () => {
                if (!disableClick) {
                    if (collapse) {
                        this.props.updateCurrentIndex({ collapse: itemIndex });
                        if (collapse.triggerAction && isFunction(collapse.triggerAction))
                            collapse.triggerAction({ show: itemIndex !== currentIndex.collapse, item: content, index: itemIndex });
                    } else this.props.onItemClick(onClickData);
                }
            };
        }
        const wrapperStyle = { cursor: isDisableViewDetail ? 'default' : 'pointer', width: 'calc(100% - 64px)' };
        if (itemIndex === 0 && resizeable && header && header.selectedCount) {
            wrapperStyle.padding = '4px 32px';
            wrapperStyle.position = 'relative';
        }
        return (
            <div className={classes.item_container} style={wrapperStyle}>
                <ContextMenuAction x={x} y={y} visible={currentIndex?.contextMenu == itemIndex} menuContent={menuContent} onItemClick={this.props.onItemClick} />
                {resizeable ?
                    <div {...li_props}>
                        {this._renderSubContent()}
                        {this._renderMainColumn()}
                        {this._renderLastColumn()}
                    </div>
                    :
                    <Grid container {...li_props}>
                        {this._renderSubContent()}
                        {this._renderMainColumn()}
                        {this._renderLastColumn()}
                    </Grid>
                }
            </div>
        );
    }

    _renderItemCollapse = () => {
        const { classes, itemIndex, content, currentIndex, collapse } = this.props;
        const { comp } = collapse || {};
        let node = normalizeComponent(comp, { item: content, index: itemIndex });
        return (
            <div className={classes.collapseWrapper}>
                {this._renderItem()}
                <div className={classes.collapseContainer} style={{ width: this.itemTableRef?.clientWidth || '100%' }}>
                    <Collapse timeout='auto' className={classes.collapse} in={itemIndex == currentIndex.collapse}>
                        <div className={classes.collapseContent}>
                            <Fragment>
                                {node}
                            </Fragment>
                        </div>
                    </Collapse>
                </div>
            </div>
        )
    }

    render() {
        const { collapse } = this.props;
        return !collapse ? this._renderItem() : this._renderItemCollapse();
    }
}

TableListItem.propTypes = {
    columns: PropTypes.array.isRequired, // { code: PropTypes.string, name: PropTypes.string, col: PropTypes.number, align: PropTypes.string, width: PropTypes.number, minWidth: PropTypes.number, sortable: { type: PropTypes.string /*avatar, image, html*/, isDefault: PropTypes.bool }, Comp: (className, item, index) => {}, headerComp: (className, item, index) => {}, },
    itemIndex: PropTypes.number,
    isLastItem: PropTypes.bool,
    content: PropTypes.object,
    isSelected: PropTypes.bool,
    selectable: PropTypes.bool,
    resizeable: PropTypes.bool,
    columnSizes: PropTypes.object,
    actions: PropTypes.array, // { id: String, text: String, icon: ImageNode, style: Css, disable/ hidden/ noneDisplay: [boolean,() => {}] (disable/ hidden/ noneDisplay dynamic for each action of item with custom condition), Comp: (className, item, index, action, actionIndex) => {} }, noHeader:  boolean (return null in TableHeader)
    onItemClick: PropTypes.func,
    onRenderFinish: PropTypes.func,
    multiline: PropTypes.bool, // allow row item display content as multiline;
    itemCustomComp: PropTypes.oneOfType([PropTypes.func, PropTypes.element]), // render any thing you want in each list item, but don't break any other conent of component, thanks;
    disbaleItemSelectable: PropTypes.oneOfType([PropTypes.func, PropTypes.any]), // disable dynamic for each list item with custom condition;
    disbaleItemViewDetail: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.any]), // disable viewDetail event dynamic for each list item with custom condition;
    columnDataFormat: PropTypes.oneOfType([PropTypes.object, PropTypes.any]), // custom format text data for each column;
    showSelectedShadow: PropTypes.bool, // add shadow for selected list item;
};

TableListItem.defaultProps = {
    columns: null,
    content: null,
    isSelected: false,
    onItemClick: () => { }, // { id: String, index: Number, item: Object }
    onRenderFinish: () => { },
};

export default withStyles(styles)(TableListItem);