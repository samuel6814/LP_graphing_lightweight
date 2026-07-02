import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Main = styled.main`
  flex: 1;
  padding-top: calc(88px + env(safe-area-inset-top, 0));
`;

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}
