const { Schema, model } = require("mongoose");

const Order = require("./Order");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   // required: true,
    //   unique: true,
    //   trim: true,
    // },
    firstName: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
      trim: true,
      defaultValue: "profile-placeholder.png",
    },
    // allow user to register as provider for access to additional properties
    isProvider: {
      type: Boolean,
      required: true,
      default: false,
    },
    // define service - list of services user as a provider can offer
    // services: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Service",
    //   },
    // ],
    orders: [Order.schema],
    //completedOrders: [Order.Schema],
    // userRating
    // provideRating
    // reviewsReceived
    // reviewsProvided
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.pre("save", async function(next) {
  if (!this.profileImage) {
    this.set({profileImage: "profile-placeholder.png"});
  }
  next()
})

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `orderCount` with the number of service requested or completed we have
// userSchema.virtual('placedOrdersCount').get(function () {
//   return this.placedOrders.length;
// });

// userSchema.virtual('completedOrdersCount').get(function () {
//   return this.completedOrders.length;
// });

const User = model("User", userSchema);

module.exports = User;
// userSchema.virtual("placedOrdersCount").get(function () {
//   return this.orders.length;
// });
