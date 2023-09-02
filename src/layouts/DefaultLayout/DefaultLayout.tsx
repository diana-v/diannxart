import * as React from 'react';
import Head from 'next/head';

import { FooterContainer } from '@/containers/Footer/FooterContainer';
import { HeaderContainer } from '@/containers/Header/HeaderContainer';

interface ComponentProps {
    title: string;
    description: string;
    children: JSX.Element;
}

export const DefaultLayout: React.FC<ComponentProps> = ({ title, description, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <div className="min-h-screen flex flex-col">
                <HeaderContainer />
                {children}
                <FooterContainer />
            </div>
        </>
    );
};
