const express = require("express");
const connectDB = require("./config/db");
app = express();

//mongodb connect
connectDB();

// const mongodb = require("./database/mongodb");
// mongodb;

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/post", require("./routes/post"));
app.use("/api/user", require("./routes/User"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
