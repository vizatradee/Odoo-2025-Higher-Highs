// pages/_app.jsx
import '../styles/globals.css';
import Header from '../components/Header';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Skill Swap Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;