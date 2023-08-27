import React from 'react';
import { render } from '@testing-library/react';

import { FooterContainer } from './FooterContainer';

describe('FooterContainer', () => {
    it('renders the copyright information with the current year', () => {
        const { container } = render(<FooterContainer />);

        const currentYear = new Date().getFullYear();
        const copyrightText = `Copyright ${currentYear} diann x art`;

        expect(container.textContent).toContain(copyrightText);
    });

    it('renders the love emoji', () => {
        const { getByLabelText } = render(<FooterContainer />);

        const loveEmoji = getByLabelText('Love');

        expect(loveEmoji).toBeInTheDocument();
        expect(loveEmoji).toHaveClass('text-error');
    });
});
