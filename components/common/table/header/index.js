import dynamic from 'next/dynamic';
const TableHeader = dynamic(() => import('./TableHeader'), { loading: () => <div></div>, ssr: true });
export default TableHeader;