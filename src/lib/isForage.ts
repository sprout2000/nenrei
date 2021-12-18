import type { Forage } from './Forage';

const isNumber = (value: unknown): value is number => typeof value === 'number';
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isForage = (arg_0: unknown): arg_0 is Forage => isObject(arg_0) &&
  ('year' in arg_0 && (isNumber)(arg_0['year'])) && ('month' in arg_0 && (isNumber)(arg_0['month']));
