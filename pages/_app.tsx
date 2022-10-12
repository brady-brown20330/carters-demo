import '../styles/globals.css'
import "@contentstack/live-preview-utils/dist/main.css";

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
