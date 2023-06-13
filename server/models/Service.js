const { Schema, model } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true,
  },
  serviceDesc: {
    type: String,
    required: true,
  },
  // do we want a single category per service or allow multiple ?, if multiple this will have to be an array
  serviceCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    // required: true,
  },
  servicePrice: {
    type: Number,
    required: true,
    default: 0,
  },
  // Represents number of hours to complete, total price would be price * qty
  // We can just do a price as a MVP since it will be hard to calculate required time to complete the task
  serviceQty: {
    type: Number,
    min: 0,
    default: 1,
    // required: true,
  },
  serviceProviders: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Service = model("Service", serviceSchema);
module.exports = Service;
