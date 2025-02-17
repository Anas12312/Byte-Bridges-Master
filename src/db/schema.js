"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM = exports.Jobs = exports.Workers = exports.Sessions = exports.Users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const timestamps = {
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
};
exports.Users = (0, pg_core_1.pgTable)("users", Object.assign({ id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(), name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(), email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(), phoneNumber: (0, pg_core_1.varchar)('phone_number', { length: 12 }).notNull(), telegramId: (0, pg_core_1.varchar)('telegram_id', { length: 255 }), passwordHash: (0, pg_core_1.varchar)('password_hash', { length: 255 }).notNull() }, timestamps));
exports.Sessions = (0, pg_core_1.pgTable)("sessions", Object.assign({ id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(), userId: (0, pg_core_1.integer)("user_id").references(() => exports.Users.id), ip: (0, pg_core_1.varchar)() }, timestamps));
exports.Workers = (0, pg_core_1.pgTable)("workers", Object.assign({ id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(), name: (0, pg_core_1.varchar)('name', { length: 255 }), description: (0, pg_core_1.varchar)('description', { length: 255 }), 
    // Status
    status: (0, pg_core_1.varchar)('status').notNull().default('INACTIVE'), notify: (0, pg_core_1.boolean)('notify').default(false), 
    // Analytics
    jobCount: (0, pg_core_1.integer)('job_count').default(0), 
    // Search
    query: (0, pg_core_1.varchar)('query').notNull(), jobType: (0, pg_core_1.varchar)('job_type'), fixedPrice: (0, pg_core_1.varchar)('fixed_price'), proposalsNumber: (0, pg_core_1.varchar)('proposals_number'), verifiedOnly: (0, pg_core_1.boolean)('verified_only').default(false), previousClientsOnly: (0, pg_core_1.boolean)('previous_clients_only').default(false) }, timestamps));
exports.Jobs = (0, pg_core_1.pgTable)("jobs", Object.assign({ id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(), workerId: (0, pg_core_1.integer)('worker_id').references(() => exports.Workers.id).notNull(), url: (0, pg_core_1.varchar)('url'), title: (0, pg_core_1.varchar)('title'), description: (0, pg_core_1.varchar)('description'), postedAt: (0, pg_core_1.timestamp)('posted_at'), tags: (0, pg_core_1.varchar)('tags'), clientRate: (0, pg_core_1.real)('client_rate'), clientSpent: (0, pg_core_1.integer)('client_spent'), clientLocation: (0, pg_core_1.varchar)('client_location'), type: (0, pg_core_1.varchar)('type').notNull(), amount: (0, pg_core_1.integer)('amount'), hourlyRateRange: (0, pg_core_1.varchar)('hourly_rate_range'), paymentVerified: (0, pg_core_1.boolean)('payment_verified'), proposalsNumber: (0, pg_core_1.varchar)('proposals_number'), ignore: (0, pg_core_1.boolean)('ignore'), favourite: (0, pg_core_1.boolean)('favourite') }, timestamps));
exports.SYSTEM = (0, pg_core_1.pgTable)("system", Object.assign({ id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(), mutaAll: (0, pg_core_1.boolean)('muta_all') }, timestamps));
