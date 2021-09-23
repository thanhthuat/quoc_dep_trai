import dynamic from 'next/dynamic';
const TableList = dynamic(() => import('./TableList'), { loading: () => <div></div>, ssr: true });
export default TableList;