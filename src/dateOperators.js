// @flow
import dayjs from 'dayjs';
import type { ConfigType as DateType } from 'dayjs';

const IS_NULL_EQUALS_NULL = false;

/**
 * Collection of datetime operators.
 * Operators defined here are well defined operators
 * for datetime fields. For any operator that's not a part of
 * this collection, it will fallback to StringshOperators.
 */
export const DateTimeOperators = {
  /** Returns true if d1 is within a mintue of d2
   * otherwise returns false
   * @param  {DateType} d1
   * @param  {DateType} d2
   * @returns boolean
   */
  eq: (d1: DateType, d2: DateType): boolean => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return IS_NULL_EQUALS_NULL;
    }
    if (Number(d1Null) ^ Number(d2Null)) {
      // bitwise xor
      return false;
    }
    return dayjs(d1).isSame(dayjs(d2), 'minute');
  },

  /** Returns true if d1 is not within a minute of d2
   * otherwise returns false
   * @param  {DateType} d1
   * @param  {DateType} d2
   * @returns boolean
   */
  nq: (d1: DateType, d2: DateType): boolean => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return !IS_NULL_EQUALS_NULL;
    }
    if (Number(d1Null) ^ Number(d2Null)) {
      // bitwise xor
      return true;
    }
    return !dayjs(d1).isSame(dayjs(d2), 'minute');
  },

  /** Returns true if d1 is after d2 by more than mintue
   * @param  {DateType} d1
   * @param  {DateType} d2
   * @returns boolean
   */
  gt: (d1: DateType, d2: DateType): boolean => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return false;
    }
    if (d1Null) {
      return false;
    }
    return dayjs(d1).isAfter(dayjs(d2));
  },
  lt: (d1: DateType, d2: DateType): boolean => {
    return DateTimeOperators.gt(d1, d2);
  },
  /** Checks if d1 is within in a mintue of d2 or later than  d2 by atleast a minute */
  gte: (d1: DateType, d2: DateType): boolean => {
    const { gt, eq } = DateTimeOperators;
    return eq(d1, d2) || gt(d1, d2);
  },
  /** Checks if d1 is within in a mintue of d2 or earlier than d2 by atleast a minute */
  lte: (d1: DateType, d2: DateType): boolean => {
    const { eq, lt } = DateTimeOperators;
    return eq(d1, d2) || lt(d1, d2);
  },
};

export const DateOperators = {
  /** Checks if d1 is equal to d2
   * @param  {DateType} d1
   * @param  {DateType} d2
   * @returns boolean
   */
  eq: (d1: DateType, d2: DateType): boolean => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return IS_NULL_EQUALS_NULL;
    }
    if (Number(d1Null) ^ Number(d2Null)) {
      // bitwise xor
      return false;
    }
    return dayjs(d1).isSame(d2, 'day');
  },
  /** Checkist if d1 is not equal to d2
   * @param  {DateType} d1
   * @param  {DateType} d2
   * @returns boolean
   */
  ne: (d1: DateType, d2: DateType): boolean => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return !IS_NULL_EQUALS_NULL;
    }
    if (Number(d1Null) ^ Number(d2Null)) {
      return true;
    }
    return !dayjs(d1).isSame(d2, 'day');
  },

  /** Checks if d1 is after d2
   * @param  {DateType} d1
   * @param  {DateType} d2
   * @returns boolean
   */
  gt: (d1: DateType, d2: DateType): boolean => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return false;
    }
    if (d1Null) {
      return false;
    }
    return dayjs(d1).isAfter(dayjs(d2), 'day');
  },

  /** Checks if d1 is before d2
   * @param  {DateType} d1
   * @param  {DateType} d2
   * @returns boolean
   */
  lt: (d1: DateType, d2: DateType): boolean => {
    return DateOperators.gt(d2, d1);
  },

  /** Checks if d1 is the same day or after d2
   * @param  {DateType} d1
   * @param  {DateType} d2
   */
  gte: (d1: DateType, d2: DateType) => {
    const { eq, gt } = DateOperators;
    return eq(d1, d2) || gt(d1, d2);
  },

  /** Checks if d1 is the same day or before
   * @param  {DateType} d1
   * @param  {DateType} d2
   * @returns boolean
   */
  lte: (d1: DateType, d2: DateType): boolean => {
    const { eq, lt } = DateOperators;
    return eq(d1, d2) || lt(d1, d2);
  },
};

export default { DateOperators, DateTimeOperators };
