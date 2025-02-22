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
        data: worker
      });

    } catch (error: any) {
      socket.emit('create_worker_error', {
        status: false,
        message: error?.message,
        data: error
      });
    }
  });

  socket.on('update_worker', async (data: WorkerUpdateType & { id: number }) => {
    try {
      const worker = await updateWorker(data.id, data);

      socket.emit('worker_updated', {
        status: true,
        message: 'Worker updated successfully',
        data: worker
      });
    } catch (error: any) {
      socket.emit('update_worker_error', {
        status: false,
        message: error?.message,
        data: error
      });
    }
  });

  socket.on('delete_worker', async (data: { id: number }) => {
    try {
      await deleteWorker(data.id);

      socket.emit('worker_deleted', {
        status: true,
        message: 'Worker deleted successfully',
      });

    } catch (error: any) {
      socket.emit('delete_worker_error', {
        status: false,
        message: 'Failed to delete worker',
        data: error
      });
    }
  });

  socket.on('activate_worker', async (id: number) => {
    try {
      const worker = await updateWorker(id, {
        status: WorkerStatus.ACTIVE
      });

      socket.emit('worker_activated', {
        status: true,
        message: 'Worker activated successfully',
        data: worker
      });

    } catch (error: any) {
      socket.emit('activate_worker_error', {
        status: false,
        message: 'Failed to activate worker',
        data: error
      });
    }
  });

  socket.on('deactivate_worker', async (id: number) => {
    try {
      const worker = await updateWorker(id, {
        status: WorkerStatus.INACTIVE
      });

      socket.emit('worker_deactivated', {
        status: true,
        message: 'Worker deactivated successfully',
        data: worker
      });

    } catch (error) {
      socket.emit('deactivate_worker_error', {
        status: false,
        message: 'Failed to deactivate worker',
        data: error
      });
    }
  });

  socket.on('turn_off_notifications', async (id: number) => {
    try {
      const worker = await updateWorker(id, {
        notify: false
      });

      socket.emit('notifications_turned_off', {
        status: true,
        message: 'Notifications turned off successfully',
        data: worker
      });

    } catch (error: any) {
      socket.emit('turn_off_notifications_error', {
        status: false,
        message: 'Failed to turn off notifications',
        data: error
      });
    }
  });

  socket.on('turn_on_notifications', async (id: number) => {
    try {
      const worker = await updateWorker(id, {
        notify: true
      });

      socket.emit('notifications_turned_on', {
        status: true,
        message: 'Notifications turned on successfully',
        data: worker
      });

    } catch (error: any) {
      socket.emit('turn_on_notifications_error', {
        status: false,
        message: 'Failed to turn on notifications',
        data: error
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
}