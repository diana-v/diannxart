import * as React from 'react';
import { useRouter } from 'next/router';

import styles from './postsLayout.module.scss';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { languages, LocaleType } from '@/translations/common';

interface ComponentProps {
    children: JSX.Element;
}

export const PostsLayout: React.FC<ComponentProps> = ({ children }) => {
    const { locale, defaultLocale } = useRouter();
    const localisedString = languages[(locale ?? defaultLocale) as LocaleType];

    return (
        <DefaultLayout title={localisedString.posts.seoTitle} description={localisedString.posts.subtitle}>
            <>
                <div className="container flex justify-between flex-col md:flex-row mx-auto px-4 py-3">
                    <h1 className={styles.title}>{localisedString.posts.title}</h1>
                    <p className={styles.subtitle}>{localisedString.posts.subtitle}</p>
                </div>
                {children}
            </>
        </DefaultLayout>
    );
};
