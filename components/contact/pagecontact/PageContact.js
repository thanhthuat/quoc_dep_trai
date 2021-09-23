import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector } from 'react-redux';
import { replaceRoute } from '../../../utils/RouterUtils';
import { useDispatch } from 'react-redux';

// actions
import ContactActions from '../../../redux/contact/ContactRedux';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function PageContact() {
    const classify = {
        contact: 'contact'
    }
    const dispatch = useDispatch()
    const pagination = useSelector((state) => state.contact.pagination);
    console.log('pagination', pagination);
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    // contact: 1
    // has_next: true
    // has_previous: false
    // next_page: 2
    // page_size: 6
    // previous_page: 1
    // total_items: 18
    // total_pages: 3
    const handleChange = (event, value) => {
        setPage(value);
        console.log('value', value);
         dispatch(ContactActions.getContactRequest(classify.contact, { page: 3, size: 6 }));
        // replaceRoute('contact11')

    };

    return (
        <div className={classes.root}>
            <Typography>Page: {page}</Typography>
            <Pagination count={pagination.total_pages} page={pagination.contact} onChange={handleChange} />
        </div>
    );
}
