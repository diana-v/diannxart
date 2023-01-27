import * as React from 'react';

import styles from './postsLayout.module.scss';
import { FooterContainer } from 'src/containers/Footer/FooterContainer';
import { HeaderContainer } from 'src/containers/Header/HeaderContainer';

interface ComponentProps {
    children: JSX.Element;
}

export const PostsLayout: React.FC<ComponentProps> = ({ children }) => {
    return (
        <div>
            <HeaderContainer />
            <div className="container flex justify-between flex-col md:flex-row mx-auto px-2 py-3">
                <h1 className={styles.title}>Studio</h1>
                <p className={styles.subtitle}>
                    A carefully curated selection of the best art projects made by diann x art studio.
                </p>
            </div>
            <div className="mt-20 relative flex-grow flex flex-col">{children}</div>
            <FooterContainer />
        </div>
    );
};
