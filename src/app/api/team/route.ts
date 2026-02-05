import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

// GET all team members
export async function GET() {
    try {
        await dbConnect();
        const members = await TeamMember.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: members });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch team members' }, { status: 500 });
    }
}

// POST new team member
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const member = await TeamMember.create(body);
        return NextResponse.json({ success: true, data: member }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 400 });
    }
}
