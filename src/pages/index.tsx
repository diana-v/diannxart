import Head from 'next/head';
import { useRouter } from 'next/router';

import { languages, LocaleType } from '@/translations/common';

export default function Home() {
    const { defaultLocale, locale } = useRouter();
    const localisedString = languages[(locale ?? defaultLocale) as LocaleType];

    return (
        <Head>
            <title>diannXart</title>
            <meta content="diannXart" key="title" property="og:title" />
            <meta content={localisedString.home.seoDescription} name="description" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <meta content="DiannXArt" property="og:title" />
            <meta content="DiannXArt" property="og:site_name" />
            <meta content="diann.lt" property="og:url" />
            <meta content={localisedString.home.seoDescription} property="og:description" />
            <meta content="website" property="og:type" />
            <meta content="/icons/icon-512x512.png" property="og:image" />
        </Head>
    );
}
