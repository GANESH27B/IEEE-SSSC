import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

// GET single gallery item
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            return NextResponse.json({ success: false, error: 'Gallery not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: gallery });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 });
    }
}

// PUT update gallery item
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const body = await request.json();
        const gallery = await Gallery.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!gallery) {
            return NextResponse.json({ success: false, error: 'Gallery not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: gallery });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update gallery' }, { status: 400 });
    }
}

// DELETE gallery item
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const gallery = await Gallery.findByIdAndDelete(id);
        if (!gallery) {
            return NextResponse.json({ success: false, error: 'Gallery not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete gallery' }, { status: 500 });
    }
}
