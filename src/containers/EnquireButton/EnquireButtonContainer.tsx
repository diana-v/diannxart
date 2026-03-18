'use client';

import { useRouter } from 'next/navigation';

import { TranslationSchema } from '@/types/translation';

interface EnquireButtonProps {
    locale: string;
    localisedString: TranslationSchema['post'];
    title: string;
}

export const EnquireButtonContainer = ({ locale, localisedString, title }: EnquireButtonProps) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/${locale}/contact?title=${encodeURIComponent(title)}`);
    };

    return (
        <button
            aria-label={`${localisedString.enquireAbout} ${title}`}
            className="py-2 w-full max-w-6xl rounded-md shadow-md border border-black text-xl md:text-2xl text-black uppercase font-medium tracking-wider"
            onClick={handleClick}
            type="button"
        >
            {localisedString.enquire}
        </button>
    );
}