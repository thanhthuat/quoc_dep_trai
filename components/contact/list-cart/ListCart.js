import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import ContactCart from '../contact-cart/ContactCart';
import Layout from '../../common/layout/Layout';
import Container from '@material-ui/core/Container';
// actions
import ContactActions from '../../../redux/contact/ContactRedux';

//coponent 
import Spinkit from '../../common/spinkit';

import PageContact from '../pagecontact';

class ListCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classify: {

                contact: 'contact'
            },
        };
    }
    componentDidMount() {
        const { classify } = this.state;
        this.props.getContact(classify.contact, { page: 1, size: 6 })
        const arrs = [['classify', 'params']];
        //console.log(Object.fromEntries(arrs));

    }
    render() {

        const { contact } = this.props.contactFetching;
        const data = this.props.contactContent.contact || [];
        console.log('data', data);

        return (
            <>
                {contact ? <Spinkit name='FadingCircle' /> :
                    <Layout>

                        <Container fixed>
                            <Grid container spacing={2}>
                                {data.map((sp, index) => {
                                    return (<Grid item xs={12} lg={4} md={6} key={sp._id}>
                                        <ContactCart sp={sp} />
                                    </Grid>)
                                })}
                            </Grid>
                        </Container>
                        <PageContact />
                    </Layout>}


            </>

        )
    }


}

const mapStateToProps = state => {
    const { accessToken } = state.session;
    return {

        // Contact 
        contactFetching: state.contact.fetching,
        contactContent: state.contact.content,
    };
}

const mapDispatchToProps = dispatch => ({

    //contact 
    getContact: (classify, params) => dispatch(ContactActions.getContactRequest(classify, params)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ListCart);