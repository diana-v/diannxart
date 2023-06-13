import * as React from 'react';

import styles from './postsLayout.module.scss';
import { FooterContainer } from '@/containers/Footer/FooterContainer';
import { HeaderContainer } from '@/containers/Header/HeaderContainer';

interface ComponentProps {
    children: JSX.Element;
}

export const PostsLayout: React.FC<ComponentProps> = ({ children }) => {
    return (
        <>
            <HeaderContainer />
            <div className="container flex justify-between flex-col md:flex-row mx-auto px-4 py-3">
                <h1 className={styles.title}>Studio</h1>
                <p className={styles.subtitle}>
                    A carefully curated selection of the best art projects made by diann x art studio.
                </p>
            </div>
            {children}
            <FooterContainer />
        </>
    );
};
