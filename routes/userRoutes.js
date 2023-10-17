const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
  getallusers,
  updateuser,getuser, deleteuser
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get('/allusers', validateToken,getallusers)
router.get("/getuser/:userId",validateToken,getuser)
router.put("/updateuser/:userId",validateToken,updateuser)
router.delete("/deleteuser/:userId",validateToken,deleteuser)
router.get("/current", validateToken, currentUser);

module.exports = router;
