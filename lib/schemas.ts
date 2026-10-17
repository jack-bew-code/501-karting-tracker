import { z } from "zod"

export const formSchema = z.object({
    race_type: z.string().max(50),
    best_lap_time: z.string().regex(/^\d+\.\d{3}$/, "Must be formatted as seconds.milliseconds (e.g., 43.125)"),
    track: z.string().max(255),
    indoor: z.boolean(),
    temp: z.number().max(50),
    track_condition: z.string().max(50),
    event_type: z.string().max(255),
    kart_info: z.string().max(255)
})

export type SessionData = z.infer<typeof formSchema>