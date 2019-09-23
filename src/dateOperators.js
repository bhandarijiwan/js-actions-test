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
  /**
   * Returns true if d1 and d2 are not within the same
   * minute
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
  /** */
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
  lt: (d1: DateType, d2: DateType): boolean => {
    return DateOperators.gt(d2, d1);
  },
  gte: (d1: DateType, d2: DateType) => {
    const { eq, gt } = DateOperators;
    return eq(d1, d2) || gt(d1, d2);
  },
  lte: (d1: DateType, d2: DateType): boolean => {
    const { eq, lt } = DateOperators;
    return eq(d1, d2) || lt(d1, d2);
  },
};

export default { DateOperators, DateTimeOperators };
