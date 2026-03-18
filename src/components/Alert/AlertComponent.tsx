import cn from 'clsx';
import * as React from 'react';

export enum AlertType {
    Error = 'error',
    Success = 'success',
}

interface ComponentProps {
    className?: string;
    color: AlertType;
    message: string;
}

export const AlertComponent = ({ className, color, message }: ComponentProps) => {
    const wrapperClass = cn({
        'px-4 py-2 w-full rounded-md text-lg md:text-xl border border-green-400 bg-green-100': color === AlertType.Success,
        'px-4 py-2 w-full rounded-md text-lg md:text-xl border border-red-400 bg-red-100': color === AlertType.Error,
    });

    return (
        <div className={`${className} ${wrapperClass}`} data-testid="alertComponent">
            {message}
        </div>
    );
};

AlertComponent.displayName = 'AlertComponent';
