import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { HeaderContainer } from './HeaderContainer';

jest.mock('@/components/Icon/IconComponent');

describe('HeaderContainer', () => {
    it('renders the component without error', () => {
        const { container } = render(<HeaderContainer />);

        expect(container).toBeTruthy();
    });

    it('toggles the menu on button click', () => {
        const { getByText, getByRole } = render(<HeaderContainer />);

        const menuButton = getByRole('button');

        fireEvent.click(menuButton);

        const menuLinks = getByText('Work');

        expect(menuLinks).toBeInTheDocument();
    });

    it('highlights the active link', () => {
        jest.mock('next/router', () => ({
            useRouter: () => ({
                asPath: '/work',
            }),
        }));

        const { getByText } = render(<HeaderContainer />);

        const activeLink = getByText('Work');

        expect(activeLink).toHaveClass('text-black');
    });
});
