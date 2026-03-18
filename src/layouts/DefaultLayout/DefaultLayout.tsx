import { ReactNode } from 'react';

import { FooterContainer } from '@/containers/Footer/FooterContainer';
import { HeaderContainer } from '@/containers/Header/HeaderContainer';
import { LocaleType } from '@/translations/common';

interface ComponentProps {
    children: ReactNode;
    locale: LocaleType;
}

export const DefaultLayout = ({ children, locale }: ComponentProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderContainer locale={locale} />
            <main className="flex-grow flex flex-col">
                {children}
            </main>
            <FooterContainer />
        </div>
    );
};
