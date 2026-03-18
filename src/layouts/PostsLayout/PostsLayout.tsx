import * as React from 'react';

import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { languages, LocaleType } from '@/translations/common';

interface ComponentProps {
    children: React.ReactNode;
    locale: LocaleType;
}

export const PostsLayout = ({ children, locale }: ComponentProps) => {
    const localisedString = languages[locale];

    return (
        <DefaultLayout locale={locale}>
            <div className="container flex justify-between flex-col md:flex-row mx-auto px-4 py-3">
                <h1 className="uppercase text-7xl md:text-9xl font-serif font-thin transition-[font-size] ease-in duration-500">
                    {localisedString.posts.title}
                </h1>
                <p className="md:w-1/4 mt-4 text-lg md:text-2xl md:text-right">
                    {localisedString.posts.subtitle}
                </p>
            </div>
            {children}
        </DefaultLayout>
    );
};
