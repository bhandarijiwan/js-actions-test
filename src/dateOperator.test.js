import { DateTimeOperators } from './dateOperators';

describe('DateTime Operators', () => {
  describe('Eq', () => {
    test('date1 = null, date2 = null', () => {
      expect(DateTimeOperators.eq(null, null)).toEqual(false);
    });
    test('date1 = undefined, date2 = null', () => {
      expect(DateTimeOperators.eq(undefined, null)).toEqual(false);
    });
    test('date1 = null, date2 = undefined', () => {
      expect(DateTimeOperators.eq(null, undefined)).toEqual(false);
    });
    test('date1 = undefined, date2 = undefined', () => {
      expect(DateTimeOperators.eq(undefined, null)).toEqual(false);
    });
    test('date1 = valid string, date2 = null', () => {
      expect(
        DateTimeOperators.eq('Mon Jun 24 2019 00:24:09 GMT-0700 (Pacific Daylight Time)', null)
      ).toEqual(false);
    });
    test('date1 = valid string #1, date2 = valid string #1', () => {
      expect(
        DateTimeOperators.eq(
          'Mon Jun 24 2019 00:24:09 GMT-0700 (Pacific Daylight Time)',
          'Mon Jun 24 2019 00:24:09 GMT-0700 (Pacific Daylight Time)'
        )
      ).toEqual(true);
    });
    test('date1 = valid string #2, date2 = valid string #2', () => {
      expect(DateTimeOperators.eq('6/24/2019, 12:29:59 AM', '6/24/2019, 12:29:59 AM')).toEqual(
        true
      );
    });
    test('date1 = valid string #1, date2 = valid string #2', () => {
      expect(
        DateTimeOperators.eq(
          'Mon Jun 24 2019 00:29:59 GMT-0700 (Pacific Daylight Time)',
          '6/24/2019, 12:29:59 AM'
        )
      ).toEqual(true);
    });
    test('date1 = valid string #2, date2 = ISO string ', () => {
      expect(DateTimeOperators.eq('6/24/2019, 12:29:59 AM', '2019-06-24T07:29:59.426Z')).toEqual(
        true
      );
    });
    test('date1 = valid string, date2 = iso date string', () => {
      expect(DateTimeOperators.eq('6/24/2019', '2019-06-24')).toEqual(true);
    });
    test('date1 = valid string, date2 = iso date string', () => {
      expect(DateTimeOperators.eq('6/24/2019', '2019-06-24')).toEqual(true);
    });
  });
});
