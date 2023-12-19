const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

// create and get a user
router.route("/").get(userController.getUser);
router.post("/create", userController.createUser);
// jwt
router.get("/jwt", userController.getToken);

//getAllUser)
router.get("/all", userController.getAllUser);

// update a user role
router.patch("/update-role", userController.updateUser);

router.get("/map", userController.getMap);
router.get("/map/getTransporter", userController.getTransporter);

// router.get("/getNotifyToken", userController.createNotify);
// router.post("/postNotifyToken", userController.getNotify);
// delete a user
router.delete(
  "/:id",
  verifyToken,
  authorization("admin"),
  userController.deleteUser
);

module.exports = router;
