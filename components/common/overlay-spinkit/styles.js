export const styles = theme => ({
    spinkit_overlay: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 50000,
        top: 0,
        left: 0,
    },
    spinkit_wrapper: {
        width: 150,
        height: 150,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        position: 'absolute',
        borderRadius: 10,
        padding: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
});