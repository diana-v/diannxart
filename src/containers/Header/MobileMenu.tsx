'use client';

import cn from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { IconComponent } from '@/components/Icon/IconComponent';
import { LocaleType } from '@/translations/common';
import { TranslationSchema } from '@/types/translation';

import { LocaleSwitcher } from './LocaleSwitcher';

interface MobileMenuProps {
    locale: LocaleType;
    localisedString: TranslationSchema;
}

export const MobileMenu = ({ locale, localisedString }: MobileMenuProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: `/${locale}/work`, label: localisedString.navigation.work, raw: '/work' },
        { href: `/${locale}/about`, label: localisedString.navigation.about, raw: '/about' },
        { href: `/${locale}/contact`, label: localisedString.navigation.contact, raw: '/contact' },
    ];

    return (
        <>
            <button
                aria-label="Navigation"
                className="md:hidden w-6 h-6"
                onClick={() => setShowMenu(!showMenu)}
            >
                <IconComponent name="hamburger" />
            </button>

            <div className={cn(
                "flex flex-col md:flex-row gap-5 text-xl md:text-2xl transition-[max-height]",
                showMenu ? "max-h-40" : "max-h-0 md:max-h-none overflow-hidden md:overflow-visible"
            )}>
                {links.map((link) => (
                    <Link
                        className={cn('text-3xl hover:text-black', {
                            'text-black font-medium': pathname.endsWith(link.raw),
                        })}
                        href={link.href}
                        key={link.href}
                    >
                        {link.label}
                    </Link>
                ))}
                <LocaleSwitcher locale={locale} />
            </div>
        </>
    );
};