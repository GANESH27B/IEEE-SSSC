import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

// GET all gallery items
export async function GET() {
    try {
        await dbConnect();
        const galleries = await Gallery.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: galleries });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch galleries' }, { status: 500 });
    }
}

// POST new gallery item
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const gallery = await Gallery.create(body);
        return NextResponse.json({ success: true, data: gallery }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create gallery item' }, { status: 400 });
    }
}
