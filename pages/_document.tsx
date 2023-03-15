import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="dark:bg-zinc-800 scroll-smooth">
      <Head>
        <meta name="description" content="Jamilla" />
        <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.REACT_APP_URL}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.REACT_APP_URL}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.REACT_APP_URL}/favicon-16x16.png`} />
        <link rel="manifest" href={`${process.env.REACT_APP_URL}/manifest.webmanifest`} />
        <link rel="shortcut icon" href={`${process.env.REACT_APP_URL}/favicon.ico`} />
        <meta name="msapplication-TileColor" content="#00a300" />
        <meta name="msapplication-config" content="browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
