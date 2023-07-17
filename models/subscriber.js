const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  //defining schema of databae
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("subscriber", schema);
//we export it like this because when we import it in another file it allows us to
//interect directly with the database

//mongoose.connection, new mongoose.schema({}), mongoose.model("",schema)
