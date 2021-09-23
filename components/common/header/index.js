import dynamic from 'next/dynamic';
const Header = dynamic(() => import('./Header'), { loading: () => <div></div>, ssr: true });
export default Header;