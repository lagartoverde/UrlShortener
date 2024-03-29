var requestHandlers=require("./requestHandlers.js");
var MongoClient=require("mongodb").MongoClient;
var mongodb=require("mongodb");
function route(req,pathName,res){
	console.log("Received routing request for "+pathName);
	var array=pathName.split("/");
	var event=array[0];
	if(typeof requestHandlers[event] == "function"){
		requestHandlers[event](req,res,pathName);
	}else{
		MongoClient.connect("mongodb://root:root@ds135818.mlab.com:35818/urlshortening", function(err, db) {
			if(!err) {
				try{
					console.log(event);
					var collection=db.collection("urls");
					var o_id=new mongodb.ObjectID(event);
					collection.findOne({"_id": o_id },function(err,result){
						if(result){
							res.writeHead(301,{Location:result.link});
							res.end();
						}else{
							res.writeHead(404,{"Content-Type":"text/html"});
							res.end("404 Page Not Found");
						}
					});
				}catch(err){
					console.log(err);
					res.writeHead(404,{"Content-Type":"text/html"});
					res.end("404 Page Not Found");
				}
			}
		});
		
	}
}
exports.route=route;