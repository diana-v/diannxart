import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { languages, LocaleType } from '@/translations/common';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const lang = locale as LocaleType;

    if (!languages[locale as LocaleType]) {
        notFound();
    }

    const localisedString = languages[locale as LocaleType];

    return (
        <DefaultLayout locale={lang}>
            <div className="container flex flex-col mx-auto px-4 py-3 gap-8 grow max-w-5xl">
                <h1 className="uppercase text-5xl md:text-7xl font-serif font-thin text-center transition-[font-size] ease-in duration-500">
                    {localisedString.about.title}
                </h1>
                <article className="flex flex-col gap-4 text-xl md:text-2xl">
                    <p>{localisedString.about.description.first}</p>
                    <p>{localisedString.about.description.second}</p>
                </article>
            </div>
        </DefaultLayout>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const localisedString = languages[locale as LocaleType];

    return {
        description: localisedString?.about?.seoDescription,
        openGraph: {
            description: localisedString?.about?.seoDescription,
            images: ['https://www.diann.lt/icons/icon-512x512.png'],
            siteName: 'Diann',
            title: localisedString?.about?.seoTitle,
            type: 'article',
            url: `https://www.diann.lt/${locale}/about`,
        },
        title: localisedString?.about?.seoTitle,
        twitter: {
            card: 'summary_large_image',
            description: localisedString?.about?.seoDescription,
            images: ['https://www.diann.lt/icons/icon-512x512.png'],
            title: localisedString?.about?.seoTitle,
        },
    };
}

