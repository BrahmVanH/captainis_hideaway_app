const { Schema, model } = require("mongoose");

const dateSchema = new Schema({
  
  dateValue: {
    type: String,
    require: true
  }
});

const UnavailableDate = model("UnavailableDate", dateSchema);

module.exports = UnavailableDate;