import { neon } from "@neondatabase/serverless";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function AnalysisPage() {
  const sql = neon(process.env.DATABASE_URL!);
  
  // Getting card data
  const trackStats = await sql`
    SELECT 
      track, 
      MIN(best_lap_time) AS fastest_lap, 
      MAX(created_at) AS last_visited, 
      COUNT(*) AS total_sessions
    FROM races
    GROUP BY track
  `;

  return (
    <main className="min-h-screen bg-zinc-50/80 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Page Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Track Analysis</h1>
            <p className="text-sm text-zinc-500">Your track data is shown below at a glance. Click a track to see more data about it!! (COMING SOON)</p>
          </div>
          <Link className={`${buttonVariants()} mt-2`} href="/">Back</Link>
        </div>

        {/* The track grid cells */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trackStats.map((stat) => (
            <Card key={stat.track} className="border-zinc-200/60 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="bg-white pb-4 border-b border-zinc-100">
                <CardTitle className="text-xl text-zinc-800">{stat.track}</CardTitle>
              </CardHeader>
              
              <CardContent className="bg-white pt-5 space-y-4">
                {/* Fastest Lap Stat */}
                <div className="flex justify-between items-center border-b border-zinc-50 pb-3">
                  <span className="text-sm font-medium text-zinc-500">Fastest Lap</span>
                  <span className="font-mono text-lg font-bold text-zinc-900">
                    {stat.fastest_lap}
                  </span>
                </div>
                
                {/* Total Sessions Stat */}
                <div className="flex justify-between items-center border-b border-zinc-50 pb-3">
                  <span className="text-sm font-medium text-zinc-500">Total Sessions</span>
                  <span className="font-medium text-zinc-700">
                    {stat.total_sessions}
                  </span>
                </div>
                
                {/* Last Visited Stat */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-zinc-500">Last Session</span>
                  <span className="text-sm text-zinc-600">
                    {new Date(stat.last_visited).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </main>
  );
}