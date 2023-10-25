const { Schema, model } = require("mongoose");

const dateSchema = new Schema({
  propertyName: {
    type: String,
    require: true
  },
  dateValue: {
    type: String,
    require: true
  }
});

const UnavailableDate = model("UnavailableDate", dateSchema);

module.exports = UnavailableDate;