import * as React from 'react';
import Link from 'next/link';
import cn from 'clsx';
import { useRouter } from 'next/router';

import styles from './headerContainer.module.scss';
import { IconComponent } from '@/components/Icon/IconComponent';

enum Pages {
    Work = '/work',
    About = '/about',
    Contact = '/contact',
}

export const HeaderContainer: React.FC = () => {
    const { asPath } = useRouter();
    const [showMenu, setShowMenu] = React.useState(false);

    const handleShowMenu = React.useCallback(() => {
        setShowMenu((prevState) => !prevState);
    }, []);

    return (
        <nav className={styles.root}>
            <Link href={'/work'} className="font-display text-3xl leading-[3.5rem]">
                diann x art
            </Link>
            <button className="block md:hidden w-6 h-6 text-grey-400 hover:text-black" onClick={handleShowMenu}>
                <IconComponent name="hamburger" />
            </button>
            <div className={`${showMenu ? 'max-h-[124px]' : 'max-h-[0px]'} ${styles.linkContainer}`}>
                <Link
                    href={'/work'}
                    className={cn('text-grey-400 hover:text-black', { 'text-black': asPath === Pages.Work })}
                >
                    Work
                </Link>
                <Link
                    href={'/about'}
                    className={cn('text-grey-400 hover:text-black', { 'text-black': asPath === Pages.About })}
                >
                    About
                </Link>
                <Link
                    href={'/contact'}
                    className={cn('text-grey-400 hover:text-black', { 'text-black': asPath === Pages.Contact })}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
};
