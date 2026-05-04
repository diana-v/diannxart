import { Metadata } from 'next';

export const metadata: Metadata = {
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
    },

    icons: {
        apple: '/icons/apple-touch-icon.png',
        icon: [
            '/icons/favicon-32x32.png',
            '/icons/favicon-16x16.png',
        ],
        shortcut: '/favicon.ico',
    },

    manifest: '/manifest.json',

    openGraph: {
        images: [
            {
                url: '/icons/icon-512x512.png',
            },
        ],
        siteName: 'DiannXArt',
        title: 'DiannXArt',
        type: 'website',
        url: 'https://diann.lt',
    },

    other: {
        'mobile-web-app-capable': 'yes',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang="lt">
            <body>{children}</body>
        </html>
    );
}
