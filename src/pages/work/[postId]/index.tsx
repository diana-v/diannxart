import { TypedObject } from '@portabletext/types';
import { GetServerSideProps, NextPage } from 'next';
import { createClient } from 'next-sanity';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import ImageGallery from 'react-image-gallery';

import { RichTextComponent } from '@/components/RichText/RichTextComponent';
import { FooterContainer } from '@/containers/Footer/FooterContainer';
import { HeaderContainer } from '@/containers/Header/HeaderContainer';
import { ImageContainer } from '@/containers/Image/ImageContainer';
import { languages, LocaleType } from '@/translations/common';

interface DimensionsType {
    height: number;
    width: number;
}

interface ImagesType {
    original: string;
    originalAlt: string;
}

interface PageProps {
    post: PostData;
}

interface PostData {
    body?: TypedObject | TypedObject[];
    canonicalSlug?: string;
    dimensions?: DimensionsType;
    id: string;
    images: ImagesType[];
    imageUrl: string;
    price?: string;
    publishedAt?: string;
    sold: boolean;
    subtitle: string;
    title: string;
}

const Post: NextPage<PageProps> = ({ post }) => {
    const { defaultLocale, locale, push } = useRouter();
    const localisedString = languages[(locale ?? defaultLocale) as LocaleType];

    const publishingYear = post.publishedAt && new Date(post.publishedAt).getFullYear();

    const handleClick = React.useCallback(() => {
        push(`/contact?title=${post.title}`);
    }, [post.title, push]);

    return (
        <>
            <Head>
                <title>{`${post.title} | DiannXArt`}</title>
                <meta content={post.subtitle} name="description" />
            </Head>
            <HeaderContainer />
            <>
                <div className="container flex flex-col items-center gap-6 mx-auto px-4 py-3">
                    <h1 className="uppercase text-5xl md:text-7xl font-serif font-thin text-center transition-[font-size] ease-in duration-500">{post.title}</h1>
                    <div className="flex flex-col items-center max-w-6xl mb-6">
                        {publishingYear && (
                            <p className="text-2xl flex gap-2">
                                <span>{localisedString.post.year}</span>
                                <b>{publishingYear}</b>
                            </p>
                        )}
                        {post.dimensions && (
                            <p className="text-2xl flex gap-2">
                                <span>{localisedString.post.dimensions}</span>
                                <b>
                                    {post.dimensions.height}cm x {post.dimensions.width}cm
                                </b>
                            </p>
                        )}
                        {post?.body && (
                            <div className="text-2xl mt-4">
                                <RichTextComponent classNames={{ root: 'flex flex-col gap-2' }} content={post.body} />
                            </div>
                        )}
                    </div>

                    <div className="overflow-hidden rounded-md relative">
                        {post.images.length > 0 ? (
                            <ImageGallery
                                items={post.images}
                                showBullets={post.images.length > 1}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showThumbnails={false}
                            />
                        ) : (
                            <ImageContainer alt={post.title} height={1000} src={post.imageUrl} width={1152} />
                        )}
                        {post.sold && <div className="px-6 py-2 absolute top-8 right-0 bg-white border-black border-r-0 rounded-r-none rounded-md text-xl md:text-2xl uppercase font-bold tracking-wider">{localisedString.post.sold}</div>}
                        {post.price && !post.sold && <div className="px-6 py-2 absolute top-8 right-0 bg-white border-black border-r-0 rounded-r-none rounded-md text-xl md:text-2xl uppercase font-bold tracking-wider">{post.price}</div>}
                    </div>
                </div>
                {!post.sold && (
                    <div className="container mx-auto px-4 py-2 w-full bg-white sticky bottom-0 flex justify-center">
                        <button
                            aria-label={`${localisedString.post.enquireAbout} ${post.title}`}
                            className="py-2 w-full max-w-6xl rounded-md shadow-md border border-black text-xl md:text-2xl text-black uppercase font-bold tracking-wider"
                            onClick={handleClick}
                            type="button"
                        >
                            {localisedString.post.enquire}
                        </button>
                    </div>
                )}
            </>
            <FooterContainer />
        </>
    );
};

const client = createClient({
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    dataset: process.env.SANITY_STUDIO_DATASET,
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    useCdn: false,
});

export const getServerSideProps: GetServerSideProps = async ({ defaultLocale, locale, params }) => {
    const postId = params?.postId;

    const post = await client.fetch(
        `*[_type == 'post' && (
          slug[$locale].current == $postId ||
          slug[$defaultLocale].current == $postId ||
          _id == $postId
        )]{
          "title": coalesce(title[$locale], title[$defaultLocale]),
          "subtitle": coalesce(subtitle[$locale], subtitle[$defaultLocale]),
          publishedAt,
          sold,
          price,
          dimensions,
          "body": coalesce(body[$locale], body[$defaultLocale]),
          "canonicalSlug": coalesce(slug[$locale].current, slug[$defaultLocale].current),
          "id": _id,
          "imageUrl": mainImage.asset->url,
          "images": images[] {
            "original": asset->url,
            "originalAlt": alt
          }
      }[0]`,
        { defaultLocale, locale, postId }
    );

    return {
        props: {
            post,
        },
    };
};

export default Post;
