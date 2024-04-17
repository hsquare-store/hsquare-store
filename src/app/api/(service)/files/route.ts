
import { NextRequest, NextResponse } from "next/server";
import { insertFile } from "@/utils/files";

export async function POST(request: NextRequest) {
    const body: any = await request.formData();
    const { data, error } = await insertFile(
        body.get("file"),
        body.get("name"),
        body.get("course"),
        body.get("semester"),
        body.get("subject")
    );
    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
}
