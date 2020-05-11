const router = require("express").Router();
const { states } = require("../controllers");

router.get("/", states.get);

module.exports = router;
