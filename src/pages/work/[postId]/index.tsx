import { createClient } from 'next-sanity';
import { GetServerSideProps, NextPage } from 'next';

import { HeaderContainer } from '@/containers/Header/HeaderContainer';
import { FooterContainer } from '@/containers/Footer/FooterContainer';
import styles from './post.module.scss';
import { ImageContainer } from '@/containers/Image/ImageContainer';

interface PostData {
    id: string;
    title: string;
    publishedAt?: string;
    imageUrl: string;
}

interface PageProps {
    post: PostData;
}

const Post: NextPage<PageProps> = ({ post }) => {
    const publishingYear = post.publishedAt && new Date(post.publishedAt).getFullYear();

    return (
        <>
            <HeaderContainer />
            <div className={styles.root}>
                <h1 className={styles.title} key={post.id}>
                    {post.title}
                </h1>
                {publishingYear && (
                    <p className="text-2xl flex gap-2">
                        <span>Year:</span>
                        <b>{publishingYear}</b>
                    </p>
                )}
                <div className="overflow-hidden rounded-md">
                    <ImageContainer alt={post.title} src={post.imageUrl} width={1140} height={1000} />
                </div>
            </div>
            {!post && <p>No post</p>}
            <FooterContainer />
        </>
    );
};

const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    useCdn: false,
});

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const postId = params?.postId;
    const post = await client.fetch(`*[_type == 'post' && _id == '${postId}']{
          title,
          publishedAt,
          "id": _id,
          "imageUrl": mainImage.asset->url
      }[0]`);

    return {
        props: {
            post,
        },
    };
};

export default Post;
