import { Metadata, Viewport } from 'next';
import { Darker_Grotesque, Homemade_Apple, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import '@/styles/globals.css'

const sans = Darker_Grotesque({ subsets: ['latin'], variable: '--font-sans' });
const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const display = Homemade_Apple({ subsets: ['latin'], variable: '--font-display', weight: '400' });

export const metadata: Metadata = {
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'diannXart',
    },
    description: 'Art Portfolio and Gallery',
    icons: {
        apple: '/icons/apple-touch-icon.png',
        icon: [
            { sizes: '32x32', url: '/icons/favicon-32x32.png' },
            { sizes: '16x16', url: '/icons/favicon-16x16.png' },
        ],
    },
    manifest: '/manifest.json',
    openGraph: {
        description: 'Art Portfolio and Gallery',
        siteName: 'diannXart',
        title: 'diannXart',
        type: 'website',
    },
    other: {
        'mobile-web-app-capable': 'yes',
    },
    title: {
        default: 'diannXart',
        template: '%s',
    },
};

export const viewport: Viewport = {
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#FFFFFF',
    width: 'device-width',
};

export async function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'lt' }];
}

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
            </body>
        </html>
    );
}
