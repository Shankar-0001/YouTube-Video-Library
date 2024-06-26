var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
var conStr = "mongodb+srv://Shekhar123:Shekhar123@cluster0.dyoi4ck.mongodb.net";

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());


// For get Users

app.get("/users", (req, res) => {
    mongoClient.connect(conStr).then(obj => {
        var database = obj.db("youtubedb");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});


//For Register Users

app.post("/registeruser", (req, res) => {
    var user = {
        "UserId": req.body.UserId,
        "UserName": req.body.UserName,
        "Password": req.body.Password,
        "Email": req.body.Email,
        "Mobile": req.body.Mobile
    };
    mongoClient.connect(conStr).then(obj => {
        var database = obj.db("youtubedb");
        database.collection("users").insertOne(user).then(() => {
            console.log("User Registered");
        })
    })
});


// For get admin

app.get("/admin", (req, res) => {
    mongoClient.connect(conStr).then(obj => {
        var database = obj.db("youtubedb");
        database.collection("admin").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});


// For get Videos

app.get("/videos", (req, res) => {
    mongoClient.connect(conStr).then(obj => {
        var database = obj.db("youtubedb");
        database.collection("videos").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

// For get Videos by Id
app.get("/videos/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(conStr).then(obj => {
        var database = obj.db("youtubedb");
        database.collection("videos").find({ VideoId: id }).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

// For AddVideo

app.post("/addvideo", (req, res) => {
    var videos = {
        "VideoId": parseInt(req.body.VideoId),
        "Title": req.body.Title,
        "Url": req.body.Url,
        "Likes": parseInt(req.body.Likes),
        "Views": parseInt(req.body.Views)
    };
    mongoClient.connect(conStr).then(obj => {
        var database = obj.db("youtubedb");
        database.collection("videos").insertOne(videos).then(() => {
            console.log("Video Added");
            res.end();
        })
    })
});


// For Update Video

app.put("/updatevideo/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var video = {
        "VideoId": req.body.Videoold,
        "Title": req.body.Title,
        "Url": req.body.Url,
        "Likes": parseInt(req.body.Likes),
        "Views": parseInt(req.body.Views)
    };
    mongoClient.connect(conStr).then(obj => {
        var database = obj.db("youtubedb");
        database.collection("videos").updateOne({ VideoId: id }, { $set: video }).then(() => {
            console.log("Video Updated");
        })
    })
});

// for delete video

app.delete("/deletevideo/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(conStr).then(obj => {
        var database = obj.db("youtubedb");
        database.collection("videos").deleteOne({ VideoId: id }).then(() => {
            console.log("Video Deleted");
            res.end();
        })
    })
});

//for categories

app.get("/categories", (req, res) => {
    mongoClient.connect(conStr).then(obj => {
        var database = obj.db("youtubedb");
        database.collection("categories").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});


app.listen(4400);
console.log(`Server Started : http://127.0.0.1:4400`);