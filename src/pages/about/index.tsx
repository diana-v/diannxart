import * as React from 'react';
import { useRouter } from 'next/router';

import styles from './about.module.scss';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { languages, LocaleType } from '@/translations/common';

const About: React.FC = () => {
    const { locale, defaultLocale } = useRouter();
    const localisedString = languages[(locale ?? defaultLocale) as LocaleType];

    return (
        <DefaultLayout title={localisedString.about.seoTitle} description={localisedString.about.seoDescription}>
            <div className="container flex flex-col mx-auto px-4 py-3 gap-8 flex-grow max-w-5xl">
                <h1 className={styles.title}>{localisedString.about.title}</h1>
                <article className="flex flex-col gap-4 text-xl md:text-2xl">
                    <p>{localisedString.about.description.first}</p>
                    <p>{localisedString.about.description.second}</p>
                </article>
            </div>
        </DefaultLayout>
    );
};

export default About;
