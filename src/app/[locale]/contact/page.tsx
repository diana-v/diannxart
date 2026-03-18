import { Metadata } from 'next';
import { createClient } from 'next-sanity';

import { ContactForm } from '@/forms/Contact/ContactForm';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { languages, LocaleType } from '@/translations/common';

const client = createClient({
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    dataset: process.env.SANITY_STUDIO_DATASET,
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    useCdn: false,
});

export default async function ContactPage({ params, searchParams }: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ title?: string }>;
}) {
    const { locale } = await params;
    const { title } = await searchParams;
    const lang = locale as LocaleType;
    const localisedString = languages[lang];

    const posts = await client.fetch(
        `*[_type == 'post' && sold != true]{
          "title": coalesce(title[$locale], title[$defaultLocale])
        }[].title`,
        { defaultLocale: 'lt', locale: lang }
    );

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
        description: localisedString.contact.seoDescription,
        title: localisedString.contact.seoTitle,
    };
}
