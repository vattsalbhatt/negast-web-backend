const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const buyerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true, length: 10 },
    email: { type: String, required: true },
    profile: { type: String, default: "buyer" },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

buyerSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

buyerSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("buyer", buyerSchema);
