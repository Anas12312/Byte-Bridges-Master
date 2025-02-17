import { Socket } from 'socket.io';
import { initializeScraper, stopScrapper } from '../controllers/scrape.controller';
import { createWorker } from '../controllers/database.controller';

export function handleSocketEvents(socket: Socket) {
  socket.on('start_scraper', async (data: { url: string }) => {
    try {
      await initializeScraper(data.url);
      socket.emit('scraper_started', { message: 'Scraper started successfully' });
    } catch (error) {
      socket.emit('scraper_error', { error: 'Failed to start scraper' });
    }
  });

  socket.on('stop_scraper', async () => {
    try {
      await stopScrapper();
      socket.emit('scraper_stopped', { message: 'Scraper stopped successfully' });
    } catch (error) {
      socket.emit('scraper_error', { error: 'Failed to stop scraper' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
}