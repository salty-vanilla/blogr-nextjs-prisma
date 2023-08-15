/* eslint-disable react/jsx-props-no-spreading */
import { SessionProvider } from 'next-auth/react';
import { AppProps } from "next/app";
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Loader from 'components/Loader';
import Layout from 'components/Layout';

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => setLoading(true);
    const complete = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", complete);
    Router.events.on("routeChangeError", complete);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', complete);
      Router.events.off('routeChangeError', complete);
    };
  }, []);
  return (
    <SessionProvider session={pageProps.session}>
      {
        loading ? (
          <Layout>
            <Loader />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
    </SessionProvider>
  );
}

export default App;
