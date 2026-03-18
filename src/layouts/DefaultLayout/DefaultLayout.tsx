import Head from 'next/head';
import * as React from 'react';

import { FooterContainer } from '@/containers/Footer/FooterContainer';
import { HeaderContainer } from '@/containers/Header/HeaderContainer';

interface ComponentProps {
    children: React.JSX.Element;
    description: string;
    title: string;
}

export const DefaultLayout = ({ children, description, title }: ComponentProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta content={description} name="description" />
            </Head>
            <div className="min-h-screen flex flex-col">
                <HeaderContainer />
                {children}
                <FooterContainer />
            </div>
        </>
    );
};
