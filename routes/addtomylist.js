const router = require("express").Router();
const MyList = require("../models/myList");
const User = require("../models/Users");

router.route("/addtomylist").post(async (req, res) => {
  const authHeader = req.headers.authorization;
  const movieItems = req.body;
  const [, token] = authHeader.split(" ");
  const [username, password] = token.split(":");

  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403).json({ message: "invalid access" });
    return;
  }
  const movieList = await MyList.findOne({ userId: user._id }).exec();
  if (movieList) {
    movieList.myList = movieItems;
    movieList.save();
  } else {
    const newMovieList = new MyList({
      userId: user._id.toString(),
      myList: movieItems,
    });
    newMovieList
      .save()
      .then(() => {
        res.json({ message: "movies saved!" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  res.json({ message: "movies saved!" });
});

module.exports = router;
