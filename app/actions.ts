"use server"

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type SessionData, formSchema} from "@/lib/schemas";

const sql = neon(process.env.DATABASE_URL!);

export async function createSession(data: SessionData){
    const validData = formSchema.parse(data)
    await sql `
        INSERT INTO races (race_type, best_lap_time, track, indoor, temp, track_condition, event_type, kart_info)
        VALUES (${validData.race_type}, ${validData.best_lap_time}, ${validData.track}, ${validData.indoor}, ${validData.temp}, ${validData.track_condition}, ${validData.event_type}, ${validData.kart_info});
    `
    revalidatePath('/');
    redirect('/');
}