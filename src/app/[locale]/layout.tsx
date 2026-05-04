import { Darker_Grotesque, Homemade_Apple, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import '@/styles/globals.css'

const sans = Darker_Grotesque({ subsets: ['latin'], variable: '--font-sans' });
const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const display = Homemade_Apple({ subsets: ['latin'], variable: '--font-display', weight: '400' });

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
            </body>
        </html>
    );
}
