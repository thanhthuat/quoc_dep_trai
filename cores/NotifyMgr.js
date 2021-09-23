/*****************************
 * @providesModule NotifyMgr *
 * @created_by Kds           *
 *****************************/

import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { Set } from 'immutable';
import { css } from 'glamor';

import { isBoolean } from '../utils/Utils';
import { getTextLineStyle } from '../utils/StyleUtils';

import { textColors, fontSizes, fontFamilys } from '../assets/styles/Theme';

import { ImageViewer } from '../components/common';

const closeIcons = {
    gray: require('../assets/icons/common/ic_delete_gray.png'),
    white: require('../assets/icons/common/ic_delete_white.png'),
};

const CloseButton = ({ color, closeToast }) => (<ImageViewer src={closeIcons[color]} style={{ marginLeft: 16 }} onClick={closeToast} />);
const notifyColors = { success: '#4ca750', error: '#e94440', warn: '#ffa850', info: '#267aff' };

export default class NotifyMgr {

    static instance = null;
    static createInstance() { const object = new NotifyMgr(); return object; }
    static getInstance() {
        if (!NotifyMgr.instance) { NotifyMgr.instance = NotifyMgr.createInstance(); }
        return NotifyMgr.instance;
    }

    static notifies = Set();

    static getNotifyType(options) {
        return options && options.type && ['success', 'error', 'warn', 'info'].includes(options.type) ? options.type : '';
    }

    showNotify(content, options) {
        const notify = { content, options }
        // remove these comment line, if you want to show only 1 notify when push multi notify have same content at the same time;
        // const notifyId = JSON.stringify({ content, type: this.getNotifyType(options) });
        // if (this.notifies.has(notifyId)) { return; }
        // this.notifies = this.notifies.add(notifyId);
        this.showToast(notify);
    }

    static unregisterNotify(notify) {
        this.notifies = this.notifies.delete(JSON.stringify(notify));
    }

    static showToast(notify) {
        if (notify) {
            const { content, options } = notify;
            if (content) {
                const notifyType = this.getNotifyType(options);
                const containerStyle = { borderRadius: '6px !important', padding: '8px 16px 8px 24px !important', minHeight: '48px !important', width: 320, alignItems: 'center', margin: '16px 0 0' };
                const bodyStyle = { ...getTextLineStyle(5), fontSize: fontSizes.primary, fontFamily: fontFamilys.primary, color: textColors.primary };
                const progressStyle = { marginBottom: 5, height: '2px !important', opacity: '0.69 !important' };
                if (notifyType) {
                    containerStyle.backgroundColor = `${notifyColors[notifyType]} !important`;
                    bodyStyle.color = '#ffffff !important';
                    progressStyle.backgroundColor = '#ffffff !important';
                }
                const toastOptions = {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    newestOnTop: true,
                    closeButton: <CloseButton color={notifyType ? 'white' : 'gray'} />,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnFocusLoss: true,
                    draggable: true,
                    // onClose: () => this.unregisterNotify({ content, type: notifyType }),
                    className: css(containerStyle),
                    bodyClassName: css(bodyStyle),
                    progressClassName: css(progressStyle),
                }
                if (options) {
                    const { autoClose, transition, position, hideProgressBar, pauseOnHover,
                        pauseOnFocusLoss, rtl, closeOnClick, newestOnTop, draggable, draggablePercent } = options;
                    toastOptions.autoClose = autoClose ? autoClose * 1000 : 3000;
                    toastOptions.hideProgressBar = hideProgressBar || false;
                    toastOptions.pauseOnHover = isBoolean(pauseOnHover) ? pauseOnHover : true;
                    toastOptions.pauseOnFocusLoss = isBoolean(pauseOnFocusLoss) ? pauseOnFocusLoss : true;
                    toastOptions.rtl = rtl || false;
                    toastOptions.closeOnClick = closeOnClick || false;
                    toastOptions.newestOnTop = isBoolean(newestOnTop) ? newestOnTop : true;
                    toastOptions.draggable = isBoolean(draggable) ? draggable : true;
                    toastOptions.draggablePercent = draggablePercent || 80;
                    if (transition) {
                        switch (transition) {
                            case 'slide': toastOptions.transition = Slide; break;
                            case 'zoom': toastOptions.transition = Zoom; break;
                            case 'flip': toastOptions.transition = Flip; break;
                            case 'bounce': toastOptions.transition = Bounce; break;
                            default: break;
                        }
                    }
                    switch (position) {
                        case 'tl': toastOptions.position = toast.POSITION.TOP_LEFT; break;
                        case 'tc': toastOptions.position = toast.POSITION.TOP_CENTER; break;
                        case 'tr': toastOptions.position = toast.POSITION.TOP_RIGHT; break;
                        case 'bl': toastOptions.position = toast.POSITION.BOTTOM_LEFT; break;
                        case 'bc': toastOptions.position = toast.POSITION.BOTTOM_CENTER; break;
                        case 'br': toastOptions.position = toast.POSITION.BOTTOM_RIGHT; break;
                        default: break;
                    }
                }
                switch (notifyType) {
                    case 'success': toast.success(content, toastOptions); break;
                    case 'error': toast.error(content, toastOptions); break;
                    case 'warn': toast.warn(content, toastOptions); break;
                    case 'info': toast.info(content, toastOptions); break;
                    default: toast(content, toastOptions); break;
                }
            }
        }
    }

}