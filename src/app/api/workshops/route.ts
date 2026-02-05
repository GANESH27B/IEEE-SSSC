import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Workshop from '@/models/Workshop';

export async function GET() {
    try {
        await dbConnect();
        const workshops = await Workshop.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: workshops });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch workshops' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const workshop = await Workshop.create(body);
        return NextResponse.json({ success: true, data: workshop }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create workshop' }, { status: 500 });
    }
}
