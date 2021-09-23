import { sagasMappingEffects } from '../../utils/CoreUtils';

import { Types } from '../../redux/contact/ContactRedux';
import * as Sagas from './ContactSaga';

const keys = [
    ['getContact']
];

/* ------------- Connect Types To Sagas ------------- */

const ContactSaga = sagasMappingEffects(keys, Types, Sagas);

export default [
    ...ContactSaga,

];