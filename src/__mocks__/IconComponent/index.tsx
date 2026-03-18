import React from 'react';

export const IconComponent = ({ name }: { name: string }) => {
    return <div data-testid={`icon-${name}`} />;
};
