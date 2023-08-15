import * as React from 'react';
import cn from 'clsx';

import styles from './alertComponent.module.scss';

export enum AlertType {
    Success = 'success',
    Error = 'error',
}

interface ComponentProperties {
    color: AlertType;
    message: string;
    className?: string;
}

export const AlertComponent: React.FC<ComponentProperties> = ({ color, message, className }) => {
    const wrapperClass = cn({
        [styles.success]: color === AlertType.Success,
        [styles.error]: color === AlertType.Error,
    });

    return <div className={`${className} ${wrapperClass}`}>{message}</div>;
};

AlertComponent.displayName = 'AlertComponent';
