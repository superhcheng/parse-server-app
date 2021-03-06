Parse.Cloud.beforeSave("ChatMessage", function(request, response) {
    var inMsg = request.object.get('content');
    var inUsername = request.object.get("name");
    console.log("Name: " + inUsername + "inMsg: " + inMsg);
    if (!inUsername || !inMsg) {
        response.error("Both username and content cannot be empty!");
    } else {
        response.success();
    }
});

Parse.Cloud.afterSave("ChatMessage", function(request, response) {
    var inMsg = request.object.get('content');
    var inUsername = request.object.get("name");
    console.log("Name: " + inUsername + "inMsg: " + inMsg);
    if(inMsg.toLowerCase().indexOf("@bot") >= 0){
        var ChatMessage = Parse.Object.extend("ChatMessage");
        var message = new ChatMessage();
        message.set("name", 'bot');
        message.set("content", 'Hia @' + inUsername + ', how can I help you?');
        message.save().then(function(obj) {
            console.log("Message saved!");
            response.success();
        }, function(err) {
            response.error(err.message);
        });
    }
});