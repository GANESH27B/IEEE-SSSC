import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Session from '@/models/Session';

export async function GET() {
    try {
        await dbConnect();
        const sessions = await Session.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: sessions });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch sessions' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const session = await Session.create(body);
        return NextResponse.json({ success: true, data: session }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create session' }, { status: 500 });
    }
}
