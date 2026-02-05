import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

// GET all members (admin only)
export async function GET() {
    try {
        await dbConnect();
        const members = await Member.find({}).select('-password').sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: members });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch members' }, { status: 500 });
    }
}

// POST new member (admin only)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();

        // Check if email already exists
        const existingMember = await Member.findOne({ email: body.email });
        if (existingMember) {
            return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 400 });
        }

        // Create member with plain password (in production, use bcrypt to hash)
        const member = await Member.create(body);

        // Remove password from response
        const memberData = member.toObject();
        delete memberData.password;

        return NextResponse.json({ success: true, data: memberData }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create member' }, { status: 400 });
    }
}
