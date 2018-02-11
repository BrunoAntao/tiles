const compression = require('compression');
const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 80;

app.set('view engine', 'ejs');
app.use(compression());
app.use('/client', express.static('client'));

require('./server/routes.js')(app);

http.listen(port, function () {

    console.log('listening on: ' + port);

    io.on('connection', function (socket) {

        console.log('User ' + socket.id + ': connected');

        socket.on('map save', function (map) {

            console.log('User ' + socket.id + ': saved map');
            fs.writeFileSync('./maps/' + map.name + '.json', JSON.stringify(map.data));

        });

        socket.on('fetch maplist', function () {

            console.log('User ' + socket.id + ': fetched maplist');
            let maplist = fs.readdirSync('./maps');

            socket.emit('maplist', maplist);

        });

        socket.on('fetch map', function (mapName) {

            console.log('User ' + socket.id + ': fetched map');
            let map = JSON.parse(fs.readFileSync('./maps/' + mapName));

            socket.emit('map', map);

        });

        socket.on('capture', function (c) {

            console.log('User ' + socket.id + ': captured');
            fs.writeFileSync('image.png', c.replace(/^data:image\/\w+;base64,/, ""), 'base64');

        });

        socket.on('resource', function (res) {

            console.log('User ' + socket.id + ': resource ' + JSON.stringify(res));
            let resources = JSON.parse(fs.readFileSync('./client/assets/resources.json'));

            resources.push(res);

            fs.writeFileSync('./client/assets/resources.json', JSON.stringify(resources));

        });

        socket.on('disconnect', function () {

            console.log('User ' + socket.id + ': disconected');

        });

    });

});