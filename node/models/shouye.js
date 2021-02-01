var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var Schema = mongoose.Schema;
var LunboSchema = new Schema({
  address: {
    type: String,
  },
  title: {
    type: String,
  },
  picture: {
    type: Array,
  },
  essay: {
    type: String,
  },
  comments:{
    type: Array
  }
});
module.exports = mongoose.model("Lunbo", LunboSchema);
