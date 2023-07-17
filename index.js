const express = require("express");
const app = express();
const port = 8000;
const expresLayouts = require("express-ejs-layouts");

app.use(expresLayouts);
app.use("/", require("./routes"));
app.use(express.static("./assets"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.set("layoutextractstyles", true);
app.set("layoutextractscripts", true);
// app.set("views", require("./views"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
