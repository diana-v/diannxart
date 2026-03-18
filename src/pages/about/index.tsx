import { useRouter } from 'next/router';
import * as React from 'react';

import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { languages, LocaleType } from '@/translations/common';

const About = () => {
    const { defaultLocale, locale } = useRouter();
    const localisedString = languages[(locale ?? defaultLocale) as LocaleType];

    return (
        <DefaultLayout description={localisedString.about.seoDescription} title={localisedString.about.seoTitle}>
            <div className="container flex flex-col mx-auto px-4 py-3 gap-8 flex-grow max-w-5xl">
                <h1 className="uppercase text-5xl md:text-7xl font-serif font-thin text-center transition-[font-size] ease-in duration-500">{localisedString.about.title}</h1>
                <article className="flex flex-col gap-4 text-xl md:text-2xl">
                    <p>{localisedString.about.description.first}</p>
                    <p>{localisedString.about.description.second}</p>
                </article>
            </div>
        </DefaultLayout>
    );
};

export default About;
