var loki = require('lokijs');
var connectedDatadb = new loki('connectedData.json');

var connectedData = connectedDatadb.addCollection('connectedData');

exports.addDataId = function(connectedDataJson) {
    return new Promise(function(resolve, reject) {
        resolve(connectedData.insert(connectedDataJson))
    });
}

exports.findConnectedData = function(jsonFilter) {
    return connectedData.find({'session' : jsonFilter.SesionId});
}

/*var addDataId = function(dataIdJson) {
    return dataIds.insert(JSON.parse(dataIdJson));
}*/

/*var updateItem = function(key, value, res) {
    myCache.set(key, value, function( err, success ){
        if( !err && success ){
            console.log( success );
            res.json({ message: 'Item updated'});  
        }
    });
}*/

/*var getItemByKey = function(key) {
    var returnValue;
    myCache.get(key, function( err, value ){
        if( !err ){
            if(value == undefined){
                console.log('Key not found'); 
            }else{
                console.log('Get value of key:' + value);
                returnValue = value;
            } 
        }
    });
    return returnValue;
}*/

/*var deleteItemByKey = function(key, res) {
    myCache.del( "myKey", function( err, count ){
        if( !err ){
            console.log( count ); 
            res.json({message : 'Item deleted'});
        }
    });
}*/

/*var getAllKeys = function(res) {
    myCache.keys( function( err, mykeys ){
    if( !err ){
        console.log( mykeys );
        res.json(mykeys);
    }
    });
}*/

