// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

module.exports = {
  encode: data => ({
    itemNamespace: data.itemNamespace,
    name: data.name,
    oid: data.oid,
    domainId: data.domainId,
    parentDomainId: data.parentDomainId,
  }),
  decode: data => ({
    itemNamespace: data.itemNamespace,
    name: data.name,
    oid: data.oid,
    domainId: data.domainId,
    parentDomainId: data.parentDomainId,
  }),
};
