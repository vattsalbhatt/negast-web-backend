const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const sellerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true, length: 10 },
    email: { type: String, required: true },
    profile: { type: String, default: "seller"},
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

sellerSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

sellerSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("seller", sellerSchema);
