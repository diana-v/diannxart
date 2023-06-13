import * as React from 'react';
import Link from 'next/link';

import styles from './headerContainer.module.scss';
import { IconComponent } from '@/components/Icon/IconComponent';

export const HeaderContainer: React.FC = () => {
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
                <Link href={'/work'} className="text-grey-400 hover:text-black">
                    Work
                </Link>
                <Link href={'/about'} className="text-grey-400 hover:text-black">
                    About
                </Link>
                <Link href={'/contact'} className="text-grey-400 hover:text-black">
                    Contact
                </Link>
            </div>
        </nav>
    );
};
