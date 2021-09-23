import dynamic from 'next/dynamic';
const options = { loading: () => <div></div>, ssr: true };
const PageBackdrop = import('./PageBackdrop');
export default dynamic(() => PageBackdrop, options);