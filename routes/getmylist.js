const router = require("express").Router();
const MyList = require("../models/myList");
const User = require("../models/Users");

router.route("/mylist").get(async (req, res) => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(" ");
  const [username, password] = token ? token.split(":") : "";
  const user = await User.findOne({ username }).exec();

  if (!user || user.password !== password) {
    res.status(403).json({ message: "invalid access" });
    return;
  }
  const moviesList = await MyList.findOne({ userId: user._id }).exec();
  if (moviesList) {
    res.status(200).json(moviesList["myList"]);
  } else {
    res.status(200).json([]);
  }
});

module.exports = router;
