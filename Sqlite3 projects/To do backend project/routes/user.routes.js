const express = require("express");

const getuserprofile = require("../controllers/user.controller");
const authentication = require("../middleware/auth");

const router = express.Router();

router.get(
    "/profile",
    authentication,
    getuserprofile
);

module.exports = router;