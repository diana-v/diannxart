import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { AlertComponent, AlertType } from './AlertComponent';

describe('AlertComponent', () => {
    it('renders message', () => {
        render(<AlertComponent color={AlertType.Error} message="message" className="class" />);

        expect(screen.getByTestId('alertComponent').textContent).toStrictEqual('message');
    });

    it('renders error alert', () => {
        render(<AlertComponent color={AlertType.Error} message="message" />);

        expect(screen.getByTestId('alertComponent').className).toContain('error');
    });

    it('renders success alert', () => {
        render(<AlertComponent color={AlertType.Success} message="message" />);

        expect(screen.getByTestId('alertComponent').className).toContain('success');
    });

    it('passes className to component', () => {
        render(<AlertComponent color={AlertType.Error} message="message" className="class" />);

        expect(screen.getByTestId('alertComponent').className).toContain('class');
    });
});
