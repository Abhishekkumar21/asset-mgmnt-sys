import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Log when mock API calls are made (only in development)
if (process.env.NODE_ENV === 'development') {
  worker.events.on('request:start', ({ request }) => {
    console.log(' Mocked API Call:', request.method, request.url);
  });
  
  worker.events.on('response:mocked', ({ request, response }) => {
    console.log(' Mocked Response:', request.method, request.url, response.status);
  });
  
  worker.events.on('request:unhandled', ({ request }) => {
    console.log(' Unhandled Request:', request.method, request.url);
  });
}
