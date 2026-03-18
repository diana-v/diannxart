'use client';
import ImageGallery from 'react-image-gallery';

import { ImageContainer } from '@/containers/Image/ImageContainer';
import { PostData } from '@/types/post';

export const PostGalleryContainer = ({ post }: { post: PostData }) => {
    if (post.images?.length > 0) {
        return (
            <ImageGallery
                items={post.images}
                showBullets={post.images.length > 1}
                showFullscreenButton={false}
                showPlayButton={false}
                showThumbnails={false}
            />
        );
    }

    return <ImageContainer alt={post.title} height={1000} src={post.imageUrl} width={1152} />;
}