# Controllers

## domains

**client/onDomainQuery**
* send a DomainQuery message to DC

**dc/onDomainData**
* receive domains list from DC
* store locally
* forward to client

## sessions

**client/onSessionQuery**
* send a SessionQuey message to DC

**dc/onSessionData**
* receive sessions list from DC
* forward to client

## client lifecycle

**client/onOpen**
* answer to client with 'authenticated' flag

**client/onClose**
* loop on subscriptions and send timebasedSubscription (with 'DELETE' action) for each
* empty all models (connectedData, subscriptions, timebasedData) and singletons (domains, timebars, registeredQueries)

## data

**client/onTimebasedQuery**
* loop over remoteIds
    - loop over intervals
        * retrieve missing intervals from connectedData model
    - loop over missing intervals
        * create a queryId
        * register queryId in registeredQueries singleton
        * register queryId in registeredCallbacks singleton
        * queue a zmq timebasedQuery message (with dataId, query id, interval and filter)
        * add requested { queryId: interval } to connectedData model
    - if dataId not in subscriptions model
        * add dataId to subscriptions model
        * queue a zmq timebasedSubscription message (with 'ADD' action)
    - add remoteId and corresponding filters to subscriptions model
    - loop over intervals
        * retrieve data in timebasedData model
        * queue a ws timebasedData message (sent periodically)
* send queued messages to DC


**dc/onTimebasedArchiveData**
* if queryId not in registeredQueries, stop logic
* get remoteId
* if last chunk of data, set interval as received in connectedData model
* loop over arguments (timestamp, payload) peers
    - deprotobufferize payload
    - store decoded payload in timebasedData model
    - queue a ws timebasedData message (sent periodically)

**dc/onTimebasedPubSubData**
* if dataId not in subscriptions model, stop logic
* get { remoteId: filters } from subscriptions model
* loop over arguments (timestamp, payload) peers
    - loop over remoteId
        * if timestamp not in interval in connectedData model, continue to next iteration
        * deprotobufferize payload
        * apply filters on decode payload
        * store filtered payload in timebasedData model
        * queue a ws timebasedData message (sent periodically)

## cache

**server/onCacheInvalidation**
// trigger by HSS itself

**client/onCacheCleanup**
// trigger by HSC
- loop over expired requests ('remoteId': [interval])
  * remove intervals from connectedData model
  * if there are still requested intervals in connectedData model for this remoteId
    - remove data corresponding to expired intervals from timebasedData model and stop logic
  * get corresponding dataId from connectedData model
  * remove remoteId from connectedData model
  * remove data corresponding to remoteId from timebasedData model
  * remove remoteId for corresponding dataId from subscriptions model
  * if there are still remoteIds in subscriptions model for this dataId, stop logic
  * remove dataId from subscriptions model
  * create a queryId and register a queryid/callbakc association
  * queue a zmq timebasedSubscription message (with 'DELETE' action)
- send queued messages to DC

## dc communication

**dc/onResponse**
* check if query ID exists in registeredCallbacks singleton, if no stop logic
* if status is SUCCESS stop logic
* send error message to client