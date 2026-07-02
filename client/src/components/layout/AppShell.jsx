import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ToolsDock from '../../components/tools/ToolsDock';

const Main = styled.main`
  flex: 1;
  padding-top: calc(88px + env(safe-area-inset-top, 0));
  padding-bottom: ${({ theme }) => theme.spacing.xl};
`;

export default function AppShell() {
  return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
      <ToolsDock />
    </>
  );
}
