
import dynamic from 'next/dynamic';
const RootContainer = import('./RootContainer');
const options = { loading: () => <div></div>, ssr: true };
export default dynamic(() => RootContainer, options);