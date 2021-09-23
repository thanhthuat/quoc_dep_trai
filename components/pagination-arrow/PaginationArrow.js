import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

// styles
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

// @material-ui/core
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// utils
import { genUuid, isUndefined } from '../../utils/Utils';
import { i18nText } from '../../utils/StringUtils';

// components
import { CustomSelect, ImageViewer, DialogCommon, TextInput } from '../common';

import iconDown from '../../assets/icons/common/ic_triangle_down_g.png';
import { showNotify } from '../../utils/WebUtils';

const optionMap = {
    table: { '10': 0, '15': 1, '30': 2, '50': 3 },
    default: { '5': 0, '10': 1, '25': 2 },
}

class PaginationArrow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            pageNumber: 1,
            pageSize: props.forTableList ? 15 : 10,
            dialogCommon: false,
            currentLength: props.forTableList ? 15 : 10,
            numberItemOpts:
                props.forTableList
                    ? [
                        { id: 0, label: '10 ' + i18nText('line_per_page'), value: 10 },
                        { id: 1, label: '15 ' + i18nText('line_per_page'), value: 15 },
                        { id: 2, label: '30 ' + i18nText('line_per_page'), value: 30 },
                        { id: 3, label: '50 ' + i18nText('line_per_page'), value: 50 },]
                    : [{ id: 0, label: '5 ' + i18nText('line_per_page'), value: 5 }, { id: 1, label: '10 ' + i18nText('line_per_page'), value: 10 }, { id: 2, label: '25 ' + i18nText('line_per_page'), value: 25 },]
        };
        this._handleGoToPage = debounce(this.handleGoToPage, 600);
    }

    componentDidMount() {
        const { pagination } = this.props;
        const { numberItemOpts } = this.state;
        const { page_size } = pagination || {};
        const index = numberItemOpts.findIndex(item => item.value === page_size);
        this.setState({
            ...(page_size > 0 && { pageSize: page_size }),
            index: index !== -1 ? index : 0
        });
        document.addEventListener('keydown', this.keyArrowHandler);
    };

    componentDidUpdate(prevProp) {
        const { fetching, currentItem, pagination, forTableList } = this.props;
        const { pageNumber, currentLength, pressing, pageSize } = this.state;
        const { page_number, page_size } = pagination || {};
        if ((prevProp.fetching && !fetching) || (!pressing && ((pagination && pageNumber !== page_number) || (currentLength !== currentItem)))) {
            let option = optionMap[forTableList ? 'table' : 'default'];
            this.setState({
                currentLength: currentItem,
                index: option[page_size] || 0,
                pageNumber: page_number,
                // pageSize: page_size,
                ...(page_size > 0 && { pageSize: page_size }),
                pressing: false,
            });
        }
        document.removeEventListener('keydown', this.keyArrowHandler);
        document.addEventListener('keydown', this.keyArrowHandler);
    };

    componentWillUnmount() { document.removeEventListener('keydown', this.keyArrowHandler); };

    keyArrowHandler = e => {
        var activeEl = document.activeElement.tagName;
        if (('INPUT' !== activeEl) && (e.keyCode == 37 || e.keyCode == 39)) {
            this.handleKeyEvent(e.keyCode);
            e.preventDefault();
        }
    };

    handleKeyEvent = (key, e) => {
        const { pagination } = this.props;
        const { pageNumber, pressing } = this.state;
        const { total_pages } = pagination;
        if (key == 37 && ((pageNumber - 1) >= 1)) {
            if (!pressing) this.setState({ pressing: true }, () => { this.handleOnclick(pageNumber - 1) })
            else this.handleOnclick(pageNumber - 1);
        }
        if (key == 39 && ((pageNumber + 1) <= total_pages)) {
            if (!pressing) this.setState({ pressing: true }, () => { this.handleOnclick(pageNumber + 1) })
            else this.handleOnclick(pageNumber + 1);
        }
    };

    handleGoToPage(params) {
        this.props.handleGoToPage(params);
        this.props.fectchingData(false);
    };

    handleChangeText = e => {
        const input = e.target;
        this.setState({ [input.id]: input.value.trim() });
    };

    handleChangeNumberItem(selected) {
        this.setState({ index: selected.id, pageNumber: 1, pageSize: selected.value, currentLength: selected.value, pressing: true });
        this.props.handleGoToPage({ page: 1, size: selected.value });
    };

    handleOnclick(number) {
        const { page_size, total_pages } = this.props.pagination || {};
        const { pageNumber } = this.state;
        if (isUndefined(number)) return;
        if (this.state.dialogCommon) {
            if (total_pages && number && (Number(number) < 1 || total_pages < Number(number))) {
                showNotify(i18nText('error.invalidPageNumber'), { type: 'error' }); return;
            } else this.setState({ dialogCommon: false, pageNumberInput: '' });
        }
        if (pageNumber !== Number(number)) {
            this.setState({ pressing: true, pageNumber: Number(number) });
            this.props.fectchingData(true);
            this._handleGoToPage({ page: Number(number), size: page_size });
        }
    };

    renderPageButton = (value) => {
        const { classes } = this.props;
        const { pageNumber } = this.state;
        if (!value) return;
        if (value === '...') {
            return (<Typography key={`${genUuid()}`} className={classes.buttonBase} onClick={() => this.setState({ dialogCommon: true })}>...</Typography>);
        }
        const pageNumberClasses = classNames(classes.buttonBase, { [classes.currentPage]: value == pageNumber });
        return (<Typography key={value} className={pageNumberClasses} onClick={() => this.handleOnclick(value)}>{value}</Typography>);
    };

    _renderNumberPage() {
        const { pagination, rangeDisplay } = this.props;
        const { pageNumber: page_number } = this.state;
        const { total_pages } = pagination;
        var indents = [];
        let rangeDisplayChiaHigh = (rangeDisplay % 2 == 0) ? rangeDisplay / 2 : (rangeDisplay - 1) / 2;
        if (total_pages <= rangeDisplay) {
            if (total_pages == 0) indents.push(this.renderPageButton(1));
            else { for (let i = 1; i <= total_pages; i++) { indents.push(this.renderPageButton(i)); } }
        } else {
            if (page_number < rangeDisplay) {
                for (let i = 1; i <= rangeDisplay; i++) { indents.push(this.renderPageButton(i)); }
                if (rangeDisplay + 1 < total_pages) { indents.push(this.renderPageButton('...')) }
                indents.push(this.renderPageButton(total_pages))
            } else {
                if (page_number > total_pages - rangeDisplay + 1) {
                    indents.push(this.renderPageButton(1))
                    if (total_pages - rangeDisplay > 1) indents.push(this.renderPageButton('...'))
                    let begin = (page_number == total_pages - rangeDisplay + 1) ? page_number - rangeDisplayChiaHigh : total_pages - rangeDisplay + 1;
                    for (let i = begin; i <= total_pages; i++) { indents.push(this.renderPageButton(i)); }
                } else {
                    indents.push(this.renderPageButton(1))
                    if ((page_number - rangeDisplayChiaHigh - 1) > 1) indents.push(this.renderPageButton('...'))
                    for (let i = (page_number - rangeDisplayChiaHigh); i <= (page_number + rangeDisplayChiaHigh); i++) { indents.push(this.renderPageButton(i)); }
                    if (page_number + rangeDisplayChiaHigh + 1 < total_pages) indents.push(this.renderPageButton('...'))
                    indents.push(this.renderPageButton(total_pages))
                }
            }
        }
        return indents;
    };

    _renderDialogCommon = () => {
        const { dialogCommon, pageNumberInput } = this.state;
        if (!dialogCommon) return;
        const Comp = (
            <div>
                <TextInput isNumber autoFocus
                    id={'pageNumberInput'}
                    placeholder={i18nText('placeholder.inputPage')}
                    onChange={this.handleChangeText}
                    value={pageNumberInput || ''}
                />
            </div>
        )
        return (
            <DialogCommon
                cancelable Comp={Comp} maxWidth={'xs'}
                title={i18nText('go_to')}
                onClose={() => this.setState({ dialogCommon: false, pageNumberInput: '' })}
                onAccept={() => this.handleOnclick(pageNumberInput)}
            />
        )
    };

    getStatus = () => {
        const { pagination, unit, fetching } = this.props;
        const { currentLength, pageNumber, pageSize, pressing } = this.state;
        const { total_items } = pagination;
        let text = '';
        switch (true) {
            case total_items > 0: {
                let from = (pageNumber - 1) * pageSize + 1;
                let to = (pageNumber - 1) * pageSize + ((pressing || fetching) ? pageSize : currentLength);
                if (currentLength == 0 || pageSize == 0) return '';
                text = `${from} - ${to} ${i18nText('p_of')} ${total_items} ${unit || i18nText('unit.record')}`;
            } break;
            case '': break;
            default: { text = `0 - 0 ${i18nText('p_of')} 0 ${unit || i18nText('unit.record')}` } break;
        }
        return text;
    };

    render() {
        const { classes, pagination, forTableList } = this.props;
        const { index, numberItemOpts } = this.state;
        const { has_next, has_previous, next_page, previous_page } = pagination;
        const prevFunc = () => has_previous ? this.handleOnclick(previous_page) : {};
        const nextFunc = () => has_next ? this.handleOnclick(next_page) : {};
        return (
            <Grid item container className={classes.pagination_container}>
                <Grid className={classes.info_container}>
                    <CustomSelect slim
                        isSearchable={false}
                        onChange={(selected) => this.handleChangeNumberItem(selected)}
                        options={numberItemOpts}
                        name={'select_number_item'}
                        value={numberItemOpts[index] || ''}
                        noneBackground={true}
                        indicatorStyle={{ marginLeft: 0 }}

                    />
                    <Typography className={classes.text_normal}> {this.getStatus()} </Typography>
                </Grid>
                <Grid className={classes.current_page_container} style={{ ...(forTableList && { padding: '0 64px 0 24px' }) }}>
                    <div className={classes.buttonBase} onClick={prevFunc}>
                        <ImageViewer src={iconDown} className={classes.arrow_back} size={11} style={{ padding: 5 }} clickable={has_previous} />
                    </div>
                    {this._renderNumberPage()}
                    <div className={classes.buttonBase} onClick={nextFunc}>
                        <ImageViewer src={iconDown} className={classes.arrow_next} size={11} style={{ padding: 5 }} clickable={has_next} />
                    </div>
                </Grid>
                {this._renderDialogCommon()}
            </Grid >
        )
    };

}


PaginationArrow.propTypes = {
    forTableList: PropTypes.bool,
};

PaginationArrow.defaultProps = {
    pagination: {
        has_next: false,
        has_previous: false,
        next_page: 0,
        page_number: 1,
        page_size: 10,
        previous_page: 0,
        total_items: 0,
        total_pages: 1,
    },
    rangeDisplay: 3,
    currentItem: 0,
    handleGoToPage: () => { },
    fectchingData: () => { }, //fake loading status
};

export default withStyles(styles)(PaginationArrow);