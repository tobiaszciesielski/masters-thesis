import { Outlet } from '@remix-run/react';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
