import Head from 'next/head';
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}
export default App
