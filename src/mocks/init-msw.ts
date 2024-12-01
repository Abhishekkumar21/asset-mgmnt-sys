import { worker } from './browser';

export async function initMockServiceWorker() {
  if (import.meta.env.DEV) {
    try {
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
          options: {
            scope: '/',
          },
        },
      });
      console.log(' Mock Service Worker started successfully');
    } catch (error) {
      console.error(' Error starting Mock Service Worker:', error);
    }
  }
}
