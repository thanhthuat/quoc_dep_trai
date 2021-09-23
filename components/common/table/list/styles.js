import { textColors } from '../../../../assets/styles/Theme';

export const styles = theme => ({
    wrapper: {
        padding: 0,
        display: 'block',
        position: 'relative',
    },
    container: {
        flex: 1,
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        padding: '68px 0px 8px',
    },
    progress_view: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progress: {
        color: textColors.info,
    },
    skeletonRow: {
        width: 'calc(100% - 64px)',
        margin: '4px 32px',
    },
    paginationContainer: {
        width: '100%',
        // height: '41px',
        padding: '8px 0 8px',
        display: 'flex',
        alignItems: 'center'
    }
});