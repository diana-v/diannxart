import { createClient } from 'next-sanity';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import * as React from 'react';

import { PostsLayout } from '@/layouts/PostsLayout/PostsLayout';
import styles from './work.module.scss';
import { ImageContainer } from '@/containers/Image/ImageContainer';

type DimensionsType = {
    width: number;
    height: number;
};

interface PostData {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    sold: boolean;
    price?: string;
    dimensions?: DimensionsType;
}
interface PageProps {
    posts: PostData[];
}

const Work: NextPage<PageProps> = ({ posts }) => {
    return (
        <PostsLayout>
            <>
                {posts.length > 0 && (
                    <ul className={styles.root}>
                        {posts.map((post) => (
                            <li key={post.id} className="mb-8 inline-block">
                                <Link
                                    href={{
                                        pathname: '/work/[postId]',
                                        query: { postId: post.id },
                                    }}
                                >
                                    <div className={styles.imageContainer}>
                                        <ImageContainer
                                            className={styles.image}
                                            alt={post.title}
                                            src={post.imageUrl}
                                            width={800}
                                            height={500}
                                        />
                                        {post.sold && <div className={styles.label}>Sold</div>}
                                    </div>
                                    <div className="flex w-full">
                                        <div className="flex flex-col flex-grow">
                                            <h2 className="text-2xl">{post?.title}</h2>
                                            {post.dimensions && (
                                                <p className="text-xl flex gap-2">
                                                    <span>Dimensions:</span>
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
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    useCdn: false,
});

export const getServerSideProps: GetServerSideProps = async () => {
    const posts = await client.fetch(
        `*[_type == 'post']{
          title,
          subtitle,
          sold,
          price,
          dimensions,
          "id": _id,
          "imageUrl": mainImage.asset->url
      } | order(sold desc)`
    );

    return {
        props: {
            posts,
        },
    };
};

export default Work;
