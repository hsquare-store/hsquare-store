import { NextRequest, NextResponse } from "next/server";
import { getFile } from "@/utils/files";
import { getUser } from "@/utils/user";

type Params = {
    id: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
    const sub = context.params.id
    const id = request.cookies.get("user")?.value;
    if (id == "" || id == undefined || id == null) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await getFile(sub);
    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    if (data == null) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const { data: userData, error: userError } = await getUser(id);
    if (userError) {
        return NextResponse.json({ error: userError }, { status: 500 });
    }
    if (userData == null) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    for (const i in userData.subjects) {
        if (userData.subjects[i].name == data.subject && userData.subjects[i].paid == true) {
            return NextResponse.redirect(data.url);
        }
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}