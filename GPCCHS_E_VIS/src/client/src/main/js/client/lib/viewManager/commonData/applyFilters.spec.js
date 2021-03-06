// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : contains and icontains filters accept regex
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : Remove describe only . .
// VERSION : 1.1.2 : FA : ISIS-FT-1952 : 16/05/2017 : Apply filters considering data type
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper
//  modules
// VERSION : 2.0.0 : FA : #8416 : 10/10/2017 : Fix stateColor applying for all types
// END-HISTORY
// ====================================================================

import _omit from 'lodash/omit';
import _assign from 'lodash/assign';
import moment from 'moment';

import { applyFilters, applyFilter } from './applyFilters';

describe('utils/filters', () => {
  describe('applyFilter', () => {
    test('is exported', () => {
      expect(applyFilter(
        { dataValue: { type: 'integer', value: 42 } },
        { field: 'dataValue', operator: '=', operand: '42' }
      )).toBe(true);
    });
  });
  describe('applyFilters', () => {
    test('=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '=',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 43 } }, filter)).toBe(false);
      filter[0].operand = 'myString';
      expect(applyFilters({ dataValue: { type: 'string', value: 'myString' } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'string', value: 'myOtherString' } }, filter)
      ).toBe(false);
      filter[0].operand = 'ok';
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'nok' } }, filter)
      ).toBe(false);
    });
    test('!=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '!=',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 43 } }, filter)).toBe(true);
      filter[0].operand = 'myString';
      expect(applyFilters({ dataValue: { type: 'string', value: 'myString' } }, filter)).toBe(false);
      expect(
        applyFilters({ dataValue: { type: 'string', value: 'myOtherString' } }, filter)
      ).toBe(true);
      filter[0].operand = 'nok';
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'nok' } }, filter)
      ).toBe(false);
    });
    test('<', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '<',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'string', value: '50' } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'boolean', value: true } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
    });
    test('>', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '>',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'string', value: '50' } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'boolean', value: true } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
    });
    test('<=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '<=',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'string', value: '50' } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'boolean', value: true } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
    });
    test('>=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '>=',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'string', value: '50' } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'boolean', value: true } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
    });
    test('contains', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: 'CONTAINS',
          operand: 'foo',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'string', value: 'foo' } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'string', value: 'bar foo bar' } }, filter)
      ).toBe(true);
      expect(applyFilters({ dataValue: { type: 'string', value: 'bar' } }, filter)).toBe(false);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
      ).toBe(true);
      const regex = [
        {
          field: 'dataValue',
          operator: 'CONTAINS',
          operand: '/^FO*/i',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'string', value: 'foo bar' } }, regex)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
      ).toBe(true);
    });
    test('icontains', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: 'ICONTAINS',
          operand: 'foo',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'string', value: 'foo' } }, filter)).toBe(false);
      expect(
        applyFilters({ dataValue: { type: 'string', value: 'bar foo bar' } }, filter)
      ).toBe(false);
      expect(applyFilters({ dataValue: { type: 'string', value: 'bar' } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
      ).toBe(true);
      const regex = [
        {
          field: 'dataValue',
          operator: 'ICONTAINS',
          operand: '/^FO*/i',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'string', value: 'foo bar' } }, regex)).toBe(false);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
      ).toBe(false);
    });
    test('multi', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '>',
          operand: '40',
        },
        {
          field: 'dataValue',
          operator: '<=',
          operand: '49',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 30 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 41 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 49 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(false);
    });
    test('invalid data', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '=',
          operand: '42',
        },
      ];
      expect(applyFilters({ otherField: { type: 'integer', value: '42' } }, filter)).toBe(true);
      expect(applyFilters({ otherField: { type: 'integer', value: '43' } }, filter)).toBe(true);
    });
    test('invalid filter', () => {
      const filter = {
        field: 'dataValue',
        operator: '=',
        operand: '42',
      };
      expect(
        applyFilters({ dataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['field'])])
      ).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } },
        [_assign({}, filter, { field: '' })])).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['operator'])])
      ).toBe(true);
    });
    test('Long value', () => {
      const data = { longValue: { type: 'long', symbol: '18446744073709551600' } };
      const filter = { field: 'longValue', operator: '=', operand: '18446744073709551600' };
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '<=';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '>';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '>=';
      expect(applyFilters(data, [filter])).toBe(true);
      data.longValue.symbol = '18446744073709551510';
      filter.operator = '=';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operand = '18446744073709551505';
      filter.operator = '>';
      expect(applyFilters(data, [filter])).toBe(true);
    });
    test('double value', () => {
      const data = { longValue: { type: 'double', symbol: '184467440737095500.1600' } };
      const filter = { field: 'longValue', operator: '=', operand: '184467440737095500.1600' };
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '<=';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '>';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '>=';
      expect(applyFilters(data, [filter])).toBe(true);
      data.longValue.symbol = '184467440737095500.1510';
      filter.operator = '=';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operand = '184467440737095500.1505';
      filter.operator = '>';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(false);
    });

    describe('time value', () => {
      test('valid equality', () => {
        const data = { onboardDate: { type: 'time', value: moment('2014-03-05 14:22:00') } };
        const filter = { field: 'onboardDate', operator: '=', operand: '05/03/2014 14:22:00.000' };
        expect(applyFilters(data, [filter])).toBe(true);
      });
      test('invalid equality', () => {
        const data = { onboardDate: { type: 'time', value: moment('2014-03-05 15:20:01') } };
        const filter = { field: 'onboardDate', operator: '=', operand: '05/03/2014 15:20:00.000' };
        expect(applyFilters(data, [filter])).toBe(false);
      });

      test('valid inequality', () => {
        const data = { onboardDate: { type: 'time', value: moment('2014-03-05 15:20:00') } };
        const filter = { field: 'onboardDate', operator: '!=', operand: '05/03/2014 15:20:01.000' };
        expect(applyFilters(data, [filter])).toBe(true);
      });
      test('invalid inequality', () => {
        const data = { onboardDate: { type: 'time', value: moment('2014-03-05 14:22:00') } };
        const filter = { field: 'onboardDate', operator: '!=', operand: '05/03/2014 14:22:00.000' };
        expect(applyFilters(data, [filter])).toBe(false);
      });

      test('valid strict inferiority', () => {
        const data = { onboardDate: { type: 'time', value: moment('2014-03-05 14:22') } };
        const filter = { field: 'onboardDate', operator: '<', operand: '05/03/2014 14:23:00.000' };
        expect(applyFilters(data, [filter])).toBe(true);
      });
      test('invalid strict inferiority', () => {
        const data = { onboardDate: { type: 'time', value: moment('2017-01-03 10:20') } };
        const filter = { field: 'onboardDate', operator: '<', operand: '05/03/2014 00:00:00.000' };
        expect(applyFilters(data, [filter])).toBe(false);
      });

      test('valid non-strict inferiority when value before expected', () => {
        const data = { onboardDate: { type: 'time', value: moment('2010-09-10 11:22:45') } };
        const filter = { field: 'onboardDate', operator: '<=', operand: '05/03/2014 00:00:00.000' };
        expect(applyFilters(data, [filter])).toBe(true);
      });
      test('invalid non-strict inferiority when same second but with milliseconds', () => {
        const data = { onboardDate: { type: 'time', value: moment('2014-03-05 14:22:00:450') } };
        const filter = { field: 'onboardDate', operator: '<=', operand: '05/03/2014 14:22:00.000' };
        expect(applyFilters(data, [filter])).toBe(false);
      });
      test('invalid non-strict inferiority', () => {
        const data = { onboardDate: { type: 'time', value: moment() } };
        const filter = { field: 'onboardDate', operator: '<=', operand: '05/03/2014 00:00:00.000' };
        expect(applyFilters(data, [filter])).toBe(false);
      });

      test('valid strict superiority', () => {
        const data = { onboardDate: { type: 'time', value: moment() } };
        const filter = { field: 'onboardDate', operator: '>', operand: '05/03/2014 00:00:00.000' };
        expect(applyFilters(data, [filter])).toBe(true);
      });
      test('valid strict superiority when second', () => {
        const data = { onboardDate: { type: 'time', value: moment('2014-03-05 14:22:00.432') } };
        const filter = { field: 'onboardDate', operator: '>', operand: '05/03/2014 14:22:00.000' };
        expect(applyFilters(data, [filter])).toBe(true);
      });
      test('invalid strict superiority', () => {
        const data = { onboardDate: { type: 'time', value: moment('2011-01-03 10:20') } };
        const filter = { field: 'onboardDate', operator: '>', operand: '05/03/2014 00:00:00.000' };
        expect(applyFilters(data, [filter])).toBe(false);
      });

      test('valid non-strict superiority when value after expected', () => {
        const data = { onboardDate: { type: 'time', value: moment() } };
        const filter = { field: 'onboardDate', operator: '>=', operand: '05/03/2014 00:00:00.000' };
        expect(applyFilters(data, [filter])).toBe(true);
      });
      test('valid non-strict superiority when same day (whatever the value\'s time)', () => {
        const data = { onboardDate: { type: 'time', value: moment('2014-03-05 14:22:00') } };
        const filter = { field: 'onboardDate', operator: '>=', operand: '05/03/2014 14:22:00.000' };
        expect(applyFilters(data, [filter])).toBe(true);
      });
      test('invalid non-strict superiority', () => {
        const data = { onboardDate: { type: 'time', value: moment('2011-01-01 09:45') } };
        const filter = { field: 'onboardDate', operator: '>=', operand: '05/03/2014 00:00:00.000' };
        expect(applyFilters(data, [filter])).toBe(false);
      });
    });
  });
});
