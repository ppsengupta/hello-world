var http = require('http');
var apigee = require('apigee-access');

var server = http.createServer(function (req, res) {
    
    console.log('Request :: ' + JSON.stringify(req.Body));
    
    var proxypath = apigee.getVariable(req, 'proxy.pathsuffix');
    console.log('Proxy Path : ' + proxypath);
    
    res.writeHead(200, {'Content-Type': 'application/json'});
 
    var body = "{\"status\": \"success\"}";                            
    res.end(body);
});

var port = 3000;

var host = '127.0.0.1';

server.listen(port, host);

console.log('Listening at http://' + host + ':' + port);