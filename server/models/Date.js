const { Schema, model } = require("mongoose");

const dateSchema = new Schema({
  dateValue: {
    type: String,
    require: true
  }
});

const Date = model("Date", dateSchema);

module.exports = Date;