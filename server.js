const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cron = require('node-cron')

connectDb();
const app = express();

const port = process.env.PORT || 5000;

const task = () =>{
  console.log("Task is running at every one minute")
}
cron.schedule(' */2 * * * *',task)
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
