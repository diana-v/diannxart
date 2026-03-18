import Image, { ImageProps } from 'next/image';
import * as React from 'react';

import { imagePlaceHolder } from '@/lib/imagePlaceHolder';

export const ImageContainer = ({ alt, src, ...restProps }: Partial<ImageProps>) => {
    const imageErrorHandler = React.useCallback((e: React.BaseSyntheticEvent) => {
        e.target.parentNode.parentNode.classList.add('none');
    }, []);

    if (!src) {
        return null;
    }

    return (
        <div className="flex relative">
            <Image
                alt={alt ?? ''}
                blurDataURL={src?.toString().includes('http') ? imagePlaceHolder() : undefined}
                loading="lazy"
                onError={imageErrorHandler}
                placeholder="blur"
                src={src}
                {...restProps}
            />
        </div>
    );
};
