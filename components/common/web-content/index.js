import dynamic from 'next/dynamic';
const WebContent = dynamic(() => import('./WebContent'), { loading: () => <div></div>, ssr: true });
export default WebContent;