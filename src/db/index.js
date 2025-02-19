"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
}
exports.db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL, { casing: 'snake_case' });
