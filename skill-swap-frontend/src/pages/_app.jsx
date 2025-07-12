// pages/_app.jsx
import '../styles/globals.css';
import Header from '../components/Header';
import Head from 'next/head';
import { Inter } from 'next/font/google'; // Import the font

const inter = Inter({ subsets: ['latin'] }); // Initialize the font

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Skill Swap Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* Apply font class to the body or a top-level div */}
      <div className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;