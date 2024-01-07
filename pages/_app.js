import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Wait until window is available to import Bootstrap JS
    import('bootstrap/dist/js/bootstrap');
  }, []);
  return <Component {...pageProps} />
}


