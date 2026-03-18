import cn from 'clsx';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { GetServerSideProps } from 'next';
import { createClient } from 'next-sanity';
import { useRouter } from 'next/router';
import * as React from 'react';
import * as Yup from 'yup';

import { AlertComponent, AlertType } from '@/components/Alert/AlertComponent';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { languages, LocaleType } from '@/translations/common';

interface IAlert {
    message: string;
    type: AlertType;
}

interface PageProps {
    posts: string[];
}

interface Values {
    from: string;
    message: string;
    subject: string;
}

const Contact = ({ posts }: PageProps) => {
    const { defaultLocale, locale, query } = useRouter();
    const localisedString = languages[(locale ?? defaultLocale) as LocaleType];
    const [alert, setAlert] = React.useState<IAlert>({ message: '', type: AlertType.Success });
    const initialValues: Values = { from: '', message: '', subject: query.title?.toString() ?? 'General query' };
    const contactSchema = Yup.object().shape({
        from: Yup.string().email(localisedString.contact.emailError).required(localisedString.contact.required),
        message: Yup.string()
            .min(2, localisedString.contact.errorTooShort)
            .max(900, localisedString.contact.errorTooLong)
            .required(localisedString.contact.required),
        subject: Yup.string().oneOf([...posts, 'General query']),
    });

    const handleSubmit = React.useCallback(
        async ({ from, message, subject }: Values, { resetForm }: FormikHelpers<Values>) => {
            await fetch('/api/send-email', {
                body: JSON.stringify({
                    subject,
                    text: `${from} ${message}`,
                }),
                method: 'POST',
            }).then((res) => {
                if (res.status === 500) {
                    setAlert({
                        message: localisedString.contact.errorMessage,
                        type: AlertType.Error,
                    });
                }

                if (res.status === 200) {
                    setAlert({ message: localisedString.contact.successMessage, type: AlertType.Success });
                }

                return setTimeout(() => {
                    resetForm();
                    setAlert({ message: '', type: AlertType.Success });
                }, 5000);
            });
        },
        [localisedString.contact.errorMessage, localisedString.contact.successMessage]
    );

    return (
        <DefaultLayout description={localisedString.contact.seoDescription} title={localisedString.contact.seoTitle}>
            <div className="container flex flex-col mx-auto px-4 py-3 gap-8 flex-grow max-w-5xl">
                <h1 className='uppercase text-5xl md:text-7xl font-serif font-thin text-center transition-[font-size] ease-in duration-500'>{localisedString.contact.title}</h1>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={contactSchema}>
                    {({ dirty, errors, isSubmitting, touched }) => (
                        <Form className="flex flex-col flex-grow gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xl md:text-2xl" htmlFor="from">
                                    {localisedString.contact.email}
                                </label>
                                <div>
                                    <Field
                                        className={cn("rounded border w-full p-2 bg-transparent text-lg md:text-xl disabled:text-grey-300 disabled:border-grey-100 disabled:cursor-not-allowed", { "text-red-700 border-red-400": errors.from })}
                                        disabled={isSubmitting}
                                        id="from"
                                        name="from"
                                        placeholder={localisedString.contact.emailPlaceholder}
                                    />
                                    {errors.from && touched.from && <div className="text-red-700">{errors.from}</div>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xl md:text-2xl" htmlFor="subject">
                                    {localisedString.contact.artwork}
                                </label>
                                <div>
                                    <Field
                                        className={cn("rounded border w-full p-2 bg-transparent text-lg md:text-xl disabled:text-grey-300 disabled:border-grey-100 disabled:cursor-not-allowed", { 'text-red-700 border-red-400': errors.subject })}
                                        component="select"
                                        id="subject"
                                        name="subject"
                                    >
                                        <option value="General query">{localisedString.contact.generalQuery}</option>
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
                            <div className="flex flex-col gap-2">
                                <label className="text-xl md:text-2xl" htmlFor="message">
                                    {localisedString.contact.enquiry}
                                </label>
                                <div>
                                    <Field
                                        className={cn("rounded border w-full p-2 bg-transparent text-lg md:text-xl disabled:text-grey-300 disabled:border-grey-100 disabled:cursor-not-allowed", { "text-red-700 border-red-400": errors.message })}
                                        component="textarea"
                                        disabled={isSubmitting}
                                        id="message"
                                        name="message"
                                        placeholder={localisedString.contact.messagePlaceholder}
                                        rows="6"
                                    />
                                    {errors.message && touched.message && (
                                        <div className="text-red-700">{errors.message}</div>
                                    )}
                                </div>
                            </div>

                            <button
                                aria-label={localisedString.contact.submit}
                                className="px-4 py-2 w-full rounded-md shadow-lg border border-black bg-black cursor-pointer text-xl md:text-2xl text-white uppercase font-bold tracking-wider disabled:text-grey-300 disabled:bg-grey-50 disabled:border-grey-100 disabled:cursor-not-allowed"
                                disabled={isSubmitting || !dirty}
                                type="submit"
                            >
                                {localisedString.contact.submit}
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
    apiVersion: process.env.SANITY_STUDIO_API_VERSION,
    dataset: process.env.SANITY_STUDIO_DATASET,
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    useCdn: false,
});

export const getServerSideProps: GetServerSideProps = async ({ defaultLocale, locale }) => {
    const posts = await client.fetch(
        `*[_type == 'post' && sold != true]{
          "title": coalesce(title[$locale], title[$defaultLocale])
        }[].title`,
        { defaultLocale, locale }
    );

    return {
        props: {
            posts,
        },
    };
};

export default Contact;
