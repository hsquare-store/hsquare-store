import { NextRequest, NextResponse } from "next/server";
import { getFile } from "@/utils/files";
import { getUser } from "@/utils/user";

type Params = {
    subject: string;
    unit: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
    const sub = Number(context.params.subject)
    const unit = Number(context.params.unit)
    const id = request.cookies.get("user")?.value;

    const { data: userData, error: userError } = await getUser(id as string)

    if (userError) {
        return NextResponse.json({ error: "Error in getting user data." }, { status: 400 });
    }

    const { data: unitData, error: unitError } = await getFile(userData?.course, userData?.semester, userData?.subjects[sub].name)

    if (unitError) {
        return NextResponse.json({ error: "Error in getting subjects unit." }, { status: 400 })
    }

    const filteredUnitData = unitData!.filter((data: any) => data.unit === unit);

    if (filteredUnitData.length === 0) {
        return NextResponse.json({ error: "No data found for the specified unit." }, { status: 404 });
    }

    return NextResponse.json({ available: true, data: unitData![0].url }, { status: 200 })
}