"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFixedPrice = exports.JobProposalsNumber = exports.JobType = void 0;
var JobType;
(function (JobType) {
    JobType["FIXED_PRICE"] = "0";
    JobType["HOURLY"] = "1";
    JobType["BOTH"] = "0,1";
})(JobType || (exports.JobType = JobType = {}));
var JobProposalsNumber;
(function (JobProposalsNumber) {
    JobProposalsNumber["ZERO_TO_FIVE"] = "0-5";
    JobProposalsNumber["FIVE_TO_TEN"] = "5-10";
    JobProposalsNumber["TEN_TO_FIFTEEN"] = "10-15";
    JobProposalsNumber["FIFTEEN_TO_TWENTY"] = "15-20";
    JobProposalsNumber["TWENTY_TO_FIFTY"] = "20-50";
    JobProposalsNumber["FIFTY_AND_UP"] = "50-";
})(JobProposalsNumber || (exports.JobProposalsNumber = JobProposalsNumber = {}));
var JobFixedPrice;
(function (JobFixedPrice) {
    JobFixedPrice["ZERO_TO_NINETY_NINE"] = "0-99";
    JobFixedPrice["ONE_HUNDRED_TO_FOUR_NINETY_NINE"] = "100-499";
    JobFixedPrice["FIVE_HUNDRED_TO_NINE_NINETY_NINE"] = "500-999";
    JobFixedPrice["ONE_THOUSAND_TO_FOUR_NINETY_NINE"] = "1000-4999";
    JobFixedPrice["FIVE_THOUSAND_AND_UP"] = "5000-";
})(JobFixedPrice || (exports.JobFixedPrice = JobFixedPrice = {}));
