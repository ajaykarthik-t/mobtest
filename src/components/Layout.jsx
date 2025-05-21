import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;