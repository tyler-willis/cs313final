var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static'); // for serving files

var fileServer = new static.Server('./');
	
app.listen(80);

function handler (request, response) {

    request.addListener('end', function () {
        fileServer.serve(request, response); // this will return the correct file
    });
    request.resume();
}

io.sockets.on('connection', function (socket) {

	socket.on('mousemove', function (data) {

		socket.broadcast.emit('moving', data);
	});
});