import * as React from 'react';

export const FooterContainer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-center py-8 text-xl">
            <div className="container mx-auto px-4">
                © Copyright {currentYear} diann x art
                <span
                    aria-label="Love"
                    className="text-error ml-1"
                    role="img"
                >
                    ♥
                </span>
            </div>
        </footer>
    );
};
