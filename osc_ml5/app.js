const osc = require('node-osc');

//import express 
const express = require('express');
//create express object named app
const app = express();

//instantiate a server on port 3000
const server = app.listen(3000);
const io = require('socket.io')(server);

//expose the local public folder for inluding files js, css etc..
app.use(express.static('public'));

//on a request to / serve index.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

//Connect to server, Our device
const oscServer = new osc.Server(9999, '0.0.0.0');
const oscClient = new osc.Client('127.0.0.1', 3333);

//When we recieve a message send it as a web socket
oscServer.on("message", function (msg, info) {
	console.log(msg);
	io.sockets.emit('mysocket', msg);
});

// Receive keypoints from browser, send to ESP32
io.of('/').on('connection', (socket) => {
	console.log(socket.id + ' ml5 sketch connected');
	socket.on('keypoints', (keypoints) => { 
		oscClient.send('/keypoints', keypoints, (err) => { // might not work?
			if (err) console.error(err);
			client.close();
		});
	});
	socket.on('disconnect', () => {
		console.log(socket.id + ' ml5 sketch disconnected');
	});
});

