
import { NextRequest, NextResponse } from "next/server";
import { insertPayment } from "@/utils/payments";

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: "GET payments" });
}

export async function POST(request: NextRequest) {
    const body: any = await request.formData();
    const { data, error } = await insertPayment(
        body.get("file"),
        body.get("user"),
        body.get("course"),
        body.get("semester"),
        body.get("subject")
    );
    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
}
