import { sagasMappingEffects } from '../../../utils/CoreUtils';

import { Types } from '../../../redux/user/RoleRedux';
import * as Sagas from './RoleSagas';

const keys = [
    ['getRoles']
];

/* ------------- Connect Types To Sagas ------------- */

export default sagasMappingEffects(keys, Types, Sagas);