import sgMail from '@sendgrid/mail';

interface SendEmailProps {
    from: string;
    text: string;
}

export const sendEmail = async ({ from, text }: SendEmailProps) => {
    if (!process.env.NEXT_PUBLIC_SENDGRID_API_KEY || !process.env.NEXT_PUBLIC_SENDGRID_EMAIL) {
        return null;
    }

    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

    const msg = {
        to: process.env.NEXT_PUBLIC_SENDGRID_EMAIL,
        from,
        subject: 'Art Enquiry',
        text,
    };

    try {
        await sgMail.send(msg).then((res) => {
            return res[0].body;
        });
    } catch (error) {
        return error;
    }
};
