import React from 'react';

export const IconComponent: React.FC<{ name: string }> = ({ name }) => {
    return <div data-testid={`icon-${name}`} />;
};
