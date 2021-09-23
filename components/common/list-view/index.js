import dynamic from 'next/dynamic';
const ListView = dynamic(() => import('./ListView'), { loading: () => <div></div>, ssr: true });
export default ListView;