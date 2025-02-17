"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerCreateSchema = void 0;
const zod_1 = require("zod");
const WorkerSearch_1 = require("../enum/WorkerSearch");
const WorkerSearch_2 = require("../enum/WorkerSearch");
exports.WorkerCreateSchema = zod_1.z.object({
    query: zod_1.z.string({
        required_error: "query is required"
    }),
    isHourly: zod_1.z.boolean().optional(),
    isFixedPrice: zod_1.z.boolean().optional(),
    priceRanges: zod_1.z.array(zod_1.z.enum([
        WorkerSearch_2.JobFixedPrice.ZERO_TO_NINETY_NINE,
        WorkerSearch_2.JobFixedPrice.ONE_HUNDRED_TO_FOUR_NINETY_NINE,
        WorkerSearch_2.JobFixedPrice.FIVE_HUNDRED_TO_NINE_NINETY_NINE,
        WorkerSearch_2.JobFixedPrice.ONE_THOUSAND_TO_FOUR_NINETY_NINE,
        WorkerSearch_2.JobFixedPrice.FIVE_THOUSAND_AND_UP
    ])).optional(),
    proposalsRanges: zod_1.z.array(zod_1.z.enum([
        WorkerSearch_1.JobProposalsNumber.ZERO_TO_FIVE,
        WorkerSearch_1.JobProposalsNumber.FIVE_TO_TEN,
        WorkerSearch_1.JobProposalsNumber.TEN_TO_FIFTEEN,
        WorkerSearch_1.JobProposalsNumber.FIFTEEN_TO_TWENTY,
        WorkerSearch_1.JobProposalsNumber.TWENTY_TO_FIFTY
    ])).optional(),
    verifiedOnly: zod_1.z.boolean().optional(),
    previousClientsOnly: zod_1.z.boolean().optional(),
    workerName: zod_1.z.string().optional(),
    workerDescription: zod_1.z.string().optional(),
});
