import { connectDB } from "@/app/lib/config/db";
import EmailModel from "@/app/lib/models/EmailModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
    await connectDB();
}

loadDB();

export async function POST(request) {
    const formData = await request.formData();
    const email = formData.get('email')
    const emailData = {
        email: email
    }
    await EmailModel.create(emailData)
    return NextResponse.json({ success: true, message: "Email Subscribed" })
}

export async function GET(request) {
    const emails = await EmailModel.find({})
    return NextResponse.json({ emails })
}

export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get("id")
    await EmailModel.findByIdAndDelete(id)
    return NextResponse.json({ success: true, message: "Email deleted" })
}