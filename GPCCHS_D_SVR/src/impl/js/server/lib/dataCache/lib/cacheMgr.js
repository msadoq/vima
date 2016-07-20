const { dcPullSockets } = require('../../io/zmq');

const binCache = require('./binCacheApi.js');
const jsonCache = require('./jsonCacheApi.js');
const dataTypesCtrl = require('../../dataTypeManager');
const subscriptionMgr = require('./subscriptionsMgr');
const { cacheWebsocket } = require('../../io/socket.io');

exports.newSubscription = (subscription) => {
  subscriptionMgr.addSubscription(subscription);
  jsonCache.findData(subscription).then((storedData) => {
    const batPoints = [];
    storedData.forEach((data) => {
      cacheWebsocket().emit('Parameters', data.jsonPayload);
      const jsonPayLoad = data.jsonPayload;
      jsonPayLoad.parameters.forEach((item) => {
        const batPoint = [];
        batPoint.push(data.dataTime);
        batPoint.push(item.rawValue);
        batPoints.push(batPoint);
      });
    });
    const plotJson = {
      type: 'addPoints',
      id: 'batman',
      points: batPoints,
    };
    cacheWebsocket().emit(`plot${subscription.subId}`, JSON.stringify(plotJson));
  });
};

const onMessage = (header, meta, payload) => {
  console.log('ONMESSAGE');
  const metaStr = new Buffer(meta).toString('utf8').split('\0')[0];
  const metaJson = JSON.parse(metaStr);
  const metaBin = JSON.parse(metaStr);

  binCache.addData(metaBin, payload).then((insertedBinData) => {});
  dataTypesCtrl.binToJson(metaJson, payload).then((decodedJson) => {
    // console.log('Add Json Data');
    jsonCache.addData(metaJson, decodedJson).then((insertedJsonData) => { /* console.log(insertedJsonData); */ });
    // console.log(`REQUIRING SUBSCRIPTION ${metaJson.catalog}.${metaJson.parameter}<${metaJson.type}>`);
    const subscriptions = subscriptionMgr.getSubscriptions(metaJson);
    // console.log(`SUB SIZE: ${subscriptions.length}`);
    subscriptions.forEach((subscription) => {
      cacheWebsocket().emit('Parameters', decodedJson);
      const batPoint = [];
      batPoint.push(metaJson.timestamp);
      batPoint.push(decodedJson.rawValue);


      // console.log(subscription.subId);
      cacheWebsocket().emit(`plot${subscription.subId}`, batPoint);
   
    });
  });
};



const init = () => { console.log('INIT');dcPullSockets.map((s) => s.on('message', onMessage)); };

module.exports = { init };
