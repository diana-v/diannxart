import { Metadata } from 'next';
import Link from 'next/link';

import { IconComponent } from '@/components/Icon/IconComponent';
import { ImageContainer } from '@/containers/Image/ImageContainer';
import { PostsLayout } from '@/layouts/PostsLayout/PostsLayout';
import { getPosts } from '@/schemas/getPosts';
import { languages, LocaleType } from '@/translations/common';
import { PostData } from '@/types/post';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const lang = locale as LocaleType;
    const localisedString = languages[lang];

    return {
        description: localisedString?.posts?.subtitle,
        openGraph: {
            description: localisedString?.posts?.subtitle,
            images: ['https://www.diann.lt/icons/icon-512x512.png'],
            siteName: 'DiannXArt',
            title: localisedString?.posts?.seoTitle,
            type: 'website',
            url: 'https://diann.lt',
        },
        title: localisedString?.posts?.seoTitle,
        twitter: {
            card: 'summary_large_image',
            description: localisedString?.posts?.subtitle,
            images: ['https://www.diann.lt/icons/icon-512x512.png'],
            title: localisedString?.posts?.seoTitle,
        },
    };
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const lang = locale as LocaleType;
    const localisedString = languages[lang];

    const posts = await getPosts(lang)

    return (
        <PostsLayout locale={lang}>
            {posts.length > 0 && (
                <ul className="container columns-1 lg:columns-2 xl:columns-3 gap-4 lg:gap-8 mx-auto px-4 pt-6 pb-10">
                    {posts.map((post: PostData) => (
                        <li className="mb-8 inline-block w-full" key={post.id}>
                            <Link href={`/${lang}/work/${post.slug}`} prefetch={false}>
                                <div className="overflow-hidden rounded-md relative mb-2">
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
                                <div className="flex w-full mb-2">
                                    <div className="flex flex-col grow">
                                        <h2 className="text-2xl md:text-3xl font-medium">{post?.title}</h2>
                                        {post.dimensions && (
                                            <p className="text-xl md:text-2xl flex gap-2">
                                                <span>{localisedString.post.dimensions}</span>
                                                <b className="font-medium">
                                                    {post.dimensions.height}cm x {post.dimensions.width}cm
                                                </b>
                                            </p>
                                        )}
                                        <p className="text-xl md:text-2xl">{post?.subtitle}</p>
                                    </div>
                                    {post.price && !post.sold && (
                                        <span className="text-2xl font-bold">{post.price}</span>
                                    )}
                                </div>
                                <button
                                    aria-label={`${localisedString.post.readMore} ${post?.title}`}
                                    className="md:py-1 px-3 md:px-4 max-w-6xl rounded-md hover:shadow-md cursor-pointer border border-black text-black flex gap-2 items-center"
                                    type="button"
                                >
                                    <span className="text-xl md:text-2xl md:leading-none pb-1">{localisedString.post.readMore}</span>
                                    <IconComponent className="h-2.5 md:h-3 w-2.5 md:w-3" name="arrowRightUp" />
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </PostsLayout>
    );
}