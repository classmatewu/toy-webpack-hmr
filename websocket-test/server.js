const http = require('http');
const path = require('path')
const sockjs = require('sockjs');
const static = require('node-static')

const echo = sockjs.createServer();
echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
    conn.on('close', function() {});
});

const server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
static(path.resolve(__dirname))
server.listen(9999, '0.0.0.0');