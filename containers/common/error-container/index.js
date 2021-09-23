import dynamic from 'next/dynamic';
const options = { loading: () => <div></div>, ssr: true };
const ErrorContainer = import('./ErrorContainer');
export default dynamic(() => ErrorContainer, options);