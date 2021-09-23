// styles
import { colors, boxShadows } from '../../../assets/styles/Theme';

export const styles = theme => ({
    wrapper: {
        backgroundColor: colors.main,
        boxShadow: boxShadows.main,
        WebkitBoxShadow: boxShadows.main,
        MozBoxShadow: boxShadows.main,
    },
    headerBox: {
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
