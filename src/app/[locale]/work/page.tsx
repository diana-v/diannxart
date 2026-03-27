import { Metadata } from 'next';
import { createClient } from 'next-sanity';
import Link from 'next/link';

import { ImageContainer } from '@/containers/Image/ImageContainer';
import { PostsLayout } from '@/layouts/PostsLayout/PostsLayout';
import { languages, LocaleType } from '@/translations/common';
import { PostData } from '@/types/post';

export const revalidate = 60;

const client = createClient({
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    dataset: process.env.SANITY_STUDIO_DATASET,
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    useCdn: false,
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const lang = locale as LocaleType;

    return {
        description: 'Art Gallery and Portfolio',
        title: lang === 'lt' ? 'Darbai | diannxart' : 'Work | diannxart',
    };
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const lang = locale as LocaleType;
    const localisedString = languages[lang];

    const posts = await client.fetch(
        `*[_type == 'post']{
          "title": coalesce(title[$locale], title[$defaultLocale]),
          "subtitle": coalesce(subtitle[$locale], subtitle[$defaultLocale]),
          "slug": coalesce(slug[$locale].current, slug[$defaultLocale].current),
          sold,
          price,
          dimensions,
          orderRank,
          "id": _id,
          "imageUrl": mainImage.asset->url
      } | order(orderRank)`,
        { defaultLocale: 'lt', locale: lang }
    );

    return (
        <PostsLayout locale={lang}>
            {posts.length > 0 && (
                <ul className="container columns-1 lg:columns-2 xl:columns-3 gap-4 lg:gap-8 mx-auto px-4 pt-6 pb-10">
                    {posts.map((post: PostData) => (
                        <li className="mb-8 inline-block w-full" key={post.id}>
                            <Link href={`/${lang}/work/${post.slug || post.id}`}>
                                <div className="overflow-hidden rounded-md relative">
                                    <ImageContainer
                                        alt={post.title}
                                        className="transition-transform ease-in duration-300 hover:scale-105"
                                        height={500}
                                        src={post.imageUrl}
                                        width={800}
                                    />
                                    {post.sold && (
                                        <div className="px-6 py-2 absolute top-8 right-0 bg-white border-black border-r-0 rounded-r-none rounded-md text-lg md:text-xl uppercase font-bold tracking-wider">
                                            {localisedString.post.sold}
                                        </div>
                                    )}
                                </div>
                                <div className="flex w-full mt-2">
                                    <div className="flex flex-col grow">
                                        <h2 className="text-3xl font-medium">{post?.title}</h2>
                                        {post.dimensions && (
                                            <p className="text-2xl flex gap-2">
                                                <span>{localisedString.post.dimensions}</span>
                                                <b className="font-medium">
                                                    {post.dimensions.height}cm x {post.dimensions.width}cm
                                                </b>
                                            </p>
                                        )}
                                        <p className="text-2xl">{post?.subtitle}</p>
                                    </div>
                                    {post.price && !post.sold && (
                                        <span className="text-2xl font-bold">{post.price}</span>
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </PostsLayout>
    );
}