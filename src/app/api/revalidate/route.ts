import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const POST_TAGS = ['posts', 'post', 'unsoldPosts'];

export async function POST(request: NextRequest) {
    try {
        const { isValidSignature } = await parseBody(request, process.env.SANITY_REVALIDATE_SECRET);

        if (!isValidSignature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        for (const tag of POST_TAGS) revalidateTag(tag, { expire: 0 });

        return NextResponse.json({ revalidated: POST_TAGS }, { status: 200 });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Revalidate error:', error);

        return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
    }
}
