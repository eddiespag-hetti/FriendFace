const router = require("express").Router();

// Requiring all 'user' functions  from the controllers folder
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../contollers/userController");

//  /api/users - find and create users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId - find a single user and update
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser); // delete user by id

// /api/users/:id/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;
