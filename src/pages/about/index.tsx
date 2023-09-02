import * as React from 'react';

import styles from './about.module.scss';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';

const About: React.FC = () => {
    return (
        <DefaultLayout
            title="About | DiannXArt"
            description="Whether it's a personalized portrait, a reinterpretation
                        of a masterpiece, or a unique creation inspired by your ideas, we can turn your imagination into
                        a reality."
        >
            <div className="container flex flex-col mx-auto px-4 py-3 gap-8 flex-grow max-w-5xl">
                <h1 className={styles.title}>About</h1>
                <article className="flex flex-col gap-4 text-xl md:text-2xl">
                    <p>
                        Art has the power to transform your surroundings into a haven of beauty, and spark inspiration.
                        Whether you're looking to infuse your living room with an air of elegance, create a soothing
                        atmosphere in your bedroom, or add a splash of creativity to your office, our paintings are the
                        perfect complement to your vision.
                    </p>
                    <p>
                        Can't find the exact piece you're envisioning? Please get in touch to get your custom commission
                        and bring your artistic dreams to life. Whether it's a personalized portrait, a reinterpretation
                        of a masterpiece, or a unique creation inspired by your ideas, we can turn your imagination into
                        a reality.
                    </p>
                </article>
            </div>
        </DefaultLayout>
    );
};

export default About;
