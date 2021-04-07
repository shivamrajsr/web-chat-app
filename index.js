var express = require('express');

var socket = require('socket.io');
//invoking express function for the app
var app = express();
var server = app.listen(3000, function(){
    console.log('listening for requests on port 3000,');
});


// to make use of server in index.html as the folder is public where index.html is
app.use(express.static('public'));

var io=socket(server);
// connection is made in backend server web socket
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event to sockets at client
   socket.on('typing', function(data){
       socket.broadcast.emit('typing', data);
   });

});
