import Image from 'next/image'
import { createClient } from "next-sanity";
import { GetServerSideProps, NextPage } from "next";

interface Post {
    id: string,
    title: string,
    imageUrl: string,
}

interface PageProps {
    post: Post
}

const Post: NextPage<PageProps>  = ({ post }) => {
    return (
        <>
            <header>
                <h1>Sanity + Next.js</h1>
            </header>
            <main>
                <h2>pets</h2>
                <div>
                    <span className="font-bold text-red" key={post.id}>{post.title}</span>
                    <Image alt={post.title} src={post.imageUrl} width={500} height={500}/>
                </div>
                {!post && <p>No post</p>}
            </main>
        </>
    );
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: false
});

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const postId = params?.postId;
    const post = await client.fetch(`*[_type == 'post' && _id == '${postId}']{
          title,
          "id": _id,
          "imageUrl": mainImage.asset->url
      }[0]`
    );

    return {
        props: {
            post
        }
    }
}

export default Post;