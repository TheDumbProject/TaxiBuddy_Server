const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getUsers);

router.get("/search", controller.searchResult);

module.exports = router;
