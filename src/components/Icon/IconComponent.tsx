import { lazy, Suspense, SVGProps, useMemo } from 'react';

export enum Icons {
    hamburger = 'hamburger',
}

interface ComponentProps {
    name: keyof typeof Icons;
}

export const IconComponent = ({ name, ...rest }: ComponentProps & SVGProps<SVGSVGElement>) => {
    const DynamicIcon = useMemo(() => {
        return lazy(async () => {
            const iconModule = await import(`./icons/${Icons[name]}.svg`);

            const Component = iconModule.ReactComponent || iconModule.default;

            return { default: Component };
        });
    }, [name]);

    return (
        <Suspense fallback={null}>
            <DynamicIcon data-testid="iconComponent" {...rest} />
        </Suspense>
    );
};

IconComponent.displayName = 'IconComponent';
