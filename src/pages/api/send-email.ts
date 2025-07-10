import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const resend = new Resend(process.env.RESEND_API_KEY ?? '');

    const body = JSON.parse(req.body);

    try {
        await resend.emails.send({
            from: `${process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL}`,
            to: `${process.env.NEXT_PUBLIC_RESEND_TO_EMAIL}`,
            subject: `${body.subject}`,
            html: `<p>${body.text}</p>`,
        });

        return res.status(200).send('Email sent successfully');
    } catch {
        return res.status(500).send('Error sending email');
    }
};
