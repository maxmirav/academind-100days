const http = require('http');

//can be named anything we want but we are naming it handleRequest
function handleRequest(request, response) {

    if(request.url === '/currenttime') {
        response.statusCode = 200;
        response.end('<h1>' +  new Date().toISOString() + '</h1>');
    } else if (request.url === '/') {
        response.statusCode = 200;
        response.end('<h1>Hello World!</h1>');
    }
}

//createServer expects a function
const server = http.createServer(handleRequest);

server.listen(3000);