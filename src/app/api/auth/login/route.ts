import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { email, password } = await request.json();

        // Find member by email
        const member = await Member.findOne({ email, isActive: true });

        if (!member) {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }

        // Check password (in production, use bcrypt.compare)
        if (member.password !== password) {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }

        // Return member data without password
        const memberData = {
            _id: member._id,
            name: member.name,
            email: member.email,
            role: member.role,
            department: member.department,
            year: member.year,
        };

        return NextResponse.json({ success: true, data: memberData });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
    }
}
