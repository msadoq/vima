import _ from 'lodash';
import asyncSeries from 'async/series';
import passerelle from '../../utils/passerelle/index';

/**
 * List of the conversion to be done for a given datamap
 * @param {*} newViewMap Is viewMap generated by datamap
 */
const mapUnitConvertion = (newViewMap) => {
  const mapConvert = {};
  const viewIdKeys = Object.keys(newViewMap);
  viewIdKeys.forEach((viewIdKey) => {
    const view = newViewMap[viewIdKey].entryPoints;
    const entryPointsKeys = Object.keys(view);
    entryPointsKeys.forEach((epKey) => {
      const ep = view[epKey];
      if (!ep.error) {
        const tbdId = ep.tbdId;
        if (!mapConvert[tbdId]) {
          mapConvert[tbdId] = [];
        }
        const field = ep.field || ep.fieldY;
        const convertFrom = ep.convertFrom;
        const convertTo = ep.convertTo;
        if (convertFrom && convertTo) {
          if (!_.find(mapConvert[tbdId], { field, convertFrom, convertTo })){
            mapConvert[tbdId].push({ field, convertFrom, convertTo });
          }
        }
      }
    });
  });
  return mapConvert;
};

/**
 * Convert data from data inject with async parallel
 * @param {*} toConvertMap map given by mapUnitConvertion method
 * @param {*} dataToInject new Data to inject (see injectData middleware and general VIMA data consumption)
 * @param {*} cb Callback waiting for the new dataToInjectCOnverted (dataToInject + gpinuc field)
 */
const convertData = (toConvertMap, dataToInject, cb) => {
  const asyncMap = {};
  const tbdIdKeys = Object.keys(dataToInject);
  tbdIdKeys.forEach((tbdIdKey) => {
    const timestampMap = dataToInject[tbdIdKey];
    const timestampArray = Object.keys(timestampMap);
    const arrayToConvert = toConvertMap[tbdIdKey];
    if (arrayToConvert) {
      timestampArray.forEach((timestamp) => {
        arrayToConvert.forEach(({ field, convertFrom, convertTo }) => {
          const value = timestampMap[timestamp][field];
          asyncMap[`${tbdIdKey}${field}${convertFrom}${convertTo}${timestamp}`] = ((callbackAsync) => {
            passerelle.caller('gpinuc',
              {
                // TODO, add the real valu = value: value.symbol,
                value: '123',
                unitesource: convertFrom,
                unitectible: convertTo,
              },
              (response) => {
                callbackAsync(null,
                  { response,
                    tbdIdKey,
                    field,
                    convertFrom,
                    convertTo,
                    timestamp,
                    fromValue: value,
                  }
                );
              }
            );
          });
        });
      });
    }
  });
  asyncSeries(asyncMap, (err, results) => {
    const resultsKeys = Object.keys(results);
    const convertedDataToInject = { ...dataToInject };
    resultsKeys.forEach((resultsKey) => {
      const {
        response,
        tbdIdKey,
        field,
        convertTo,
        timestamp } = results[resultsKey];
      _.set(convertedDataToInject, [tbdIdKey, timestamp, 'gpinuc', field, convertTo], response);
    });

    cb(err, convertedDataToInject);
    if (err) {
      console.log(err);
    }
  });
};

export default {
  mapUnitConvertion,
  convertData,
};