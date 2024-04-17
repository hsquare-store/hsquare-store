import { getQueries, deleteQuery, insertQuery, updateStatus } from "@/utils/query"
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {

        const response = await getQueries()
        if (!response.success) {
            return Response.json({ error: response.error }, { status: 400 })
        } else {
            return Response.json({ data: response.data }, { status: 200 })
        }

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json()
        const response = await insertQuery({
            name: body.name,
            email: body.email,
            phone: body.phone,
            query: body.query
        })
        if (!response.success) {
            return Response.json({ error: response.error }, { status: 400 })
        } else {
            return Response.json({ data: response.data }, { status: 201 })

        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json()
        const response = await deleteQuery(body.id)
        if (!response.success) {
            return Response.json({ error: response.error }, { status: 400 })
        } else {
            return Response.json({ message: "Query deleted successfully" }, { status: 200 })

        }
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const response = await updateStatus(body.id, body.status)
        if (!response.success) {
            return Response.json({ error: response.error }, { status: 400 })
        } else {
            return Response.json({ message: "Status updated successfully" }, { status: 200 })

        }
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}