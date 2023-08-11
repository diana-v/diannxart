import { createClient } from 'next-sanity';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { PostsLayout } from '@/layouts/PostsLayout/PostsLayout';
import styles from './work.module.scss';
import { ImageContainer } from '@/containers/Image/ImageContainer';

interface PostData {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
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
                                    </div>
                                    <h2 className="text-2xl">{post?.title}</h2>
                                    <p className="text-xl">{post?.subtitle}</p>
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
          "id": _id,
          "imageUrl": mainImage.asset->url
      }`
    );

    return {
        props: {
            posts,
        },
    };
};

export default Work;
