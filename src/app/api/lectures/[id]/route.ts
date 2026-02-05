import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lecture from '@/models/Lecture';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const body = await request.json();
        const lecture = await Lecture.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!lecture) {
            return NextResponse.json({ success: false, error: 'Lecture not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: lecture });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update lecture' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const lecture = await Lecture.findByIdAndDelete(id);

        if (!lecture) {
            return NextResponse.json({ success: false, error: 'Lecture not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete lecture' }, { status: 500 });
    }
}
