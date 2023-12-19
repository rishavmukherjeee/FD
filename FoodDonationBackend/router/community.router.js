const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community.controller");

router.post("/create", communityController.createPost);
router.get("/get", communityController.getAll);
router.delete("/delete", communityController.delete);

module.exports = router;
