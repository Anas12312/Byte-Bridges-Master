"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorker = exports.updateWorker = exports.createWorker = exports.getWorkerById = exports.getWorkers = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const WorkerStatus_1 = require("../enum/WorkerStatus");
const drizzle_orm_2 = require("drizzle-orm");
const getWorkers = (search_1, ...args_1) => __awaiter(void 0, [search_1, ...args_1], void 0, function* (search, page = 1, limit = 100) {
    if (search) {
        const workers = yield db_1.db.select().from(schema_1.Workers).where((0, drizzle_orm_2.like)(schema_1.Workers.query, `%${search}%`));
        return workers;
    }
    const workers = yield db_1.db.select().from(schema_1.Workers);
    return workers;
});
exports.getWorkers = getWorkers;
const getWorkerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const worker = yield db_1.db.select().from(schema_1.Workers).where((0, drizzle_orm_1.eq)(schema_1.Workers.id, id));
    if (worker.length === 0) {
        throw new Error("Worker not found");
    }
    return worker[0];
});
exports.getWorkerById = getWorkerById;
const createWorker = (worker) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const newWorker = yield db_1.db.insert(schema_1.Workers).values({
        name: (_a = worker.name) !== null && _a !== void 0 ? _a : '',
        description: (_b = worker.description) !== null && _b !== void 0 ? _b : '',
        query: worker.query,
        jobType: (_c = worker.jobType) !== null && _c !== void 0 ? _c : '',
        fixedPrice: (_d = worker.fixedPrice) !== null && _d !== void 0 ? _d : '',
        proposalsNumber: (_e = worker.proposalsNumber) !== null && _e !== void 0 ? _e : '',
        verifiedOnly: (_f = worker.verifiedOnly) !== null && _f !== void 0 ? _f : false,
        previousClientsOnly: (_g = worker.previousClientsOnly) !== null && _g !== void 0 ? _g : false,
        notify: (_h = worker.notify) !== null && _h !== void 0 ? _h : false,
        status: (_j = worker.status) !== null && _j !== void 0 ? _j : WorkerStatus_1.WorkerStatus.INACTIVE,
    }).returning();
    return newWorker[0];
});
exports.createWorker = createWorker;
const updateWorker = (id, worker) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const originalWorker = yield (0, exports.getWorkerById)(id);
    const updatedWorker = yield db_1.db.update(schema_1.Workers).set({
        name: (_a = worker.name) !== null && _a !== void 0 ? _a : originalWorker.name,
        description: (_b = worker.description) !== null && _b !== void 0 ? _b : originalWorker.description,
        query: (_c = worker.query) !== null && _c !== void 0 ? _c : originalWorker.query,
        jobType: (_d = worker.jobType) !== null && _d !== void 0 ? _d : originalWorker.jobType,
        fixedPrice: (_e = worker.fixedPrice) !== null && _e !== void 0 ? _e : originalWorker.fixedPrice,
        proposalsNumber: (_f = worker.proposalsNumber) !== null && _f !== void 0 ? _f : originalWorker.proposalsNumber,
        verifiedOnly: (_g = worker.verifiedOnly) !== null && _g !== void 0 ? _g : originalWorker.verifiedOnly,
        previousClientsOnly: (_h = worker.previousClientsOnly) !== null && _h !== void 0 ? _h : originalWorker.previousClientsOnly,
        status: (_j = worker.status) !== null && _j !== void 0 ? _j : originalWorker.status,
        notify: (_k = worker.notify) !== null && _k !== void 0 ? _k : originalWorker.notify,
    }).where((0, drizzle_orm_1.eq)(schema_1.Workers.id, id)).returning();
    return updatedWorker[0];
});
exports.updateWorker = updateWorker;
const deleteWorker = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.getWorkerById)(id);
    yield db_1.db.delete(schema_1.Workers).where((0, drizzle_orm_1.eq)(schema_1.Workers.id, id));
    return;
});
exports.deleteWorker = deleteWorker;
