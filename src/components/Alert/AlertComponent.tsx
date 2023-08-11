import * as React from 'react';
import cn from 'clsx';

import styles from './alertComponent.module.scss';

export enum AlertType {
    success = 'success',
    error = 'error',
}

interface ComponentProperties {
    color: AlertType;
    leadingIcon?: JSX.Element;
    trailingIcon?: JSX.Element;
    header: string;
    message: string | JSX.Element;
    className?: string;
}

export const AlertComponent: React.FC<ComponentProperties> = ({
    color,
    leadingIcon,
    trailingIcon,
    header,
    message,
    className,
}) => {
    const wrapperClass = cn({
        [styles.success]: color === 'success',
        [styles.error]: color === 'error',
    });

    return (
        <div className={`${className} ${wrapperClass}`}>
            {leadingIcon && <div className={styles.leadingIcon}>{leadingIcon}</div>}
            <div className={styles.content}>
                <div className={styles.header}>{header}</div>
                <div className={styles.message}>{message}</div>
            </div>
            {trailingIcon && <div className={styles.trailingIcon}>{trailingIcon}</div>}
        </div>
    );
};

AlertComponent.displayName = 'AlertComponent';
