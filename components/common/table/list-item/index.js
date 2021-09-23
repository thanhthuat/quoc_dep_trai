import dynamic from 'next/dynamic';
const TableListItem = dynamic(() => import('./TableListItem'), { loading: () => <div></div>, ssr: true });
export default TableListItem;