import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, CardMedia } from '@material-ui/core';
import phone from '../../../assets/icons/common/ic_phone_gray.png';
import message from '../../../assets/icons/common/ic_message_gray.png';
import phoneall from '../../../assets/icons/common/ic_phoneall_gray.png';
import zalo from '../../../assets/icons/common/ic_zalo_gray.png';

import fpt_vinaphone from '../../../assets/images/logo/vn/logo_fpt_telecom.png';
import vinaphone_cmc from '../../../assets/images/logo/vn/logo_vinaphone.png';

import leon_mobifone from '../../../assets/images/logo/vn/logo_mobifone.png';
import undefined from '../../../assets/images/logo/logo_not_found.png';
import itel from '../../../assets/images/logo/vn/logo_itel.png';

import viettel from '../../../assets/images/logo/vn/logo_viettel.png';
import gvoice from '../../../assets/images/logo/vn/logo_cgv.png';
// import fpt from '../../../assets/images/logo/vn/logo_fpt_telecom.png';
// import fpt from '../../../assets/images/logo/vn/logo_fpt_telecom.png';





// react_devtools_backend.js: 4049 sp htc



// react_devtools_backend.js: 4049 sp undefined





import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';



// styles
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from './style';

class ContactCart extends Component {
    constructor(props) {
        super(props)
        this.state = { checkedA: true, };



    }
    handleChange = () => {

        this.setState({

            checkedA: !this.state.checkedA,
        })
    }
    ChangeLogo = (img) => {
        switch (img) {
            case 'leon_viettel':
            case 'cgv_viettel':
            case 'viettel':
                return viettel
                break;

            case 'fpt_vinaphone':
            case 'fpt':
            case 'leon_mobifone':
                return fpt_vinaphone;
                break;

            case 'itel':
                return itel;
                break;
            case 'vinaphone_cmc':
            case 'vinaphone':
            case 'leon':
                return vinaphone_cmc;
                break;

            case 'cgv_mobifone':
            case 'leon_mobifone':
                return leon_mobifone;
                break;

            case 'gvoice1':
            case 'gvoice':
            case 'htc':
                return gvoice;
                break;
            default:
                return undefined
                break;
        }
    }
    render() {



        //{_id: '614ad3f06c40b87acc852d56', public_number_id: null, publicNumber: null, number: '098712137', provider: 'leon_viettel', …}
        const { provider, number, status, nation } = this.props.sp || {};
        const img = this.ChangeLogo(provider)


        const { classes } = this.props
        return (
            <div>
                <Card className={`${classes.displayfle} ${classes.root}`} >
                    <CardContent >
                        <img src={img} style={{ width: '100px' }} />
                        <Typography variant="caption" component='h6' className={classes.text}>
                            {number}
                        </Typography>
                        <Typography className={classes.diplayFlexItem} color="textSecondary" component='div' variant="caption" >
                            <img src={phone} className={classes.img} />
                            <Typography variant="caption" component='p' className={classes.text}>
                                Đã tăt
                            </Typography>
                        </Typography>
                        <Typography className={classes.diplayFlexItem} color="textSecondary" component='div' variant="caption" >
                            <img src={phoneall} className={classes.img} />
                            <Typography variant="caption" component='p' className={classes.text}>
                                Đã tăt
                            </Typography>
                        </Typography>
                        <Typography className={classes.diplayFlexItem} color="textSecondary" component='div' variant="caption" >
                            <img className={classes.img} src={message} />
                            <Typography className={classes.pos} color="textSecondary" variant="caption" className={classes.text}>
                                Đã tăt
                            </Typography>
                        </Typography>

                        <Typography className={classes.diplayFlexItem} color="textSecondary" component='div' variant="caption" >
                            <img src={zalo} className={classes.img} />
                            <Typography variant="caption" component="p" className={classes.text}>
                                Đã tăt
                            </Typography>
                        </Typography>

                    </CardContent>

                    <CardContent className={classes.flexdri} >
                        <Typography variant="caption" component="p" className={(status === 'active' && this.state.checkedA) ? classes.textActive : (status === 'inactive' && !this.state.checkedA) ? classes.textActive : classes.textInvalid}>
                            {(status === 'active' && this.state.checkedA) ? 'Active' : (status === 'inactive' && !this.state.checkedA) ? 'active' : 'Invalid'}
                        </Typography>
                        <Switch
                            checked={(status === 'active' && this.state.checkedA) ? true : (status === 'inactive' && !this.state.checkedA) ? true : false}
                            onChange={(status) => this.handleChange(status)}
                            name="checkedA"
                            color ='primary'
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            className={`${classes.text} ${classes.colorSwitch}`}
                        />
                    </CardContent>

                </Card>
            </div >
        )
    }
}
export default withStyles(useStyles)(ContactCart);