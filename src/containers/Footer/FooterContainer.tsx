import * as React from 'react';

export const FooterContainer = () => (
    <div className="text-center py-8 text-xl">
        © Copyright {new Date().getFullYear()} diann x art
        <span aria-label="Love" className="text-error ml-1" role="img">
            ♥
        </span>
    </div>
);
