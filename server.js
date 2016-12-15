var http=require("http");
var url=require("url");
var router=require("./router");
var hostname;

var server=http.createServer(function(req,res){
	hostname=req.headers.host;
	var request=url.parse(req.url).pathname;
	console.log("Request Received for "+request);
	var requestedDirection=request.substring(1);
	router.route(req,requestedDirection,res);

});
server.listen(process.env.PORT ||8080);
console.log("Server Running");