import pg from "pg";
const { Pool } = pg;
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1, // Only need 1 connection for migrations
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("🚀 Running SQL migrations...");
  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
    await pool.query(schemaSql);
    console.log("✅ Migrations complete!");
  } catch (err) {
    console.error("❌ Migration failed", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
