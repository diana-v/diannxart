import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import { Darker_Grotesque, Homemade_Apple, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';

import '@/styles/globals.css'
import { ReactNode } from 'react';

const sans = Darker_Grotesque({ subsets: ['latin'], variable: '--font-sans' });
const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const display = Homemade_Apple({ subsets: ['latin'], variable: '--font-display', weight: '400' });

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

export async function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'lt' }];
}

export const dynamicParams = false;

export default async function RootLayout({ children, params }: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const supportedLocales = ['en', 'lt'];

    if (!supportedLocales.includes(locale)) {
        notFound();
    }

    return (
        <html
            className={`${sans.variable} ${serif.variable} ${display.variable}`}
            lang={locale}
        >
            <body className="antialiased min-h-screen">
                {children}
                <Analytics />
            </body>
        </html>
    );
}
