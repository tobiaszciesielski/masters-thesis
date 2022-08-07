import { Outlet } from '@remix-run/react';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
