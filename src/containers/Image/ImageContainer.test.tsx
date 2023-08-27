import React, { ComponentProps } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { ImageContainer } from './ImageContainer';

describe('ImageContainer', () => {
    const defaultProps = {
        width: 500,
        height: 500,
        src: '/image.jpg',
        alt: 'Sample Image',
        blurDataURL: 'data:image/png;base64,placeholderdata',
    };

    const renderComponent = (props: ComponentProps<typeof ImageContainer> = defaultProps) =>
        render(<ImageContainer {...props} />);

    it('renders an image with provided src and alt', () => {
        const { container } = renderComponent();

        const image = container.querySelector('img');

        expect(image?.getAttribute('src')).toStrictEqual('http://localhost/_next/image?url=%2Fimage.jpg&w=1080&q=75');
        expect(image?.getAttribute('alt')).toStrictEqual('Sample Image');
    });

    it('does not render alt if it is not passed', () => {
        const { container } = renderComponent({ ...defaultProps, alt: undefined });
        const image = container.querySelector('img');

        expect(image?.getAttribute('alt')).toBeFalsy();
    });

    it('renders only one image inside', () => {
        const { container } = renderComponent();

        expect(container.querySelectorAll('img')).toHaveLength(1);
    });

    it('does not render when src is not provided', () => {
        const { container } = render(<ImageContainer />);

        expect(container).toBeEmptyDOMElement();
    });

    it('applies custom props to the image element', () => {
        const { getByAltText } = renderComponent({ ...defaultProps, className: 'custom-class' });
        const image = getByAltText('Sample Image');

        expect(image).toHaveClass('custom-class');
    });

    it('applies the error handling class on image error', () => {
        const { getByAltText, container } = render(<ImageContainer {...defaultProps} />);
        const image = getByAltText('Sample Image');

        fireEvent(image, new Event('error'));

        expect(container?.classList?.contains('none')).toBeTruthy();
    });

    it('renders placeholder when src is not an external URL', () => {
        const { container } = renderComponent({ ...defaultProps, src: 'https://externalurl.com' });

        expect(container.getAttribute('blurDataURL')).toBeFalsy();
    });
});
