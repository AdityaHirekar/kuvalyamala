
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        hasKey: !!process.env.HUGGINGFACE_API_KEY,
        keyLength: process.env.HUGGINGFACE_API_KEY ? process.env.HUGGINGFACE_API_KEY.length : 0,
        env: process.env.NODE_ENV
    });
}
