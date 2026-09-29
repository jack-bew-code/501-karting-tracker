import Image from "next/image";
import { neon } from "@neondatabase/serverless"

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
  `
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Karting Sessions</h1>
      {sessions.map((session) => (
        <div key={session.race_id} className="border p-4 mb-2 rounded">
          <p>{session.track} - {session.best_lap_time}s</p>
        </div>
      ))}
    </div>
  );
}
