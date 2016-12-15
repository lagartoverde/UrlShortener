var http=require("http");
var url=require("url");

var server=http.createServer(function(req,res){
	
});
server.listen(process.env.PORT ||8080);
console.log("Server Running");