import { db } from "./db";
import { v4 as getUUID } from 'uuid';

const uploadFile = async (resume: File) => {
    try {
        const name = getUUID();
        const { data: uploadData, error } = await db.storage.from("files").upload(`${name}`, resume);
        if (error) {
            console.error(error);
            return { success: false, error: error?.message };
        }
        const { data: getUrlData } = db.storage.from("files").getPublicUrl(uploadData.path);
        return { success: true, url: getUrlData.publicUrl };
    } catch (error: any) {
        console.log('Error in uploading resume', error);
        return { success: false, error: error as string };
    }
}

export const insertPayment = async (file: File, user: string, course: string, semester: string, subject: string) => {
    const { success, url } = await uploadFile(file);
    if (!success) {
        return { success: false, error: url };
    }
    const { data, error } = await db.from('payments').insert({ user, course, semester, subject, url});
    if (error) {
        return { success: false, error: error.message };
    }
    return { success: true, data: url };
}

// export const getFiles = async (course: string, semester: string, subject: string) => {
//     const { data, error } = await db.from('files').select().eq('course', course).eq('semester', semester).eq('subject', subject);
//     if (error) {
//         return { success: false, error: error.message };
//     }
//     return { success: true, data };
// }

// export const getFile = async (course: string, semester: string, subject: string) => {
//     const { data, error } = await db.from('files').select().eq('course', course).eq('semester', semester).eq('subject', subject);
//     if (error) {
//         return { success: false, error: error.message };
//     }
//     return {
//         success: true, data
//     };
// }