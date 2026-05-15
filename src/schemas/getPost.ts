import { cache } from 'react';

import { client } from '@/lib/sanity';

export const getPost = cache(async (postId: string, locale = 'lt', defaultLocale = 'lt') => {
    console.log(`[Cache Miss] Fetching Post Data for: ${locale}`);

    return await client.fetch(
        `*[_type == 'post' && slug.current == $postId]{
          "title": coalesce(title[$locale], title[$defaultLocale]),
          "subtitle": coalesce(subtitle[$locale], subtitle[$defaultLocale]),
          publishedAt, sold, price, dimensions,
          "body": coalesce(body[$locale], body[$defaultLocale]),
          "id": _id,
          "imageUrl": mainImage.asset->url,
          "images": images[] { "original": asset->url, "originalAlt": alt }
      }[0]`,
        { defaultLocale, locale, postId },
        {
            cache: 'force-cache',
            next: {
                revalidate: 60,
                tags: ['post', postId]
            }
        }
    );
})
