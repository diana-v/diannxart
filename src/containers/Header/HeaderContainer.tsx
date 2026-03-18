import cn from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { IconComponent } from '@/components/Icon/IconComponent';
import { languages, LocaleType } from '@/translations/common';

enum Pages {
    About = '/about',
    Contact = '/contact',
    Work = '/work',
}

export const HeaderContainer = () => {
    const { asPath, defaultLocale, locale, push } = useRouter();
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
        <nav className="container mx-auto flex flex-wrap justify-between items-center px-4 py-3 gap-x-5">
            <Link className="font-display text-3xl leading-14" href={'/work'}>
                diann x art
            </Link>
            <button
                aria-label="Navigation"
                className="block md:hidden w-6 h-6 text-grey-600 hover:text-black"
                onClick={handleShowMenu}
            >
                <IconComponent name="hamburger" />
            </button>
            <div className={`${showMenu ? 'max-h-[144px]' : 'max-h-0'} md:max-h-[initial] overflow-hidden md:overflow-visible flex flex-col md:flex-row basis-full md:basis-auto gap-2 md:gap-5 text-xl md:text-2xl transition-[max-height] ease-out duration-500`}>
                <Link
                    className={cn('text-grey-600 hover:text-black', {
                        'text-black': asPath === Pages.Work,
                    })}
                    href="/work"
                >
                    {localisedString.navigation.work}
                </Link>
                <Link
                    className={cn('text-grey-600 hover:text-black', {
                        'text-black': asPath === Pages.About,
                    })}
                    href="/about"
                >
                    {localisedString.navigation.about}
                </Link>
                <Link
                    className={cn('text-grey-600 hover:text-black', {
                        'text-black': asPath === Pages.Contact,
                    })}
                    href="/contact"
                >
                    {localisedString.navigation.contact}
                </Link>
                <button
                    aria-label={localisedString.navigation.switchLanguage}
                    className="self-start"
                    onClick={handleToggleLocale}
                    type="button"
                >
                    {locale === 'lt' ? <span>🇬🇧</span> : <span>🇱🇹</span>}
                </button>
            </div>
        </nav>
    );
};
