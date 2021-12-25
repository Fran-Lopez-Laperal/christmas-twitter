const express = require('express')
const router = express.Router();
const misc = require("../controllers/misc.controller")
const users = require("../controllers/users.controller")
const auth = require("../controllers/auth.controller")

//route misc
router.get("/", misc.home)

//routes users


// routes to authentication
router.get("/register", auth.register);
router.post("/register", auth.doRegister);
router.get("/login", auth.login);
router.post("/login", auth.doLogin);



module.exports = router;