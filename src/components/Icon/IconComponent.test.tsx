import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { IconComponent, Icons } from './IconComponent';

jest.mock('./icons/hamburger.svg', () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: (props: any) => <svg {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReactComponent: (props: any) => <svg {...props} />,
}));

describe('IconComponent', () => {
    it('renders the icon when loading is complete', async () => {
        const { container } = render(<IconComponent name={Icons.hamburger} />);

        await waitFor(() => screen.getByTestId('iconComponent'));

        const iconElement = container.querySelector('svg');

        expect(iconElement).toBeInTheDocument();
    });

    it('handles click events correctly', async () => {
        const mockOnClick = jest.fn();
        const { container } = render(<IconComponent name={Icons.hamburger} onClick={mockOnClick} />);

        await waitFor(() => screen.getByTestId('iconComponent'));

        const iconElement = container.querySelector('svg');

        if (iconElement) await userEvent.click(iconElement);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not render anything while loading', async () => {
        render(<IconComponent name={Icons.hamburger} />);

        expect(screen.queryByTestId('iconComponent')).not.toBeInTheDocument();

        await waitFor(() => screen.getByTestId('iconComponent'));
    });
});
