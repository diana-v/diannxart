import { cache } from 'react';

import { client } from '@/lib/sanity';

export const getUnsoldPosts = cache(async (locale = 'lt', defaultLocale = 'lt') => {
    console.log(`[Cache Miss] Fetching Unsold Post Data for: ${locale}`);

    return await client.fetch(
        `*[_type == 'post' && sold != true]{
          "title": coalesce(title[$locale], title[$defaultLocale])
        }[].title`,
        { defaultLocale, locale },
        {
            cache: 'force-cache',
            next: {
                revalidate: 84_400,
                tags: ['unsoldPosts']
            }
        }
    );
})
