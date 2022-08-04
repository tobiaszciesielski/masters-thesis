import React, { useEffect } from 'react';
import Footer from './Footer';
import Nav from './Nav';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    console.log('rendered');
  });
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
