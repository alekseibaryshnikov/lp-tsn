import { setupWorker } from 'msw/browser';
import { handlers } from '@/mocks/api.mock';

export const worker = setupWorker(...handlers);
