import * as React from 'react';
import * as Yup from 'yup';
import cn from 'clsx';
import { Formik, Field, Form } from 'formik';
import { createClient } from 'next-sanity';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import styles from './contact.module.scss';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { sendEmail } from '@/lib/sendgrid';

interface Values {
    from: string;
    text: string;
}

interface PageProps {
    posts: string[];
}

const Contact: React.FC<PageProps> = ({ posts }) => {
    const { query } = useRouter();
    const initialValues = { from: '', artwork: query.title, text: '' };
    const contactSchema = Yup.object().shape({
        from: Yup.string().email('Invalid email').required('Required'),
        artwork: Yup.string().oneOf(posts),
        text: Yup.string().min(2, 'Too Short!').max(900, 'Too Long!').required('Required'),
    });

    const handleSubmit = React.useCallback(async ({ from, text }: Values) => {
        await sendEmail({ from, text });
    }, []);

    return (
        <DefaultLayout>
            <div className="container flex flex-col mx-auto px-4 py-3 gap-8 flex-grow max-w-5xl">
                <h1 className={styles.title}>Contact</h1>
                <Formik initialValues={initialValues} validationSchema={contactSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, dirty, touched, errors }) => (
                        <Form className={styles.form}>
                            <div className={styles.question}>
                                <label className={styles.label} htmlFor="from">
                                    Email:
                                </label>
                                <div>
                                    <Field
                                        className={cn(styles.field, { [styles.error]: errors.from })}
                                        id="from"
                                        name="from"
                                        placeholder="email@email.com"
                                        disabled={isSubmitting}
                                    />
                                    {errors.from && touched.from && <div className="text-red-700">{errors.from}</div>}
                                </div>
                            </div>
                            <div className={styles.question}>
                                <label className={styles.label} htmlFor="text">
                                    Artwork:
                                </label>
                                <div>
                                    <Field
                                        className={cn(styles.field, { [styles.error]: errors.text })}
                                        component="select"
                                        id="artwork"
                                        name="artwork"
                                    >
                                        <option value="">General query</option>
                                        {posts.map((post) => (
                                            <option key={post} value={post}>
                                                {post}
                                            </option>
                                        ))}
                                    </Field>
                                    {errors.artwork && touched.artwork && (
                                        <div className="text-red-700">{errors.artwork}</div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.question}>
                                <label className={styles.label} htmlFor="text">
                                    Enquiry:
                                </label>
                                <div>
                                    <Field
                                        className={cn(styles.field, { [styles.error]: errors.text })}
                                        id="text"
                                        name="text"
                                        component="textarea"
                                        rows="6"
                                        placeholder="Please write your enquiry here..."
                                        disabled={isSubmitting}
                                    />
                                    {errors.text && touched.text && <div className="text-red-700">{errors.text}</div>}
                                </div>
                            </div>

                            <button className={styles.submitButton} type="submit" disabled={isSubmitting || !dirty}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    );
};

const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    useCdn: false,
});

export const getServerSideProps: GetServerSideProps = async () => {
    const posts = await client.fetch(`*[_type == 'post'][].title`);

    return {
        props: {
            posts,
        },
    };
};

export default Contact;
