import dynamic from 'next/dynamic';
const options = { loading: () => <div></div>, ssr: true };
const Tooltip = import('./Tooltip');
export default dynamic(() => Tooltip, options);