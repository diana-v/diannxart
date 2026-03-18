import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { HeaderContainer } from './HeaderContainer';

jest.mock('@/components/Icon/IconComponent');

describe('HeaderContainer', () => {
    it('renders the component without error', () => {
        const { container } = render(<HeaderContainer />);

        expect(container).toBeTruthy();
    });

    it('toggles the menu on button click', () => {
        const { getByLabelText, getByText } = render(<HeaderContainer />);

        const menuButton = getByLabelText('Navigation');

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
