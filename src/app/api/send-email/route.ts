import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY ?? '');

    try {
        const body = await request.json();

        const data = await resend.emails.send({
            from: `${process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL}`,
            html: `<p>${body.text}</p>`,
            subject: `${body.subject}`,
            to: `${process.env.NEXT_PUBLIC_RESEND_TO_EMAIL}`,
        });

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 500 });
        }

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Email error:', error);

        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}
