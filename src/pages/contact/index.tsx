import * as React from 'react';
import * as Yup from 'yup';
import cn from 'clsx';
import { Formik, Field, Form, FormikHelpers } from 'formik';

import styles from './contact.module.scss';
import { DefaultLayout } from '@/layouts/DefaultLayout/DefaultLayout';
import { sendEmail } from '@/lib/sendgrid';
import { AlertComponent, AlertType } from '@/components/Alert/AlertComponent';
import { IconComponent } from '@/components/Icon/IconComponent';

interface Values {
    from: string;
    text: string;
}

const Contact: React.FC = () => {
    const [alert, setAlert] = React.useState({ message: '', type: '' as AlertType });

    const clearAlert = React.useCallback(() => {
        setAlert({ message: '', type: 'success' });
    }, []);

    const initialValues = { from: '', text: '' };
    const contactSchema = Yup.object().shape({
        from: Yup.string().email('Invalid email').required('Required'),
        text: Yup.string().min(2, 'Too Short!').max(900, 'Too Long!').required('Required'),
    });

    const handleSubmit = React.useCallback(async ({ from, text }: Values, { resetForm }: FormikHelpers<Values>) => {
        await sendEmail({ from, text })
            .then(() => {
                setAlert({
                    message: 'Your enquiry has been successfully sent',
                    type: AlertType.Success,
                });
                setTimeout(() => {
                    setAlert({ message: '', type: '' });
                }, 5000);

                resetForm();

                return;
            })
            .catch((error) => {
                setTimeout(() => {
                    setAlert({
                        message: 'An error has occurred, please try again later',
                        type: AlertType.Error,
                    });
                }, 5000);
                setAlert({ message: '', type: '' });

                return;
            });
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
                            {alert.message && (
                                <AlertComponent
                                    message={alert.message}
                                    color={alert.type}
                                    header={alert.type}
                                    leadingIcon={<IconComponent name={alert.type} />}
                                    trailingIcon={
                                        <IconComponent name="cross" className="text-grey-500" onClick={clearAlert} />
                                    }
                                />
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    );
};

export default Contact;
