import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { AlertComponent, AlertType } from './AlertComponent';

describe('AlertComponent', () => {
    it('renders message', () => {
        render(<AlertComponent className="class" color={AlertType.Error} message="message" />);

        expect(screen.getByTestId('alertComponent').textContent).toStrictEqual('message');
    });

    it('renders error alert', () => {
        render(<AlertComponent color={AlertType.Error} message="message" />);

        expect(screen.getByTestId('alertComponent').className).toContain('bg-red-100');
    });

    it('renders success alert', () => {
        render(<AlertComponent color={AlertType.Success} message="message" />);

        expect(screen.getByTestId('alertComponent').className).toContain('bg-green-100');
    });

    it('passes className to component', () => {
        render(<AlertComponent className="class" color={AlertType.Error} message="message" />);

        expect(screen.getByTestId('alertComponent').className).toContain('class');
    });
});
