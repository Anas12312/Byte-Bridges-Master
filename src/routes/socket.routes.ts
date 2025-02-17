import { Socket } from 'socket.io';
import { WorkerCreateType } from '../schemas/WorkerCreate';
import { createWorker, deleteWorker, updateWorker } from '../services/db.service';
import { WorkerUpdateType } from '../schemas/WorkerUpdate';
import { WorkerStatus } from '../enum/WorkerStatus';

export function handleSocketEvents(socket: Socket) {
  socket.on('create_worker', async (data: WorkerCreateType) => {
    try {

      const worker = await createWorker(data);

      socket.emit('worker_created', {
        status: true,
        message: 'Worker created successfully',
        data: worker,
        responseDate: Date.now()
      });

    } catch (error: any) {
      socket.emit('create_worker_error', {
        status: false,
        message: error?.message,
        data: error,
        responseDate: Date.now()
      });
    }
  });

  socket.on('update_worker', async (data: WorkerUpdateType & { id: number }) => {
    try {
      const worker = await updateWorker(data.id, data);

      socket.emit('worker_updated', {
        status: true,
        message: 'Worker updated successfully',
        data: worker,
        responseDate: Date.now()
      });
    } catch (error: any) {
      socket.emit('update_worker_error', {
        status: false,
        message: error?.message,
        data: error,
        responseDate: Date.now()
      });
    }
  });

  socket.on('delete_worker', async (data: { id: number }) => {
    try {
      await deleteWorker(data.id);

      socket.emit('worker_deleted', {
        status: true,
        message: 'Worker deleted successfully',
        responseDate: Date.now()
      });

    } catch (error: any) {
      socket.emit('delete_worker_error', {
        status: false,
        message: error?.message,
        data: error,
        responseDate: Date.now()
      });
    }
  });

  socket.on('activate_worker', async (data: { id: number }) => {
    try {
      const worker = await updateWorker(data.id, {
        status: WorkerStatus.ACTIVE
      });

      socket.emit('worker_activated', {
        status: true,
        message: 'Worker activated successfully',
        data: worker,
        responseDate: Date.now()
      });

    } catch (error: any) {
      socket.emit('activate_worker_error', {
        status: false,
        message: error?.message,
        data: error,
        responseDate: Date.now()
      });
    }
  });

  socket.on('deactivate_worker', async (data: { id: number }) => {
    try {
      const worker = await updateWorker(data.id, {
        status: WorkerStatus.INACTIVE
      });

      socket.emit('worker_deactivated', {
        status: true,
        message: 'Worker deactivated successfully',
        data: worker,
        responseDate: Date.now()
      });

    } catch (error) {
      socket.emit('deactivate_worker_error', {
        status: false,
        message: 'Failed to deactivate worker',
        data: error,
        responseDate: Date.now()
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
}