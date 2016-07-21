const http = require('http');

let type = null;
let paramType = null;
let day = 'default';
let length = 1;

const lengthOfDay = 86400000;

//const startValue = 1467496800;
const startValue = 1420675200000;

const visuWindow = {'dInf': 0,'dSup': 0};

const types = {
    'ag' : 'Aggregation',
    'rp' : 'ReportingParameter',
};

const paramTypes = {
    '1' : 'ATT_BC_STR1VOLTAGE',
    '2' : 'ATT_BC_STR1STRSAQ0',
    '3' : 'ATT_BC_STR1STRSAQ1',
    '4' : 'ATT_BC_STR1STRSAQ2',
};

const days = {
    'default' : 0,
    'lu' : 1,
    'ma' : 2,
    'me' : 3,
    'je' : 4,
    've' : 5,
    'sa' : 6,
    'di' : 7
}

if (process.argv[2] in types) {
    type = types[process.argv[2]];
    paramType = paramTypes[process.argv[5]];
    if (process.argv[3] in days) {
        day = process.argv[3];
        visuWindow.dInf = startValue + days[day]*lengthOfDay;
        if (!isNaN(parseInt(process.argv[4], 10))) {
            length = parseInt(process.argv[4], 10);
        }
        visuWindow.dSup = visuWindow.dInf + length*lengthOfDay;
    }
}

console.log('DAY: '+length+' day(s) from '+day+' -> '+visuWindow.dInf+' - '+visuWindow.dSup);

jsonData = {
    'jsonElem' : {
        'DataFullName': 'Reporting.'+paramType+'<ReportingParameter>',
        'Field': '',
        'DomainId': 0,
        'TimeLineType': 'session',
        'SessionId': 1,
        'SetFileName': '',
        'SubscriptionState': 'Play',
        'VisuSpeed': 0,
        'VisuWindow': visuWindow, 
        'Filter': ''
    }
}

//performRequest('/api/subscriptions','POST',jsonData);

var postData = JSON.stringify(jsonData);

var options = {
  hostname: '127.0.0.1',
  port: 1337,
  path: '/api/subscriptions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData, 'utf8')
  }
};

var req = http.request(options, (res) => {
    //console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);

    res.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
    });
    res.on('end', () => {
        //console.log('No more data in response.')
    })
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();
