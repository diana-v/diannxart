import * as React from 'react';
import Link from 'next/link';
import cn from 'clsx';
import { useRouter } from 'next/router';

import styles from './headerContainer.module.scss';
import { IconComponent } from '@/components/Icon/IconComponent';
import { languages, LocaleType } from '@/translations/common';

export const HeaderContainer: React.FC = () => {
    const { asPath, locale, defaultLocale, push } = useRouter();
    const [showMenu, setShowMenu] = React.useState(false);
    const localisedString = languages[(locale ?? defaultLocale) as LocaleType];

    const handleShowMenu = React.useCallback(() => {
        setShowMenu((prevState) => !prevState);
    }, []);

    const handleToggleLocale = React.useCallback(() => {
        const newLocale = locale === 'lt' ? 'en' : 'lt';

        push(asPath, asPath, { locale: newLocale });
    }, [asPath, locale, push]);

    return (
        <nav className={styles.root}>
            <Link href={localisedString.paths.work} className="font-display text-3xl leading-[3.5rem]">
                diann x art
            </Link>
            <button
                className="block md:hidden w-6 h-6 text-grey-600 hover:text-black"
                onClick={handleShowMenu}
                aria-label="Navigation"
            >
                <IconComponent name="hamburger" />
            </button>
            <div className={`${showMenu ? 'max-h-[144px]' : 'max-h-[0px]'} ${styles.linkContainer}`}>
                <Link
                    href={localisedString.paths.work}
                    className={cn('text-grey-600 hover:text-black', {
                        'text-black': asPath === localisedString.paths.work,
                    })}
                >
                    {localisedString.navigation.work}
                </Link>
                <Link
                    href={localisedString.paths.about}
                    className={cn('text-grey-600 hover:text-black', {
                        'text-black': asPath === localisedString.paths.about,
                    })}
                >
                    {localisedString.navigation.about}
                </Link>
                <Link
                    href={localisedString.paths.contact}
                    className={cn('text-grey-600 hover:text-black', {
                        'text-black': asPath === localisedString.paths.contact,
                    })}
                >
                    {localisedString.navigation.contact}
                </Link>
                <button
                    type="button"
                    onClick={handleToggleLocale}
                    className="self-start"
                    aria-label={localisedString.navigation.switchLanguage}
                >
                    {locale === 'lt' ? <span>🇬🇧</span> : <span>🇱🇹</span>}
                </button>
            </div>
        </nav>
    );
};
