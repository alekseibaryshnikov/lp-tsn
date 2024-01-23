import { setupWorker } from 'msw/browser';
import { handlers } from '@/mocks/api.mock.ts';

export const worker = setupWorker(...handlers);
