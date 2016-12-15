var MongoClient=require("mongodb").MongoClient;
function newURL(req,res,pathName){
	var url=pathName.substring(7);
	console.log("Request Handle for new "+url);
	var regExp=/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	if(url.match(new RegExp(regExp))){
		console.log("Url valid");
		MongoClient.connect("mongodb://localhost:27017/urls", function(err, db) {
			if(!err) {
				console.log("We are connected");
				var collection=db.collection("urls");
				var obj={"link":url};
				collection.findOne(obj,function(err,results){
					if(!results){
						console.log(results);
						collection.insert(obj,function(err,docsInserted){
							console.log("Link "+url+" inserted in the DB");
							console.log(docsInserted.insertedIds[0]);
							var obj={
								"original_url":url,
								"short_url":req.headers.host+"/"+docsInserted.insertedIds[0]+"/"
							};
							res.writeHead(200,{"Content-Type":"text/html"});
							res.write(JSON.stringify(obj));
							res.end();
						});
					}else{
						console.log(results);
						var obj={
								"original_url":url,
								"short_url":req.headers.host+"/"+results["_id"]+"/"
							};
						res.writeHead(200,{"Content-Type":"text/html"});
						res.write(JSON.stringify(obj));
						res.end();
						console.log("The link exists in the DB");

					}
				});
			}
		});
	}else{
		console.log("Url invalid");
	}
}
exports.newURL=newURL;