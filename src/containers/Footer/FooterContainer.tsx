import * as React from 'react';

export const FooterContainer: React.FC = () => (
    <div className="text-center py-8 text-sm shadow-lg bg-white">
        © Copyright {new Date().getFullYear()} diann x art
        <span role="img" aria-label="Love" className="text-error ml-1">
            ♥
        </span>
    </div>
);
