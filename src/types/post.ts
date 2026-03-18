import { TypedObject } from '@portabletext/types';

export interface Dimensions {
    height: number;
    width: number;
}

export interface PostData {
    body?: TypedObject | TypedObject[];
    dimensions?: Dimensions;
    id: string;
    images: PostImage[];
    imageUrl: string;
    orderRank?: string;
    price?: string;
    publishedAt?: string;
    slug: string;
    sold: boolean;
    subtitle: string;
    title: string;
}

export interface PostImage {
    original: string;
    originalAlt: string;
}
