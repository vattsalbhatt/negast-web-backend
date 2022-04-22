const express = require(`express`);
const connect = require("./configs/db");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 1234;

const buyerController = require("./controllers/buyer.controller");
const sellerController = require("./controllers/seller.controller");
const categoryController = require("./controllers/category.controller");
const productController = require("./controllers/product.controller");

app.use("/buyers", buyerController);
app.use("/sellers", sellerController);
app.use("/categories", categoryController);
app.use("/products", productController);

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`port is listening on ${PORT}`);
  } catch (err) {
    console.log("err", err);
  }
});
