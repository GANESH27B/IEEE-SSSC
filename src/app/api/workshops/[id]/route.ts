import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Workshop from '@/models/Workshop';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const body = await request.json();
        const workshop = await Workshop.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!workshop) {
            return NextResponse.json({ success: false, error: 'Workshop not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: workshop });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update workshop' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const workshop = await Workshop.findByIdAndDelete(id);

        if (!workshop) {
            return NextResponse.json({ success: false, error: 'Workshop not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete workshop' }, { status: 500 });
    }
}
