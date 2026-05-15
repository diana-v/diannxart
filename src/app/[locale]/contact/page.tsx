import { Metadata } from 'next';

import { ContactForm } from '@/forms/Contact/ContactForm';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { getUnsoldPosts } from '@/schemas/getUnsoldPosts';
import { languages, LocaleType } from '@/translations/common';

export default async function ContactPage({ params, searchParams }: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ title?: string }>;
}) {
    const { locale } = await params;
    const { title } = await searchParams;
    const lang = locale as LocaleType;
    const localisedString = languages[lang];

    const posts = await getUnsoldPosts(lang)

    return (
        <DefaultLayout locale={lang}>
            <div className="container flex flex-col mx-auto px-4 py-3 gap-8 grow max-w-5xl">
                <h1 className='uppercase text-5xl md:text-7xl font-serif font-thin text-center transition-[font-size] ease-in duration-500'>
                    {localisedString.contact.title}
                </h1>

                <ContactForm
                    initialSubject={title || 'General query'}
                    localisedString={localisedString}
                    posts={posts}
                />
            </div>
        </DefaultLayout>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const localisedString = languages[locale as LocaleType];

    return {
        description: localisedString?.contact?.seoDescription,
        openGraph: {
            description: localisedString?.contact?.seoDescription,
            images: ['https://www.diann.lt/icons/icon-512x512.png'],
            siteName: 'Diann',
            title: localisedString?.contact?.seoTitle,
            type: 'article',
            url: `https://www.diann.lt/${locale}/contact`,
        },
        title: localisedString?.contact?.seoTitle,
        twitter: {
            card: 'summary_large_image',
            description: localisedString?.contact?.seoDescription,
            images: ['https://www.diann.lt/icons/icon-512x512.png'],
            title: localisedString?.contact?.seoTitle,
        },
    };
}
