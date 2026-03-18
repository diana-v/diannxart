import Link from 'next/link';

import { MobileMenu } from '@/containers/Header/MobileMenu';
import { languages, LocaleType } from '@/translations/common';

export const HeaderContainer = async ({ locale }: { locale: LocaleType }) => {
    const localisedString = languages[locale];

    return (
        <nav className="container mx-auto flex flex-wrap justify-between items-center px-4 py-3 gap-x-5">
            <Link className="font-display text-3xl leading-14" href={`/${locale}/work`}>
                diann x art
            </Link>

            <MobileMenu locale={locale} localisedString={localisedString} />
        </nav>
    );
};