import { fireEvent, render } from '@testing-library/react';
import React, { ComponentProps } from 'react';

import { ImageContainer } from './ImageContainer';

describe('ImageContainer', () => {
    const defaultProps = {
        alt: 'Sample Image',
        blurDataURL: 'data:image/png;base64,placeholderdata',
        height: 500,
        src: '/image.jpg',
        width: 500,
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

    it('removes the component from the DOM on image error', () => {
        const { queryByAltText } = render(<ImageContainer {...defaultProps} />);
        const image = queryByAltText('Sample Image');

        expect(image).toBeInTheDocument();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fireEvent.error(image!);

        expect(queryByAltText('Sample Image')).not.toBeInTheDocument();
    });

    it('renders placeholder when src is not an external URL', () => {
        const { container } = renderComponent({ ...defaultProps, src: 'https://externalurl.com' });

        expect(container.getAttribute('blurDataURL')).toBeFalsy();
    });
});
