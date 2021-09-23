import dynamic from 'next/dynamic';
const options = { loading: () => <div></div>, ssr: true };
const NoPermissionContainer = import('./NoPermissionContainer');
export default dynamic(() => NoPermissionContainer, options);