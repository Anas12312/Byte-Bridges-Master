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
exports.handleSocketEvents = handleSocketEvents;
const db_service_1 = require("../services/db.service");
const WorkerStatus_1 = require("../enum/WorkerStatus");
function handleSocketEvents(socket) {
    socket.on('create_worker', (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const worker = yield (0, db_service_1.createWorker)(data);
            socket.emit('worker_created', {
                status: true,
                message: 'Worker created successfully',
                data: worker,
                responseDate: Date.now()
            });
        }
        catch (error) {
            socket.emit('create_worker_error', {
                status: false,
                message: error === null || error === void 0 ? void 0 : error.message,
                data: error,
                responseDate: Date.now()
            });
        }
    }));
    socket.on('update_worker', (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const worker = yield (0, db_service_1.updateWorker)(data.id, data);
            socket.emit('worker_updated', {
                status: true,
                message: 'Worker updated successfully',
                data: worker,
                responseDate: Date.now()
            });
        }
        catch (error) {
            socket.emit('update_worker_error', {
                status: false,
                message: error === null || error === void 0 ? void 0 : error.message,
                data: error,
                responseDate: Date.now()
            });
        }
    }));
    socket.on('delete_worker', (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_service_1.deleteWorker)(data.id);
            socket.emit('worker_deleted', {
                status: true,
                message: 'Worker deleted successfully',
                responseDate: Date.now()
            });
        }
        catch (error) {
            socket.emit('delete_worker_error', {
                status: false,
                message: error === null || error === void 0 ? void 0 : error.message,
                data: error,
                responseDate: Date.now()
            });
        }
    }));
    socket.on('activate_worker', (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const worker = yield (0, db_service_1.updateWorker)(data.id, {
                status: WorkerStatus_1.WorkerStatus.ACTIVE
            });
            socket.emit('worker_activated', {
                status: true,
                message: 'Worker activated successfully',
                data: worker,
                responseDate: Date.now()
            });
        }
        catch (error) {
            socket.emit('activate_worker_error', {
                status: false,
                message: error === null || error === void 0 ? void 0 : error.message,
                data: error,
                responseDate: Date.now()
            });
        }
    }));
    socket.on('deactivate_worker', (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const worker = yield (0, db_service_1.updateWorker)(data.id, {
                status: WorkerStatus_1.WorkerStatus.INACTIVE
            });
            socket.emit('worker_deactivated', {
                status: true,
                message: 'Worker deactivated successfully',
                data: worker,
                responseDate: Date.now()
            });
        }
        catch (error) {
            socket.emit('deactivate_worker_error', {
                status: false,
                message: 'Failed to deactivate worker',
                data: error,
                responseDate: Date.now()
            });
        }
    }));
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
}
