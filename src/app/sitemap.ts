import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 1,
            url: 'https://diann.lt/lt/work',
        },
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 0.8,
            url: 'https://www.diann.lt/lt/about',
        },
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 0.8,
            url: 'https://www.diann.lt/lt/contact',
        },
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 1,
            url: 'https://diann.lt/en',
        },
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 0.8,
            url: 'https://www.diann.lt/en/about',
        },
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 0.8,
            url: 'https://www.diann.lt/en/contact',
        },
    ]
}