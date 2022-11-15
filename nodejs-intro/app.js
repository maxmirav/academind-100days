const fs = require('fs');
const path = require('path'); //so that this will work on all operating systems

// const http = require('http');
const express = require('express');

const app = express();

//always use app.use(express.urlencoded()) to parse data to readable JSON - OK SO DI MASYADO INEXPLAIN NI MAX TO BASTA GAWIN LANG DAW LOL
app.use(express.urlencoded({extended: false}));


app.get('/currenttime', function(req, res) {
    res.send('<h1>' +  new Date().toISOString() + '</h1>');
});

app.get('/', function(req, res) {
    //use name in the input so you can extract it 
    res.send('<form action="/store-user" method="POST"><label>Your Name<label><input type="text" name="username"><button>Submit</button></form>')
});

app.post('/store-user', function(req, res) {
    const userName = req.body.username;

    const filePath = path.join(__dirname, 'data', 'users.json'); //so now this works on all platforms

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);//parse is what you need if you have JSON and want to turn it into a JS object or array
    existingUsers.push(userName);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); //then turn that JS array into JSOn again that's why we have stringify here

    res.send('<h1>Username stored!</h1>')
})

app.get('/users', function(req, res) {
    const filePath = path.join(__dirname, 'data', 'users.json'); 
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    let responseData = '<ul>';
    
    for(const user of existingUsers) {
        responseData += '<li>' + user + '</li>'
    }
    responseData += '</ul>';

    res.send(responseData);
});

app.listen(3000);

//original node code below (not express)
//can be named anything we want but we are naming it handleRequest
// function handleRequest(request, response) {

//     if(request.url === '/currenttime') {
//         response.statusCode = 200;
//         response.end('<h1>' +  new Date().toISOString() + '</h1>');
//     } else if (request.url === '/') {
//         response.statusCode = 200;
//         response.end('<h1>Hello World!</h1>');
//     }
// }

// //createServer expects a function
// const server = http.createServer(handleRequest);

// server.listen(3000);