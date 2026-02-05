import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();

        const contact = await Contact.create(data);

        return NextResponse.json({ success: true, data: contact });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: contacts });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
