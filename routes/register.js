const router = require("express").Router();

let User = require("../models/Users");

const validateRegisterInput = require("../inputValidator/validateRegisterInput");

router.route("/register").post((req, res) => {
  const { username, password } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username }).then((user) => {
    if (user) {
      return res.status(400).json({ username: "user already exists" });
    } else {
      const newUser = new User({ username, password });
      newUser
        .save()
        .then(() => {
          res.json({ message: "user created successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

module.exports = router;
