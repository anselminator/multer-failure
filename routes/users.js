var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});

router.get("/hello", (req, res) => {
    res.send("<h3>This is the USERS HELLO page</h3>");
});

module.exports = router;