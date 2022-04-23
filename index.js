const express = require(`express`);
const connect = require("./configs/db");
const app = express();
const http = require("http");
app.use(express.json());
const { Server } = require("socket.io");
const server = http.createServer(app);

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 1234;

const buyerController = require("./controllers/buyer.controller");
const sellerController = require("./controllers/seller.controller");
const categoryController = require("./controllers/category.controller");
const productController = require("./controllers/product.controller");
const postController = require("./controllers/post.controller");
const bidController = require("./controllers/bid.controller");

app.use("/buyers", buyerController);
app.use("/sellers", sellerController);
app.use("/categories", categoryController);
app.use("/products", productController);
app.use("/posts", postController);
app.use("/bids", bidController);

//Soket Starts
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
server.listen(PORT, async () => {
  try {
    await connect();
    console.log(`port is listening on ${PORT}`);
  } catch (err) {
    console.log("err", err);
  }
});
