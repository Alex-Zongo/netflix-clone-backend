const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const myListSchema = Schema({
  userId: String,
  myList: [
    {
      id: String,
      name: String,
      poster_path: String,
      backdrop_path: String,
    },
  ],
});

module.exports = MyList = mongoose.model("MyList", myListSchema);
