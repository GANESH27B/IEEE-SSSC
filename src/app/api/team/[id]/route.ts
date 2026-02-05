import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

// GET single team member
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const member = await TeamMember.findById(id);
        if (!member) {
            return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: member });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch team member' }, { status: 500 });
    }
}

// PUT update team member
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const body = await request.json();
        const member = await TeamMember.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!member) {
            return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: member });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update team member' }, { status: 400 });
    }
}

// DELETE team member
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const member = await TeamMember.findByIdAndDelete(id);
        if (!member) {
            return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete team member' }, { status: 500 });
    }
}
