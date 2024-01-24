import { Nullable } from '@/core/types';

export type LoginRq = {
  action: Action;
  phone: string | number;
  codeSMS?: Nullable<string | number>;
};

export type FormValues = {
  phone: string;
  codeSMS: string;
};

export type Action = 'firstStep-Phone' | 'secondStep-Code' | 'getPassList';
