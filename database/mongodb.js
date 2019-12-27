const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/linked-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(error => {
    console.log(error);
  });
