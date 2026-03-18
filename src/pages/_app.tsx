import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import 'react-image-gallery/styles/css/image-gallery.css';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
