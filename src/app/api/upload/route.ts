import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        // Check file size (limit to 5MB for database storage)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ success: false, error: 'File too large. Maximum 5MB allowed.' }, { status: 400 });
        }

        // Convert file to base64 data URL (can be stored directly in MongoDB)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Return the base64 data URL - this can be stored in MongoDB and used as image src
        return NextResponse.json({
            success: true,
            url: dataUrl
        }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
    }
}
