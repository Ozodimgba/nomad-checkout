import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from 'next/font/local';

const satoshi = localFont({
  src: [
    {
      path: '../fonts/Satoshi-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    
  ],
  variable: '--font-main'
})

const sussie = localFont({
  src: [
    {
      path: '../fonts/Suisse-Intl-Mono.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-mono'
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={`${satoshi.variable} ${sussie.variable}`}><Component {...pageProps} /></main>;
}
