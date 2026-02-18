import Head from 'next/head';
import { useRouter } from 'next/router';

import { languages, LocaleType } from '@/translations/common';

export default function Home() {
    const { locale, defaultLocale } = useRouter();
    const localisedString = languages[(locale ?? defaultLocale) as LocaleType];

    return (
        <Head>
            <title>diannXart</title>
            <meta property="og:title" content="diannXart" key="title" />
            <meta name="description" content={localisedString.home.seoDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content="DiannXArt" />
            <meta property="og:site_name" content="DiannXArt" />
            <meta property="og:url" content="diann.lt" />
            <meta property="og:description" content={localisedString.home.seoDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/icons/icon-512x512.png" />
        </Head>
    );
}
