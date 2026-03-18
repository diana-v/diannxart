import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { languages, LocaleType } from '@/translations/common';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const lang = locale as LocaleType;
    const localisedString = languages[lang];

    return {
        description: localisedString.home.seoDescription,
        openGraph: {
            description: localisedString.home.seoDescription,
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
        title: 'diannXart',
    };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    redirect(`/${locale}/work`);
}
