'use client';

import { usePathname, useRouter } from 'next/navigation';

export const LocaleSwitcher = ({ locale }: { locale: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleToggle = () => {
        const newLocale = locale === 'lt' ? 'en' : 'lt';
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);

        router.push(newPath);
    };

    return (
        <button className="text-3xl w-10" onClick={handleToggle} type="button">
            {locale === 'lt' ? '🇬🇧' : '🇱🇹'}
        </button>
    );
};