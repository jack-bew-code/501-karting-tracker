"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    race_type: z.string().max(50),
    best_lap_time: z.string().regex(/^\d+\.\d{3}$/, "Must be formatted as seconds.milliseconds (e.g., 43.125)"),
    track: z.string().max(255),
    indoor: z.boolean(),
    temp: z.number().max(50),
    track_conditions: z.string().max(50),
    event_type: z.string().max(255),
    kart_info: z.string().max(255)
})

export default function AddSessionForm(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            race_type: "",
            best_lap_time: "",
            track: "",
            indoor: false,
            temp: 0,
            track_conditions: "",
            event_type: "",
            kart_info: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form data:", values)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mt-4 mx-auto py-12">
            
            {/* Grid Container: 1 column on mobile, 2 columns on medium screens and up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Track Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Track Name</label>
                    <Input placeholder="e.g. Buckmore Park" {...form.register("track")} />
                    {form.formState.errors.track && (
                        <p className="text-sm text-red-500">{form.formState.errors.track.message}</p>
                    )}
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Event Type</label>
                    <Input placeholder="e.g. Club Championship Round 1" {...form.register("event_type")} />
                    {form.formState.errors.event_type && (
                        <p className="text-sm text-red-500">{form.formState.errors.event_type.message}</p>
                    )}
                </div>

                {/* Session Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Session Type</label>
                    <Input placeholder="e.g. Practice, Qualifying, Race" {...form.register("race_type")} />
                    {form.formState.errors.race_type && (
                        <p className="text-sm text-red-500">{form.formState.errors.race_type.message}</p>
                    )}
                </div>

                {/* Best Lap Time */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Best Lap Time</label>
                    <Input placeholder="e.g. 43.125" {...form.register("best_lap_time")} />
                    {form.formState.errors.best_lap_time && (
                        <p className="text-sm text-red-500">{form.formState.errors.best_lap_time.message}</p>
                    )}
                </div>

                {/* Track Conditions */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Track Conditions</label>
                    <Input placeholder="e.g. Dry, Damp, Wet" {...form.register("track_conditions")} />
                    {form.formState.errors.track_conditions && (
                        <p className="text-sm text-red-500">{form.formState.errors.track_conditions.message}</p>
                    )}
                </div>

                {/* Temperature */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Temperature (°C)</label>
                    <Input 
                        type="number" 
                        placeholder="e.g. 15" 
                        {...form.register("temp", { valueAsNumber: true })} 
                    />
                    {form.formState.errors.temp && (
                        <p className="text-sm text-red-500">{form.formState.errors.temp.message}</p>
                    )}
                </div>

                {/* Kart Info - Spans both columns so it has plenty of room to type */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Kart Info / Setup</label>
                    <Input placeholder="e.g. Rotax Max, Slick tires, 12/80 gearing" {...form.register("kart_info")} />
                    {form.formState.errors.kart_info && (
                        <p className="text-sm text-red-500">{form.formState.errors.kart_info.message}</p>
                    )}
                </div>

            </div>

            {/* Full-width submit button */}
            <button type="submit" className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors font-medium">
                Save Session
            </button>
            
        </form>
    )
}