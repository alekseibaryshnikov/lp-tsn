import { Nullable } from '@/core/types.ts';

export const enum PassStatus {
  temporary = '1',
  permanent = '2',
  oneTime = '3',
}

export const enum PassType {
  car = '1',
  human = '2',
}

export type Form = {
  vidPropusk: PassStatus;
  vidAutoOrMan: PassType;
  fio: Nullable<string>;
  numberAuto: Nullable<string>;
  comment: string;
  comment2: string;
};

export const enum FormFields {
  vidPropusk = 'vidPropusk',
  vidAutoOrMan = 'vidAutoOrMan',
  fio = 'fio',
  numberAuto = 'numberAuto',
  comment = 'comment',
  comment2 = 'comment2',
}
