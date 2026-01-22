const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
  if (process.env.DB_SYNC) {
    db.sequelize.sync({ alert: true });
  }
}
startServer();
