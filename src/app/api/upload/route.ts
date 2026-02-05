import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name.replace(/\s/g, '-')}`;

        // Save to public/uploads directory
        const path = join(process.cwd(), 'public', 'uploads', filename);
        await writeFile(path, buffer);

        // Return the public URL
        const url = `/uploads/${filename}`;

        return NextResponse.json({ success: true, url }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
    }
}
