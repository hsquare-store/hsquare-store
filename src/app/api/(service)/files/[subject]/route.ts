import { NextRequest, NextResponse } from "next/server";
import { getFile } from "@/utils/files";
import { getUser } from "@/utils/user";

type Params = {
    subject: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
    const sub = Number(context.params.subject)
    const id = request.cookies.get("user")?.value;

    const { data: userData, error: userError } = await getUser(id as string)

    if (userError) {
        return NextResponse.json({ error: "Error in getting user data." }, { status: 400 });
    }

    const { data: unitData, error: unitError } = await getFile(userData?.course, userData?.semester, userData?.subjects[sub].name)

    if (unitError) {
        return NextResponse.json({ error: "Error in getting subjects unit." }, { status: 400 })
    }

    return NextResponse.json({ data: unitData }, { status: 200 })
}