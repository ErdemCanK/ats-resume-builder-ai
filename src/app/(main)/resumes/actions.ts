"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { error: "User not authenticated" };
        }

        const resume = await prisma.resume.findUnique({
            where: {
                id,
                userId,
            },
        });

        if (!resume) {
            return { error: "Resume not found" };
        }

        if (resume.photoUrl) {
            await del(resume.photoUrl);
        }

        await prisma.resume.delete({
            where: {
                id,
            },
        });

        revalidatePath("/resumes");

        return { success: "Resume deleted successfully" };
    } catch (error) {
        console.error(error);
        return { error: "An error occurred while deleting the resume" };
    }
}
