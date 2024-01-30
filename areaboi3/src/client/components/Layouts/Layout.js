import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';

function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="app-container">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
