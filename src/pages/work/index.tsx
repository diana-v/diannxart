import { GetServerSideProps, NextPage } from 'next';
import { createClient } from 'next-sanity';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { ImageContainer } from '@/containers/Image/ImageContainer';
import { PostsLayout } from '@/layouts/PostsLayout/PostsLayout';
import { languages, LocaleType } from '@/translations/common';

interface DimensionsType {
    height: number;
    width: number;
}

interface PageProps {
    posts: PostData[];
}
interface PostData {
    dimensions?: DimensionsType;
    id: string;
    imageUrl: string;
    price?: string;
    slug: string;
    sold: boolean;
    subtitle: string;
    title: string;
}

const Work: NextPage<PageProps> = ({ posts }) => {
    const { defaultLocale, locale } = useRouter();
    const localisedString = languages[(locale ?? defaultLocale) as LocaleType];

    return (
        <PostsLayout>
            <>
                {posts.length > 0 && (
                    <ul className="container columns-1 lg:columns-2 xl:columns-3 gap-4 lg:gap-8 mx-auto px-4 pt-6 pb-10">
                        {posts.map((post) => (
                            <li className="mb-8 inline-block" key={post.id}>
                                <Link
                                    href={{
                                        pathname: '/work/[postId]',
                                        query: { postId: post.id },
                                    }}
                                >
                                    <div className="overflow-hidden rounded-md relative">
                                        <ImageContainer
                                            alt={post.title}
                                            className="transition-transform ease-in duration-300 hover:scale-105"
                                            height={500}
                                            src={post.imageUrl}
                                            width={800}
                                        />
                                        {post.sold && <div className="px-6 py-2 absolute top-8 right-0 bg-white border-black border-r-0 rounded-r-none rounded-md text-lg md:text-xl uppercase font-bold tracking-wider">{localisedString.post.sold}</div>}
                                    </div>
                                    <div className="flex w-full">
                                        <div className="flex flex-col grow">
                                            <h2 className="text-2xl">{post?.title}</h2>
                                            {post.dimensions && (
                                                <p className="text-xl flex gap-2">
                                                    <span>{localisedString.post.dimensions}</span>
                                                    <b>
                                                        {post.dimensions.height}cm x {post.dimensions.width}cm
                                                    </b>
                                                </p>
                                            )}
                                            <p className="text-xl">{post?.subtitle}</p>
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
            </>
        </PostsLayout>
    );
};

const client = createClient({
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    dataset: process.env.SANITY_STUDIO_DATASET,
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    useCdn: false,
});

export const getServerSideProps: GetServerSideProps = async ({ defaultLocale, locale }) => {
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
        { defaultLocale, locale }
    );

    return {
        props: {
            posts,
        },
    };
};

export default Work;
