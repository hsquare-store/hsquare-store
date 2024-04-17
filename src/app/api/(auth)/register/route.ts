
import { NextRequest, NextResponse } from "next/server";
import { createUser, setupUser } from "@/utils/user";

export async function POST(request: NextRequest) {
    const { name, email, phone, password } = await request.json();
    const { data, error } = await createUser({ name, email, phone, password });
    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    const res = NextResponse.json(data, { status: 201 });
    res.cookies.set("user", data!.id, { httpOnly: true });
    return res
}

export async function PATCH(request: NextRequest) {
    const { course, semester, sub_1, sub_2, sub_3 } = await request.json();
    const id = request.cookies.get("user");
    const { data, error } = await setupUser({
        "id": id?.value as string,
        "course": course,
        "semester": semester,
        "sub_1": {
            "name": sub_1,
            "paid": false
        },
        "sub_2": {
            "name": sub_2,
            "paid": false
        },
        "sub_3": {
            "name": sub_3,
            "paid": false
        }
    });
    if (error) {
        return NextResponse.json({ error }, { status: 500 });
    };
    const res = NextResponse.json(data, { status: 200 });
    res.cookies.set("setup", "done")
    return res

};