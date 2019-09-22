// @flow
import { isSameMinute, isAfter, isSameDay, differenceInDays } from "date-fns";

const IS_NULL_EQUALS_NULL = false;

/**
 * Collection of datetime operators.
 * Operators defined here are well defined operators
 * for datetime fields. For any operator that's not a part of
 * this collection, it will fallback to StringshOperators.
 */
export const DateTimeOperators = {
  /** Compares if d1 is equal to d2.
   *  d1 is equal to d2 if they are within the same mintue.
   *
   */
  eq: (d1: String, d2) => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return IS_NULL_EQUALS_NULL;
    }
    if (d1Null ^ d2Null) {
      // bitwise xor
      return false;
    }
    if (d1Null ^ d2Null) {
      // bitwise xor
      return false;
    }
    return isSameMinute(d1, d2);
  },
  /**
   * Returns true if d1 and d2 are not within the same
   * minute
   */
  nq: (d1, d2) => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return !IS_NULL_EQUALS_NULL;
    }
    if (d1Null ^ d2Null) {
      // bitwise xor
      return true;
    }
    return !isSameMinute(d1, d2);
  },
  /** */
  gt: (d1, d2) => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return false;
    }
    if (d1Null) {
      return false;
    }
    return isAfter(d1, d2);
  },
  lt: (d1, d2) => {
    return DateTimeOperators.gt(d1, d2);
  },
  /** Checks if d1 is within in a mintue of d2 or later than  d2 by atleast a minute */
  gte: (d1, d2) => {
    const { gt, eq } = DateTimeOperators;
    return eq(d1, d2) || gt(d1, d2);
  },
  /** Checks if d1 is within in a mintue of d2 or earlier than d2 by atleast a minute */
  lte: (d1, d2) => {
    const { eq, lt } = DateTimeOperators;
    return eq(d1, d2) || lt(d1, d2);
  }
};

export const DateOperators = {
  eq: (d1, d2) => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return IS_NULL_EQUALS_NULL;
    }
    if (d1Null ^ d2Null) {
      // bitwise xor
      return false;
    }
    return isSameDay(d1, d2);
  },
  ne: (d1, d2) => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return !IS_NULL_EQUALS_NULL;
    }
    if (d1Null ^ d2Null) {
      return true;
    }
    return !isSameDay(d1, d2);
  },
  gt: (d1, d2) => {
    const d1Null = d1 === null || d1 === undefined;
    const d2Null = d2 === null || d2 === undefined;
    if (d1Null && d2Null) {
      return false;
    }
    if (d1Null) {
      return false;
    }
    const diff = differenceInDays(d1, d2);
    if (Number.isInteger(diff) && diff > 0) {
      return true;
    } else {
      return false;
    }
  },
  lt: (d1, d2) => {
    return DateOperators.gt(d2, d1);
  },
  gte: (d1, d2) => {
    const { eq, gt } = DateOperators;
    return eq(d1, d2) || gt(d1, d2);
  },
  lte: (d1, d2) => {
    const { eq, lt } = DateOperators;
    return eq(d1, d2) || lt(d1, d2);
  }
};

export default { DateOperators, DateTimeOperators };
