const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  serviceQty: {
    type: Number,
    min: 0,
    default: 1,
    // required: true,
  },
  orderPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  serviceDate: {
    type: Date,
    default: Date.now,
    // required: true,
  },
});

const Order = model("Order", orderSchema);
module.exports = Order;
