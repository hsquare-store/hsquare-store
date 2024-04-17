import { NextRequest, NextResponse } from "next/server";
import { getCourse } from "@/utils/user";

type Params = {
    sub: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
    const sub = context.params.sub
    const id = request.cookies.get("user")?.value;
    if (id == "" || id == undefined || id == null) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data, error } = await getCourse(id as string, sub);
    console.log(data)
    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
}