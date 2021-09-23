import React from 'react';
import classNames from 'classnames';

// utils
import { isArray, } from '../../../../utils/Utils';

// styles
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

// components
import { ImageViewer, Tooltip } from '../../index';

const ContextMenuAction = (props) => {
    const { classes, x, y, visible, menuContent } = props;
    let { actions, options } = menuContent || {};
    if (!visible || (!isArray(actions, true) && !isArray(options, true))) return null;

    var contextStyle = {
        position: 'fixed',
        top: `${y}px`,
        left: `${x + 5}px`
    }

    return (
        <div className={classes.menuContainer} style={contextStyle} >
            <div className={classes.actionContainer}>
                {isArray(actions, true) && actions.map(actionItem => {
                    if (!actionItem) return;
                    const { id, icon, tooltip, isDisable, style, onClick, text } = actionItem;
                    let cellNode = (
                        <div key={id} className={classes.buttonOuter} onClick={() => onClick()}>
                            {icon
                                ? <ImageViewer src={icon} disable={isDisable} style={style} clickable />
                                : <span className={classNames(classes.ia_text, { [classes.disable]: isDisable })} style={style}>
                                    {text || '...'}
                                </span>
                            }
                        </div>
                    )
                    if (tooltip && tooltip.title) { return (<Tooltip key={id} {...tooltip}>{cellNode}</Tooltip>); }
                    else return cellNode;
                })}
            </div >
            <div className={classes.optionsContainer}>
                {isArray(options, true) && options.map(menuItem => {
                    const { id, text, onClick } = menuItem || {};
                    if (!menuItem) return;
                    let cellNode = (
                        <div key={id} className={classes.menuItem} onClick={() => onClick()}>
                            <span> {text || '...'} </span>
                        </div>
                    )
                    return cellNode;
                })}
            </div >
        </div>
    )
}

export default withStyles(styles)(ContextMenuAction);