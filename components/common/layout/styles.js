// styles
import { colors } from '../../../assets/styles/Theme';

export const styles = theme => ({
    wrapper: {
        flexGrow: 1,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bgColor,
    },
});