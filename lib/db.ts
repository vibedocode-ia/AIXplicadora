import { Pool, QueryResult, QueryResultRow } from "pg";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres_password@localhost:5432/aixplicadora?sslmode=disable";

// Singleton pool para evitar esgotamento de conexões no Next.js
declare global {
  var _pgPool: Pool | undefined;
}

export const pool = globalThis._pgPool || new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

if (process.env.NODE_ENV !== "production") {
  globalThis._pgPool = pool;
}

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === "development") {
      console.log("[DB Query]", { text: text.slice(0, 100), duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error("[DB Error]", { text, error });
    throw error;
  }
}
