import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta content="default" name="apple-mobile-web-app-status-bar-style" />
                <meta content="yes" name="mobile-web-app-capable" />
                <meta content="#FFFFFF" name="theme-color" />
                <link href="/icons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
                <link href="/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
                <link href="/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
                <link href="/manifest.json" rel="manifest" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Darker+Grotesque&family=Homemade+Apple&family=Playfair+Display&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
