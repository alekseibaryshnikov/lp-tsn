import { Nullable } from '../../core/types';

export type LoginRq = {
    action: Action;
    apiKey: Nullable<string>;
    phone: string | number;
    codeSMS?: Nullable<string | number>;
};

export type FormValues = {
    phone: Nullable<string>;
    codeSMS: Nullable<string>;
};

export type Action = 'firstStep-Phone' | 'secondStep-Code' | 'getPassList';
