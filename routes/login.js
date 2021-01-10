const router = require("express").Router();

let User = require("../models/Users");
const validateLoginInput = require("../inputValidator/validateLoginInput");

router.route("/login").post((req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { username, password } = req.body;
  User.findOne({ username }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(403).json({ usernotfound: "User not found" });
    }
    //check password
    if (user.password !== password) {
      return res.status(404).json({ passwordwrong: "Password incorrect" });
    } else {
      return res.status(200).json({ loginSuccess: "Succesfully Logged In" });
    }
  });
});

module.exports = router;
