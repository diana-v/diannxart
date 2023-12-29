import * as React from 'react';

import styles from './about.module.scss';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';

const About: React.FC = () => {
    return (
        <DefaultLayout
            title="About | DiannXArt"
            description="DiannXArt is a personal website of Diana, an artist from Lithuania.
                        Here you can find her artworks and contact information."
        >
            <div className="container flex flex-col mx-auto px-4 py-3 gap-8 flex-grow max-w-5xl">
                <h1 className={styles.title}>About</h1>
                <article className="flex flex-col gap-4 text-xl md:text-2xl">
                    <p>
                        In childhood, I was a very artistic person – weaving, ceramics, and art were my main activities.
                        I delved deeper into art when the opportunity arose to learn painting from Leonas Ernestas
                        Juozonis (a sculptor and artist) in exchange for computer lessons. After moving to the United
                        Kingdom, this activity transformed into pencil drawings of anime. After a decade, upon returning
                        to Lithuania, motivated by loved ones, I rediscovered painting. Currently, it is a cherished
                        hobby that allows me to immerse myself in memories and escape the routine.
                    </p>
                    <p>
                        The inspiration to create, as for many, is love. Although I was not always fascinated by
                        mountains or a starry sky, now it is a common motif in my paintings. When traveling, I strive to
                        be surrounded by the beauty of mountains and nature, finding inspiration for new artworks there.
                    </p>
                </article>
            </div>
        </DefaultLayout>
    );
};

export default About;
