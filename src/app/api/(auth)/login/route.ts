
import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/utils/user";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    const { data, error } = await verifyUser({ email, password });
    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    const res = NextResponse.json(data, { status: 201 });
    res.cookies.set("user", data?.id, { httpOnly: true });
    if (data?.setup) {
        res.cookies.set("setup", data?.id, { httpOnly: true });
    }
    return res
}