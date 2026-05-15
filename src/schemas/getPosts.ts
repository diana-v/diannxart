import { cache } from 'react';

import { client } from '@/lib/sanity';

export const getPosts = cache(async (locale = 'lt', defaultLocale = 'lt') => {
    console.log(`[Cache Miss] Fetching Posts Data for: ${locale}`);

    return await client.fetch(
        `*[_type == 'post']{
          "title": coalesce(title[$locale], title[$defaultLocale]),
          "subtitle": coalesce(subtitle[$locale], subtitle[$defaultLocale]),
          "slug": slug.current,
          sold,
          price,
          dimensions,
          orderRank,
          "id": _id,
          "imageUrl": mainImage.asset->url
      } | order(orderRank)`,
        { defaultLocale, locale },
        {
            cache: 'force-cache',
            next: {
                revalidate: 60,
                tags: ['posts']
            }
        }
    );
})
