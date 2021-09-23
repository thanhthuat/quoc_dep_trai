import React from 'react';
import PropTypes from 'prop-types';
import {
    ChasingDots,
    Circle,
    CubeGrid,
    DoubleBounce,
    FadingCircle,
    FoldingCube,
    Pulse,
    RotatingPlane,
    ThreeBounce,
    WanderingCubes,
    Wave,
} from 'better-react-spinkit';

import { colors } from '../../../assets/styles/Theme';

class Spinkit extends React.Component {

    render() {
        const { name, size, color } = this.props;
        if (!name || !available_spinkit.includes(name)) { return null; }
        const spinkit_props = { size: size || 20, color: color || colors.main };
        switch (name) {
            case 'ChasingDots':
                return <ChasingDots {...spinkit_props} />;
            case 'Circle':
                return <Circle {...spinkit_props} />;
            case 'CubeGrid':
                return <CubeGrid {...spinkit_props} />;
            case 'DoubleBounce':
                return <DoubleBounce {...spinkit_props} />;
            case 'FadingCircle':
                return <FadingCircle {...spinkit_props} />;
            case 'FoldingCube':
                return <FoldingCube {...spinkit_props} />;
            case 'Pulse':
                return <Pulse {...spinkit_props} />;
            case 'RotatingPlane':
                return <RotatingPlane {...spinkit_props} />;
            case 'ThreeBounce':
                return <ThreeBounce {...spinkit_props} />;
            case 'WanderingCubes':
                return <WanderingCubes {...spinkit_props} />;
            case 'Wave':
                return <Wave {...spinkit_props} />;
            default: return;
        }
    };

}

const available_spinkit = [
    'ChasingDots',
    'Circle',
    'CubeGrid',
    'DoubleBounce',
    'FadingCircle',
    'FoldingCube',
    'Pulse',
    'RotatingPlane',
    'ThreeBounce',
    'WanderingCubes',
    'Wave',
];

Spinkit.propTypes = {
    name: PropTypes.oneOf(available_spinkit),
    size: PropTypes.number,
    color: PropTypes.string,
};

export default Spinkit;