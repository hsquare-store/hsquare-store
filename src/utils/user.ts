import { db } from "./db";
import { hash, compare } from "bcrypt";
import { getFiles } from "./files";

export const createUser = async ({ name, email, phone, password }: { name: string, email: string, phone: string, password: string }) => {
    const hashedPassword = await hash(password, 10)
    const { error: insertError } = await db.from('users').insert({ name, email, phone, hashedPassword })
    if (insertError) {
        if (insertError.message === 'duplicate key value violates unique constraint "users_email_key"') {
            return { success: false, error: "Email already exists..." };
        } else if (insertError.message === 'duplicate key value violates unique constraint "users_phone_key"') {
            return { success: false, error: "Phone number already exists..." };
        } else {
            return { success: false, error: insertError.message };
        };
    }
    const { data: fetchData, error: fetchError } = await db.from('users').select().eq('email', email).single();
    if (fetchError) {
        return { success: false, error: fetchError.message };
    }
    return {
        success: true, data: {
            id: fetchData.id,
            username: fetchData.name,
            useremail: fetchData.email
    } };
}

export const setupUser = async ({ id, course, semester, sub_1, sub_2, sub_3 }: { id: string, course: string, semester: string, sub_1: object, sub_2: object, sub_3: object }) => {
    const { error: setupError } = await db.from("users").update({ course, semester, sub_1, sub_2, sub_3, setup: 1 }).eq('id', id);
    if (setupError) {
        return { success: false, error: setupError.message };
    }
    return { success: true, data: true };
}

export const verifyUser = async ({ email, password }: { email: string, password: string }) => {
    const { data, error } = await db.from('users').select().eq('email', email).single();
    if (error) {
        return { success: false, error: error.message };
    }
    if (!data) {
        return { success: false, error: "User not found..." };
    }
    const isPasswordCorrect = await compare(password, data.hashedPassword);
    if (!isPasswordCorrect) {
        return { success: false, error: "Invalid password..." };
    }
    return { success: true, data: {id: data.id, username: data.name, useremail: data.email} };
}

export const getUser = async (id: string) => {
    const { data, error } = await db.from('users').select().eq('id', id).single();
    if (error) {
        return { success: false, error: error.message };
    }
    if (!data) {
        return { success: false, error: "User not found..." };
    }
    return {
        success: true, data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            course: data.course,
            semester: data.semester,
            subjects: [data.sub_1, data.sub_2, data.sub_3]
        }
    };
}

export const getCourse = async (id: string, sub: string) => {
    const { data, error } = await getUser(id)
    if (error) {
        return { success: false, error: error };
    }
    if (!data) {
        return { success: false, error: "User not found..." };
    }
    for (const i in data.subjects) {
        if (data.subjects[i].name == sub) {
            return { success: true, data: await getFiles(data.course, data.semester, sub) };
        }
    }
    return { success: false, error: "Subject not found..." };
}
