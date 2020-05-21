const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4777;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
//CORS AND COOKIEPARSER AND JSONPARSER
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.static(__dirname + "/public/images"));
//DB CONNECTION

mongoose
  .connect("mongodb://localhost:27017/AbstractionPost", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((err) => console.log(err));

//ALL ROUTES
const authRoutes = require("./routes/auth");
const imageUploadRoutes = require("./routes/image");
const articleRoutes = require("./routes/article");
const tagRoutes = require("./routes/tag");
const searchRoutes = require("./routes/search");
const likeRoutes = require("./routes/like");
const bookMarkRoutes = require("./routes/bookmark");
const GistRoutes = require("./routes/gists");

app.use("/api", authRoutes);
app.use("/api", imageUploadRoutes);
app.use("/api", articleRoutes);
app.use("/api", tagRoutes);
app.use("/api", searchRoutes);
app.use("/api", likeRoutes);
app.use("/api", bookMarkRoutes);
app.use("/api", GistRoutes);
//OPENING PORT
app.listen(port, () => console.log(`listening at ${port}`));
