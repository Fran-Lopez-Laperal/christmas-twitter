const express = require('express')
const router = express.Router();
const misc = require("../controllers/misc.controller")
const users = require("../controllers/users.controller")
const auth = require("../controllers/auth.controller")
const secure = require("../middlewares/secure.mid")


//route misc
//router.get("/", misc.home);

//routes users

router.get("/", users.profile);
router.get("/users/:id", secure.isAuthenticated, users.detail);
router.post("/users/:id/delete", secure.isAuthenticated, users.delete)



// routes to authentication
router.get("/register", auth.register);
router.post("/register", auth.doRegister);
router.get("/login", auth.login);
router.post("/login", auth.doLogin);
router.get("/logout", auth.logout);





module.exports = router;