import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("[Migrate] DATABASE_URL is not set");
  process.exit(1);
}

// drizzle 폴더는 프로젝트 루트 기준 — 빌드 후에는 dist/migrate.js 기준으로 두 단계 위
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsFolder = path.resolve(__dirname, "..", "drizzle");

async function runMigrations() {
  console.log("[Migrate] Connecting to database...");
  const connection = await mysql.createConnection(DATABASE_URL!);

  try {
    const db = drizzle(connection);
    console.log("[Migrate] Running migrations from:", migrationsFolder);
    await migrate(db, { migrationsFolder });
    console.log("[Migrate] Done.");
  } finally {
    await connection.end();
  }
}

runMigrations().catch((err) => {
  console.error("[Migrate] Failed:", err);
  process.exit(1);
});
