const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://vattsalbhatt:Vattsal123@cluster0.q2i0g.mongodb.net/negast`
  );
};
