import Image from "next/image";
import { neon } from "@neondatabase/serverless"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function Home() {

  const sql = neon(process.env.DATABASE_URL!);

  // const data = await sql`
  // CREATE TABLE races (
  //   race_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  //   race_type VARCHAR(50) NOT NULL,
  //   best_lap_time DECIMAL(5,3) NOT NULL,
  //   track VARCHAR(255) NOT NULL,
  //   indoor BOOLEAN NOT NULL,
  //   temp INTEGER,
  //   track_condition VARCHAR(50) ,
  //   event_type VARCHAR(255),
  //   kart_info VARCHAR(255)
  //   )`

//   const data = await sql`
//   INSERT INTO races (race_type, best_lap_time, track, indoor, temp, track_condition, event_type, kart_info)
// VALUES ('Practice', 43.125, 'Buckmore Park', false, 18, 'Dry', 'Sunday Open Practice', 'Twin Engine Rental');`

  const sessions = await sql`
    SELECT *
    FROM races
    ORDER BY created_at desc
  `
  return (
    <main className="min-h-screen bg-zinc-50/80 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
          <p className="text-sm text-zinc-500">Overview of your recent karting sessions and lap times.</p>
        </div>

        {/* Sessions Data Card */}
        <Card className="border-zinc-200/60 shadow-sm overflow-hidden">
          <CardHeader className="bg-white pb-4 border-b border-zinc-100">
            <CardTitle className="text-lg">Recent Sessions</CardTitle>
          </CardHeader>
          
          <CardContent className="bg-white p-0">
          {sessions.length === 0 ? (
              <div className="p-8 text-center text-zinc-500">
                No sessions yet. Time to hit the track!
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-zinc-50/50">
                  <TableRow>
                    <TableHead className="text-left">Date</TableHead>
                    <TableHead className="w-[250px]">Track</TableHead>
                    <TableHead>Best Lap</TableHead>
                    <TableHead className="text-right">Session Type</TableHead>
                  </TableRow>
                </TableHeader>
              
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.race_id} className="hover:bg-zinc-50/80 transition-colors">
                      <TableCell className="font-medium text-zinc-900">{new Date(session.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium text-zinc-900">{session.track}</TableCell>
                      
                      {/* font-mono makes numbers align beautifully */}
                      <TableCell className="font-mono text-zinc-600">{session.best_lap_time}s</TableCell>
                      
                      <TableCell className="text-right">
                        {/* This span creates a sleek little "pill" badge for the race type */}
                        <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800">
                          {session.race_type}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

      </div>
    </main>
  );
}