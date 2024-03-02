const http = require("http");

http.createServer(function (req, res) {
	res.write("learning fullstack");
	res.end();
}).listen(3000);

console.log("server started on port 3000");

