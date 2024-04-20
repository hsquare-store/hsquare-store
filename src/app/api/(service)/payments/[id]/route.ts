
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/utils/user";

type Params = {
    id: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
    try {
        const subject = context.params.id;
        const id = request.cookies.get("user")?.value;

        const { data: userData, error: userError } = await getUser(id as string)

        if (userError) {
            return NextResponse.json({ error: "Error in getting user data." }, { status: 400 });
        }

        return NextResponse.json({ data: userData?.subjects[Number(subject)] }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}