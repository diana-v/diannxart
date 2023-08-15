import { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY ?? '');

    const body = JSON.parse(req.body);

    console.log({
        to: `${body.to}`,
        from: `${body.to}`,
        subject: `${body.subject}`,
        text: `${body.text}`,
    });

    try {
        await sendgrid.send({
            to: `${body.to}`,
            from: `${body.from}`,
            subject: `${body.subject}`,
            text: `${body.text}`,
        });

        console.log(res);

        return res.status(200).send('Email sent successfully');
    } catch (error) {
        console.log(error);

        return res.status(500).send('Error sending email');
    }
};
