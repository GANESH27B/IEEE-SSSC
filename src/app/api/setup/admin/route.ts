import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';

// This endpoint creates the initial admin account
// Only run this once to set up your first admin
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        // Check if admin already exists
        const existingAdmin = await Member.findOne({ email: 'admin@ieee.org' });

        if (existingAdmin) {
            return NextResponse.json({
                success: false,
                error: 'Admin account already exists'
            }, { status: 400 });
        }

        // Create admin account
        const admin = await Member.create({
            name: 'Admin User',
            email: 'admin@ieee.org',
            password: 'admin123', // In production, this should be hashed
            role: 'admin',
            department: 'Administration',
            year: 'Staff',
            isActive: true
        });

        return NextResponse.json({
            success: true,
            message: 'Admin account created successfully',
            data: {
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        }, { status: 201 });
    } catch (error) {
        console.error('Setup error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to create admin account'
        }, { status: 500 });
    }
}
