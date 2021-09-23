import dynamic from 'next/dynamic';
const options = { loading: () => <div></div>, ssr: true };
const Layout = import('./Layout');
export default dynamic(() => Layout, options);