import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

// GET single member
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const member = await Member.findById(id).select('-password');
        if (!member) {
            return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: member });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch member' }, { status: 500 });
    }
}

// PUT update member
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const body = await request.json();

        // Don't allow password update through this endpoint
        delete body.password;

        const member = await Member.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!member) {
            return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: member });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update member' }, { status: 400 });
    }
}

// DELETE member
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const member = await Member.findByIdAndDelete(id);
        if (!member) {
            return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete member' }, { status: 500 });
    }
}
