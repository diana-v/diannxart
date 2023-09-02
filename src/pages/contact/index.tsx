import * as React from 'react';
import * as Yup from 'yup';
import cn from 'clsx';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { createClient } from 'next-sanity';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import styles from './contact.module.scss';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { AlertComponent, AlertType } from '@/components/Alert/AlertComponent';

interface Values {
    from: string;
    subject: string;
    message: string;
}

interface IAlert {
    message: string;
    type: AlertType;
}

interface PageProps {
    posts: string[];
}

const Contact: React.FC<PageProps> = ({ posts }) => {
    const { query } = useRouter();
    const [alert, setAlert] = React.useState<IAlert>({ message: '', type: AlertType.Success });
    const initialValues: Values = { from: '', subject: query.title?.toString() ?? 'General query', message: '' };
    const contactSchema = Yup.object().shape({
        from: Yup.string().email('Invalid email').required('Required'),
        subject: Yup.string().oneOf([...posts, 'General query']),
        message: Yup.string().min(2, 'Too Short!').max(900, 'Too Long!').required('Required'),
    });

    const handleSubmit = React.useCallback(
        async ({ from, subject, message }: Values, { resetForm }: FormikHelpers<Values>) => {
            await fetch('/api/send-email', {
                body: JSON.stringify({
                    to: process.env.NEXT_PUBLIC_SENDGRID_EMAIL,
                    from: process.env.NEXT_PUBLIC_SENDGRID_EMAIL,
                    subject,
                    text: `${from} ${message}`,
                }),
                method: 'POST',
            }).then((res) => {
                if (res.status === 500) {
                    setAlert({
                        message: 'Ooops, something went wrong... Please try again later',
                        type: AlertType.Error,
                    });
                }

                if (res.status === 200) {
                    setAlert({ message: 'Your enquiry has been sent!', type: AlertType.Success });
                }

                return setTimeout(() => {
                    resetForm();
                    setAlert({ message: '', type: AlertType.Success });
                }, 5000);
            });
        },
        []
    );

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
                                <label className={styles.label} htmlFor="subject">
                                    Artwork:
                                </label>
                                <div>
                                    <Field
                                        className={cn(styles.field, { [styles.error]: errors.subject })}
                                        component="select"
                                        id="subject"
                                        name="subject"
                                    >
                                        <option value="General query">General query</option>
                                        {posts.map((post) => (
                                            <option key={post} value={post}>
                                                {post}
                                            </option>
                                        ))}
                                    </Field>
                                    {errors.subject && touched.subject && (
                                        <div className="text-red-700">{errors.subject}</div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.question}>
                                <label className={styles.label} htmlFor="message">
                                    Enquiry:
                                </label>
                                <div>
                                    <Field
                                        className={cn(styles.field, { [styles.error]: errors.message })}
                                        id="message"
                                        name="message"
                                        component="textarea"
                                        rows="6"
                                        placeholder="Please write your enquiry here..."
                                        disabled={isSubmitting}
                                    />
                                    {errors.message && touched.message && (
                                        <div className="text-red-700">{errors.message}</div>
                                    )}
                                </div>
                            </div>

                            <button
                                className={styles.submitButton}
                                type="submit"
                                disabled={isSubmitting || !dirty}
                                aria-label="Submit form"
                            >
                                Submit
                            </button>
                            {alert.message && <AlertComponent color={alert.type} message={alert.message} />}
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
    const posts = await client.fetch(`*[_type == 'post' && sold != true][].title`);

    return {
        props: {
            posts,
        },
    };
};

export default Contact;
