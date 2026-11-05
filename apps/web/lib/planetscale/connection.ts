import { connect } from "@planetscale/database";
import mysql from "mysql2/promise";

/**
 * Raw SQL connection used by the "via-edge" helpers, link redirects, and
 * click/usage counters.
 *
 * - If PLANETSCALE_DATABASE_URL is set, use PlanetScale's HTTP driver
 *   (PlanetScale itself, or the local PlanetScale HTTP simulator).
 * - Otherwise, connect over the MySQL protocol to DATABASE_URL (e.g. TiDB
 *   Cloud, Railway, Aiven) with a small connection pool.
 *
 * The MySQL path mirrors the PlanetScale driver's result shape and type
 * casting (`{ rows }`; dates/BIGINT/DECIMAL as strings; JSON parsed), so
 * callers don't need to change. Requires the Node.js runtime, not Edge.
 */

type ExecuteResult<T> = {
  rows: T[];
  rowsAffected: number;
  insertId: string | null;
};

type Connection = {
  execute<T = Record<string, any>>(
    query: string,
    args?: unknown[],
  ): Promise<ExecuteResult<T>>;
};

const createMysqlConnection = (url: string): Connection => {
  const parsed = new URL(url);
  const isLocal = ["localhost", "127.0.0.1"].includes(parsed.hostname);

  const pool = mysql.createPool({
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, "") || undefined,
    ssl: isLocal
      ? undefined
      : { minVersion: "TLSv1.2", rejectUnauthorized: true },
    connectionLimit: 5,
    maxIdle: 2,
    idleTimeout: 60_000,
    enableKeepAlive: true,
    // match @planetscale/database casting
    dateStrings: true,
    supportBigNumbers: true,
    bigNumberStrings: true,
    decimalNumbers: false,
    timezone: "Z",
  });

  return {
    async execute<T>(query: string, args: unknown[] = []) {
      const [result] = await pool.query(query, args);

      if (Array.isArray(result)) {
        return { rows: result as T[], rowsAffected: 0, insertId: null };
      }

      const header = result as mysql.ResultSetHeader;
      return {
        rows: [],
        rowsAffected: header.affectedRows,
        insertId: header.insertId ? String(header.insertId) : null,
      };
    },
  };
};

declare global {
  var mysqlConn: Connection | undefined;
}

const getConnection = (): Connection => {
  if (process.env.PLANETSCALE_DATABASE_URL) {
    return connect({
      url: process.env.PLANETSCALE_DATABASE_URL,
    }) as unknown as Connection;
  }
  global.mysqlConn ??= createMysqlConnection(process.env.DATABASE_URL || "");
  return global.mysqlConn;
};

export const conn = getConnection();
