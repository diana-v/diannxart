import Image from 'next/image';
import { createClient } from 'next-sanity';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { PostsLayout } from '@/layouts/PostsLayout/PostsLayout';

interface PostData {
    id: string;
    title: string;
    imageUrl: string;
}
interface PageProps {
    posts: PostData[];
}

const Work: NextPage<PageProps> = ({ posts }) => {
    return (
        <PostsLayout>
            <main>
                <h2>pets</h2>
                {posts.length > 0 && (
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <Link
                                    href={{
                                        pathname: '/work/[postId]',
                                        query: { postId: post.id },
                                    }}
                                >
                                    {post?.title}
                                    <Image alt={post.title} src={post.imageUrl} width={500} height={500} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                {posts && posts.length === 0 && <p>No pets to show</p>}
            </main>
        </PostsLayout>
    );
};

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: false,
});

export const getServerSideProps: GetServerSideProps = async () => {
    const posts = await client.fetch(
        `*[_type == 'post']{
          title,
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
