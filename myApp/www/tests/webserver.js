//webserver.js mocks a webservice//
//https://github.com/noamtcohen/Narma/blob/master/app/webserver.js//

function startWebServer(port,staticResponse,onStart){
  var http = require('http');

  var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(staticResponse);
  });

  server.on('error',function(err){
    if(err.code=='EADDRINUSE')
      onStart();
  });

  server.listen(port,onStart);
}
