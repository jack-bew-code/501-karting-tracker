import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const sql = neon(process.env.DATABASE_URL);

await sql`ALTER TABLE races ADD COLUMN IF NOT EXISTS clerk_user_id TEXT`;
await sql`CREATE INDEX IF NOT EXISTS idx_races_clerk_user_id ON races (clerk_user_id)`;

console.log("Races table now has per-user ownership support.");
