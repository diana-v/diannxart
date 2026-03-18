import { Metadata } from 'next';
import { createClient } from 'next-sanity';
import { notFound } from 'next/navigation';

import { RichTextComponent } from '@/components/RichText/RichTextComponent';
import { EnquireButtonContainer } from '@/containers/EnquireButton/EnquireButtonContainer';
import { PostGalleryContainer } from '@/containers/PostGallery/PostGalleryContainer';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { languages, LocaleType } from '@/translations/common';

const client = createClient({
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    dataset: process.env.SANITY_STUDIO_DATASET,
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    useCdn: false,
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string, postId: string }> }): Promise<Metadata> {
    const { locale, postId } = await params;
    const post = await getPost(postId, locale);

    if (!post) return {};

    return {
        description: post.subtitle,
        title: `${post.title} | DiannXArt`,
    };
}

// 3. Main Server Component
export default async function PostPage({ params }: { params: Promise<{ locale: string, postId: string }> }) {
    const { locale, postId } = await params;
    const post = await getPost(postId, locale);

    if (!post) notFound();

    const lang = locale as LocaleType;
    const localisedString = languages[lang];
    const publishingYear = post.publishedAt && new Date(post.publishedAt).getFullYear();

    return (
        <DefaultLayout locale={lang}>
            <div className="container flex flex-col items-center gap-6 mx-auto px-4 py-3">
                <h1 className="uppercase text-5xl md:text-7xl font-serif font-thin text-center">{post.title}</h1>

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
                            <b>{post.dimensions.height}cm x {post.dimensions.width}cm</b>
                        </p>
                    )}
                    {post?.body && (
                        <div className="text-2xl mt-4">
                            <RichTextComponent classNames={{ root: 'flex flex-col gap-2' }} content={post.body} />
                        </div>
                    )}
                </div>

                <div className="overflow-hidden rounded-md relative w-full flex justify-center">
                    <PostGalleryContainer post={post} />

                    {post.sold && <div className="px-6 py-2 absolute top-8 right-0 bg-white border-black border-r-0 rounded-r-none rounded-md text-xl md:text-2xl uppercase font-bold tracking-wider">{localisedString.post.sold}</div>}
                    {post.price && !post.sold && <div className="px-6 py-2 absolute top-8 right-0 bg-white border-black border-r-0 rounded-r-none rounded-md text-xl md:text-2xl uppercase font-bold tracking-wider">{post.price}</div>}
                </div>
            </div>

            {!post.sold && (
                <div className="container mx-auto px-4 py-2 w-full bg-white sticky bottom-0 flex justify-center">
                    <EnquireButtonContainer locale={locale} localisedString={localisedString.post} title={post.title} />
                </div>
            )}
        </DefaultLayout>
    );
}

async function getPost(postId: string, locale: string) {
    const defaultLocale = 'lt';

    return await client.fetch(
        `*[_type == 'post' && (slug[$locale].current == $postId || slug[$defaultLocale].current == $postId || _id == $postId)]{
          "title": coalesce(title[$locale], title[$defaultLocale]),
          "subtitle": coalesce(subtitle[$locale], subtitle[$defaultLocale]),
          publishedAt, sold, price, dimensions,
          "body": coalesce(body[$locale], body[$defaultLocale]),
          "id": _id,
          "imageUrl": mainImage.asset->url,
          "images": images[] { "original": asset->url, "originalAlt": alt }
      }[0]`,
        { defaultLocale, locale, postId }
    );
}
