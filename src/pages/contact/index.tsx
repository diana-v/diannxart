import * as React from 'react';
import * as Yup from 'yup';
import cn from 'clsx';
import { Formik, Field, Form } from 'formik';

import styles from './contact.module.scss';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { sendEmail } from '@/lib/sendgrid';

interface Values {
    from: string;
    text: string;
}

const Contact: React.FC = () => {
    const initialValues = { from: '', text: '' };
    const contactSchema = Yup.object().shape({
        from: Yup.string().email('Invalid email').required('Required'),
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

export default Contact;
