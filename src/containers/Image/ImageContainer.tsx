'use client';

import Image, { ImageProps } from 'next/image';
import * as React from 'react';

import { imagePlaceHolder } from '@/lib/imagePlaceHolder';

export const ImageContainer = ({ alt, src, ...restProps }: Partial<ImageProps>) => {
    const [hasError, setHasError] = React.useState(false);

    if (hasError || !src) return null;

    return (
        <div className="flex relative">
            <Image
                alt={alt ?? ''}
                blurDataURL={src?.toString().includes('http') ? imagePlaceHolder() : undefined}
                loading="lazy"
                onError={() => setHasError(true)}
                placeholder="blur"
                src={src}
                {...restProps}
            />
        </div>
    );
};
