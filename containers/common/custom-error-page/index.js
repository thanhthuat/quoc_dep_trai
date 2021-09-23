import dynamic from 'next/dynamic';
const options = { loading: () => <div></div>, ssr: true };
const CustomErrorPage = import('./CustomErrorPage');
export default dynamic(() => CustomErrorPage, options);