import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lecture from '@/models/Lecture';

export async function GET() {
    try {
        await dbConnect();
        const lectures = await Lecture.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: lectures });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch lectures' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const lecture = await Lecture.create(body);
        return NextResponse.json({ success: true, data: lecture }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create lecture' }, { status: 500 });
    }
}
