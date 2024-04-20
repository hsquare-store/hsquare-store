import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/utils/user";

export async function GET(request: NextRequest) {
    try {
        const id = request.cookies.get("user")?.value;
        if (id == "" || id == undefined || id == null) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { data, error } = await getUser(id as string);
        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}