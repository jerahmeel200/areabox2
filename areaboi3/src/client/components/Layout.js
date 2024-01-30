import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default ({ children }) => (
  <div className="app-container">
    <Header />
    <section>{children}</section>
    <Footer />

    <style jsx global>
      {``}
    </style>
  </div>
);

/* To Use the Layout component
import Layout from './components/Layout.js'

const Component = () => {
  <Layout>
    <p>Page content</p>
  </Layout>
}

If used with getInitialProps//
Component.getInitialProps = (req.query) => {
  //...
}

export default Component

*/
