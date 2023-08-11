import { NextApiRequest, NextApiResponse } from 'next';

import { sendEmail } from '@/lib/sendgrid';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { from, text } = req.body;

    try {
        await sendEmail({ from, text });
        res.status(200).json({ message: 'Email sent successfully' });
    } catch {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
