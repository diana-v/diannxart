import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import React, { JSX } from 'react';

import { LocaleType } from '@/translations/common';

import { HeaderContainer } from './HeaderContainer';

const mockedUsePathname = jest.mocked(usePathname);

const renderHeader = async (locale: LocaleType = 'lt') => {
    const ResolvedComponent = await HeaderContainer({ locale });

    return render(ResolvedComponent as unknown as JSX.Element);
};

jest.mock('next/navigation', () => ({
    useParams: jest.fn(() => ({ locale: 'lt' })),
    usePathname: jest.fn(),
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

jest.mock('@/components/Icon/IconComponent', () => ({
    IconComponent: () => <div data-testid="icon" />
}));

describe('HeaderContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component without error', async () => {
        mockedUsePathname.mockReturnValue('/lt/work');
        const { container } = await renderHeader('lt');

        expect(container).toBeTruthy();
    });

    it('toggles the menu on button click', async () => {
        mockedUsePathname.mockReturnValue('/lt/work');
        await renderHeader('lt');

        const menuButton = screen.getByLabelText('Navigation');

        fireEvent.click(menuButton);

        expect(screen.getByText(/Darbai/i)).toBeInTheDocument();
    });

    it('highlights the active link', async () => {
        mockedUsePathname.mockReturnValue('/lt/work');

        await renderHeader('lt');

        const activeLink = screen.getByText(/Darbai/i);

        expect(activeLink).toHaveClass('text-black');
    });
});
