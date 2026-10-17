"use server"

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = neon(process.env.DATABASE_URL!);

export async function createSession(data: any){
    await sql `
        INSERT INTO races (race_type, best_lap_time, track, indoor, temp, track_condition, event_type, kart_info)
        VALUES (${data.race_type}, ${data.best_lap_time}, ${data.track}, ${data.indoor}, ${data.temp}, ${data.track_condition}, ${data.event_type}, ${data.kart_info});
    `
    revalidatePath('/');
    redirect('/');
}