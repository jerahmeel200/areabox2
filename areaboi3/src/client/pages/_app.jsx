import Head from 'next/head';
// import { Head } from "next/document";
import dynamic from 'next/dynamic';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

//import {ContractKitProvider, Alfajores} from '@celo-tools/use-contractkit'
//import "@celo-tools/use-contractkit/lib/styles.css";
import App from 'next/app';
import Layout from '../components/Layouts/Layout';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../store';

import '../../../public/static/areaboi-emoji.css';
import '../../../public/static/general.css';
import 'nprogress/nprogress.css';

import 'leaflet/dist/leaflet.css';

import '../styles/custom-theme.css';

// import "../styles/pages/todelete.css";

import '../styles/style.css';
/**
* @param {object} initialState The store's initial state (on the client side, the state of the server-side store is passed here)
* @param {boolean} options.isServer Indicates whether makeStore is executed on the server or the client side
* @param {Request} options.req Node.js `Request` object (only set before `getInitialProps` on the server side)
* @param {Response} options.res Node.js `Response` object (only set before `getInitialProps` on the server side)
* @param {boolean} options.debug User-defined debug flag
* @param {string} options.storeKey The key that will be used to persist the store in the browser's `window` object for safe HMR
//https://github.com/kirill-konshin/next-redux-wrapper
*/

class NextFirebaseRedux extends App {
  static async getInitialProps({ Component, ctx }) {
    // We can dispatch from here too
    //ctx.store.dispatch({type: 'FOO', payload: 'foo'});

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    const TopProgressBar = dynamic(
      () => {
        return import('../components/TopProgressBar');
      },
      { ssr: false }
    );
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="../static/img/areaboi_logo_white.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Areaboi" />
          {/* <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
            integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
            crossOrigin="anonymous"
          />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" /> */}
        </Head>
        <TopProgressBar />
        <Provider store={store}>
          {/* <Layout> */}
          <Component {...pageProps} />
          {/* </Layout> */}
        </Provider>
      </div>
    );
  }
}

export default withRedux(makeStore, { debug: false })(NextFirebaseRedux);
{
  /* <ContractKitProvider dapp={{
          name:'areabox',
          description:'',
          url:'areabox.tv',
          
          }}
          network={[Alfajores]} ></ContractKitProvider> */
}
