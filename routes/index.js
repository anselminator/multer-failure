var express = require("express");
var router = express.Router();
var path = require("path");
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});
router.get("/upload2", function(req, res, next) {
    res.render("form.html", { title: "Upload some pic" });
    next();
});

router.get("/upload", function(req, res, next) {
    console.log(__dirname);
    var options = {
        root: path.join(__dirname, "../public"),
        dotfiles: "deny",
        headers: {
            "x-timestamp": Date.now(),
            "x-sent": true,
        },
    };
    var fileName = "form.html";
    console.log("trying to serve this: ", options.root, " ./ ", fileName);
    res.sendFile(fileName, options, function(err) {
        if (err) {
            next(err);
        } else {
            console.log("Sent:", fileName);
        }
    });
});
router.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
    console.log("SINGLE req.body:", req.body);
    console.log("SINGLE req.file:", req.file);
    console.log("SINGLE req.file.path:", req.file.path);
    console.log("dirname:", __dirname);

    console.log("SINGLE req.file.full_path:", __dirname + req.file.path);
    const fullpath = __dirname + "\\..\\" + req.file.path;
    const altpath =
        "D:\\new work\\fortbildung wbs\\multer_exercise\\" + req.file.path;
    console.log("fullpath:", fullpath);
    console.log("altpath:", altpath);

    //    res.header("Content-Security-Policy", "img-src ", "self ");
    res.send(
        `congrats for uploading this picture  <img src="${req.file.filename}" /> <br><img src="${altpath}" /> <br> <img src="file:///D:/new work/fortbildung/multer_exercise/${req.file.path}" /> <br>`
    );
});
router.post(
    "/upload-multiple-profile-pic",
    upload.array("myFiles", 12),
    (req, res) => {
        console.log("MULTI req.body:", req.body);
        console.log("MULTI req.files:", req.files[0]);
        res.send("congrats for uploading theese many pictures ");
    }
);

router.get("/hello", (req, res) => {
    res.send("<h3>This is the HELLO page</h3>");
    next();
});
module.exports = router;