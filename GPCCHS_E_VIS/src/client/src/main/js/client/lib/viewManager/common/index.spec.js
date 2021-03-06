/* eslint-disable max-len */
import {
  buildFormulaForAutocomplete,
  handleSubmit,
  validateRequiredFields,
  getEntryPointWithDataTypeInitialized,
} from 'viewManager/common';
import { spy } from 'sinon';
import deepFreeze from 'deep-freeze';
import _cloneDeep from 'lodash/cloneDeep';
import { SDB_VALUE_OPTION, TIME_BASED_DATA_OPTION } from '../commonEditor/Fields/DataTypeField';

const constants = require('constants');

const PACKETS_TYPES = constants.PACKETS_TYPES;

describe('buildFormulaForAutocomplete', () => {
  [undefined, null, 'Reporting'].forEach((catalog) => {
    [undefined, null, 'AGA_AM_ACQPRIORITY'].forEach((catalogItem) => {
      [
        undefined,
        null,
        PACKETS_TYPES.REPORTING_PARAMETER,
        PACKETS_TYPES.DECOMMUTED_PACKET,
        PACKETS_TYPES.CLCW,
        PACKETS_TYPES.ISIS_AGGREGATION,
        PACKETS_TYPES.RM,
        PACKETS_TYPES.TM,
      ].forEach((comObject) => {
        [undefined, null, 'convertedValue'].forEach((field) => {
          const formula = buildFormulaForAutocomplete(catalog, catalogItem, comObject, field);
          test(`buildFormula :: [${catalog}][${catalogItem}][${comObject}][${field}] || ${formula}`, () => {
            if (catalog && catalogItem && comObject && comObject === PACKETS_TYPES.REPORTING_PARAMETER) {
              expect(formula).toEqual(`Reporting.AGA_AM_ACQPRIORITY<${PACKETS_TYPES.REPORTING_PARAMETER}>.convertedValue`);
            } else if (catalog && catalogItem && comObject && comObject === PACKETS_TYPES.DECOMMUTED_PACKET) {
              expect(formula).toEqual(`Reporting.AGA_AM_ACQPRIORITY<${PACKETS_TYPES.DECOMMUTED_PACKET}>`);
            } else if (catalog && catalogItem && comObject && field) {
              expect(formula).toEqual(`Reporting.AGA_AM_ACQPRIORITY<${comObject}>.convertedValue`);
            } else if (catalog && catalogItem && comObject) {
              expect(formula).toEqual(`Reporting.AGA_AM_ACQPRIORITY<${comObject}>`);
            } else if (catalog && catalogItem) {
              expect(formula).toEqual('Reporting.AGA_AM_ACQPRIORITY');
            } else if (catalog) {
              expect(formula).toEqual('Reporting');
            } else {
              expect(formula).toEqual('');
            }
          });
        });
      });
    });
  });
});

describe('handleSubmit', () => {
  const ANY_VIEW_ID = '6q48ds-sd57qsdd57yt8-8qs9nyt9i54f0f50';
  const SUBMITTED_VALUES = deepFreeze({
    id: '42',
    connectedData: {
      catalog: 'reporting',
      path: 'ajanivo',
      displayMode: 'il',
      catalogItem: 'inem',
      comObject: 'ion',
      refTimestamp: 'erature',
      comObjectField: 'or',
      provider: 'ien',
    },
  });

  test('should remove path and display mode when dataType = \'time based data\'', () => {
    const updateStub = spy();
    const values = _cloneDeep(SUBMITTED_VALUES);
    values.connectedData.dataType = TIME_BASED_DATA_OPTION.value;
    handleSubmit(values, updateStub, ANY_VIEW_ID);
    expect(updateStub.args[0]).toEqual([ANY_VIEW_ID, values.id, {
      id: '42',
      connectedData: {
        dataType: TIME_BASED_DATA_OPTION.value,
        catalog: 'reporting',
        catalogItem: 'inem',
        comObject: 'ion',
        refTimestamp: 'erature',
        comObjectField: 'or',
        provider: 'ien',
        formula: 'reporting.inem<ion>.or',
      },
    }]);
  });
  test('should remove catalogItem, comObject, refTimestamp, comObjectField and provider when mode when dataType = \'SBD value\'', () => {
    const updateStub = spy();
    const values = _cloneDeep(SUBMITTED_VALUES);
    values.connectedData.dataType = SDB_VALUE_OPTION.value;
    handleSubmit(values, updateStub, ANY_VIEW_ID);
    expect(updateStub.args[0]).toEqual([ANY_VIEW_ID, values.id, {
      id: '42',
      connectedData: {
        dataType: SDB_VALUE_OPTION.value,
        catalog: 'reporting',
        path: 'ajanivo',
        displayMode: 'il',
        formula: 'reporting',
      },
    }]);
  });
  test('should not remove anything when no dataType', () => {
    const updateStub = spy();
    const values = _cloneDeep(SUBMITTED_VALUES);
    handleSubmit(values, updateStub, ANY_VIEW_ID);
    expect(updateStub.args[0]).toEqual([ANY_VIEW_ID, values.id, {
      ...SUBMITTED_VALUES,
      connectedData: {
        catalog: 'reporting',
        formula: 'reporting',
      },
    }]);
  });
});


describe('validateRequiredFields', () => {
  test('should find an error when html field is empty', () => {
    const values = { html: 'bidule' };
    const validationErrors = validateRequiredFields(['html', 'truc'], values);
    expect(Object.keys(validationErrors)).toEqual(['truc']);
  });

  test('can be combined with other validation rules', () => {
    const requiredFields = ['name', 'date'];
    const validate = (values = {}) => {
      const errors = {};
      if (values.name !== 'niobé') {
        errors.name = 'Invalid name';
      }
      return {
        ...errors,
        ...validateRequiredFields(requiredFields, values),
      };
    };

    const values = { name: 'bidule' };
    const validationErrors = validate(values);
    expect(Object.keys(validationErrors)).toEqual(['name', 'date']); // FIXME I should test a combination with other errors
  });

  test('should return a validation function when no values are given as argument', () => {
    const requiredFields = ['name'];
    const validationMethod = validateRequiredFields(requiredFields);
    expect(validationMethod).toBeInstanceOf(Function);
    const errors = validationMethod({});
    expect(Object.keys(errors)).toEqual(['name']);
  });

  describe('getEntryPointWithDataTypeInitialized', () => {
    it('should return the exact same entryPoint if dataType defined', () => {
      const entryPoint = { connectedData: { dataType: 'Niobé' } };
      expect(getEntryPointWithDataTypeInitialized(entryPoint)).toBe(entryPoint);
    });
    it('should set dataType if undefined', () => {
      const entryPoint = {};
      expect(getEntryPointWithDataTypeInitialized(entryPoint))
        .toEqual({ connectedData: { dataType: TIME_BASED_DATA_OPTION.value } });
    });
    it('should not mutate the entryPoint', () => {
      const entryPoint = {};
      expect(getEntryPointWithDataTypeInitialized(entryPoint)).not.toBe(entryPoint);
    });
  });
});
