"use server"

import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type SessionData, formSchema} from "@/lib/schemas";

const sql = neon(process.env.DATABASE_URL!);

export async function createSession(data: SessionData){
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You must be signed in to create a session.");
    }

    const validData = formSchema.parse(data)
    await sql `
        INSERT INTO races (
            clerk_user_id,
            race_type,
            best_lap_time,
            track,
            indoor,
            temp,
            track_condition,
            event_type,
            kart_info
        )
        VALUES (
            ${userId},
            ${validData.race_type},
            ${validData.best_lap_time},
            ${validData.track},
            ${validData.indoor},
            ${validData.temp},
            ${validData.track_condition},
            ${validData.event_type},
            ${validData.kart_info}
        );
    `
    revalidatePath('/');
    revalidatePath('/analysis')
    redirect('/');
}