import * as React from 'react';

import { FooterContainer } from '@/containers/Footer/FooterContainer';
import { HeaderContainer } from '@/containers/Header/HeaderContainer';

interface ComponentProps {
    children: JSX.Element;
}

export const DefaultLayout: React.FC<ComponentProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderContainer />
            {children}
            <FooterContainer />
        </div>
    );
};
