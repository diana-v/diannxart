import * as React from 'react';

/**
 * @enum
 */
enum Icons {
    hamburger = 'hamburger',
    cross = 'cross',
    error = 'error',
    success = 'success',
}

interface ComponentProps {
    name: keyof typeof Icons;
}

export const IconComponent: React.FC<ComponentProps & React.SVGProps<SVGSVGElement>> = ({ name, ...rest }) => {
    const ImportedIconRef = React.useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
    const [loading, setLoading] = React.useState(true);

    const importIcon = React.useCallback(async () => {
        try {
            const importedIcon = await import(`./icons/${Icons[name]}.svg`);

            ImportedIconRef.current = importedIcon.ReactComponent;
        } finally {
            setLoading(false);
        }
    }, [name]);

    React.useEffect(() => {
        setLoading(true);

        importIcon();

        return () => {
            setLoading(false);
        };
    }, [importIcon, name]);

    if (!loading && ImportedIconRef.current) {
        const { current: ImportedIcon } = ImportedIconRef;

        return <ImportedIcon {...rest} />;
    }

    return null;
};

IconComponent.displayName = 'IconComponent';
