const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEItemMetadata');
const { getADEItemAlgorithm } = require('./ADEItemAlgorithm.stub');
const { getADEItemMetadataTM } = require('./ADEItemMetadataTM.stub');
const { getAliasRecord } = require('./AliasRecord.stub');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADEItemMetadata.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADEItemMetadata');

const getADEItemMetadata = override => applyOverride({
  itemName: 'SAT_BC_NUMTC13',
  comment: 'sdfsdf',
  longDescription: 'sdf',
  shortDescription: 'sdf',
  aliases: [
    getAliasRecord(),
    getAliasRecord({ alias: 'truc', contextDomain: 'machin' }),
  ],
  unit: 'sdfsdf',
  algorithm: getADEItemAlgorithm(),
  tmMeta: getADEItemMetadataTM(),
}, override);

const getADEItemMetadataProtobuf = override => {
  const toEncode = getADEItemMetadata(override);
  console.log('{{{{{{{', JSON.stringify(Adapter.encode(toEncode), null, ' '));
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADEItemMetadata,
  getADEItemMetadataProtobuf,
};
