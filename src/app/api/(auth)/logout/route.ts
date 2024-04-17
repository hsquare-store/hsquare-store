import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const res = NextResponse.json({success: true}, {status: 200});
    res.cookies.delete("user");
    res.cookies.delete("setup");
    return res;
}